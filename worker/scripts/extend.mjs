/**
 * Push the expiry out. The URL never changes, so printed QR cards and the
 * NFC tag keep working.
 *
 *   npm run extend -- --days 30
 */
import { args, kvGet, kvPut, listTokenKeys, fmt, DAY_MS, GRACE_MS } from './_kv.mjs';

const a = args();
const days = Number(a.days ?? 30);
if (!Number.isFinite(days) || days <= 0) {
	console.error('--days must be a positive number');
	process.exit(1);
}

const [key] = listTokenKeys();
if (!key) {
	console.error('\n  No token to extend. Run:  npm run mint -- --days 30\n');
	process.exit(1);
}

const record = JSON.parse(kvGet(key));
const exp = Date.now() + days * DAY_MS;

kvPut(key, JSON.stringify({ ...record, exp }), {
	expirationTtl: Math.floor((exp + GRACE_MS - Date.now()) / 1000)
});

console.log(`\n  Extended. Now expires ${fmt(exp)} (${days} days from now).`);
console.log('  URL is unchanged — no need to reprint or reprogram anything.\n');
