/**
 * Create THE token. Run once.
 *
 *   npm run mint -- --days 30
 *   npm run mint -- --days 30 --force   # replaces existing (invalidates printed QR + NFC tag)
 */
import { randomBytes } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import QRCode from 'qrcode';
import { args, kvPut, listTokenKeys, kvDelete, tokenUrl, fmt, DAY_MS, GRACE_MS } from './_kv.mjs';

const a = args();
const days = Number(a.days ?? 30);
if (!Number.isFinite(days)) {
	console.error('--days must be a number');
	process.exit(1);
}

const existing = listTokenKeys();
if (existing.length && !a.force) {
	console.error(`\n  A token already exists (${existing.length}).`);
	console.error('  Minting again would invalidate every printed QR card and the NFC tag.');
	console.error('\n  Re-run with --force only if that is what you want.\n');
	console.error('  To change the expiry date instead:  npm run extend -- --days 30\n');
	process.exit(1);
}

if (a.force) {
	for (const key of existing) kvDelete(key);
	if (existing.length) console.log(`Removed ${existing.length} existing token(s).`);
}

const token = randomBytes(32).toString('base64url'); // 43 chars, ~256 bits
const now = Date.now();
const exp = now + days * DAY_MS;

kvPut(`tok:${token}`, JSON.stringify({ createdAt: now, exp, views: 0 }), {
	expirationTtl: Math.floor((exp + GRACE_MS - now) / 1000)
});

const url = tokenUrl(token);
mkdirSync(new URL('../out/', import.meta.url), { recursive: true });
const png = new URL('../out/resume-qr.png', import.meta.url);
await QRCode.toFile(png.pathname, url, { width: 1024, margin: 2 });

console.log(`
  Token minted.

  URL      ${url}
  Expires  ${fmt(exp)}  (${days} days)
  QR       worker/out/resume-qr.png

  Next:
    1. Print the QR
    2. Write the same URL to the NFC tag
    3. Scan it once with your own phone
`);
