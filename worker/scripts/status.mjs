/** npm run status — views, expiry, days remaining. */
import { kvGet, listTokenKeys, tokenUrl, fmt, DAY_MS } from './_kv.mjs';

const keys = listTokenKeys();
if (!keys.length) {
	console.log('\n  No token exists. Run:  npm run mint -- --days 30\n');
	process.exit(0);
}

for (const key of keys) {
	const raw = kvGet(key);
	if (!raw) continue;
	const { createdAt, exp, views } = JSON.parse(raw);
	const token = key.slice(4);
	const left = Math.ceil((exp - Date.now()) / DAY_MS);

	console.log(`
  URL       ${tokenUrl(token)}
  Opens     ${views}
  Created   ${fmt(createdAt)}
  Expires   ${fmt(exp)}
  Status    ${left > 0 ? `active, ${left} day(s) left` : 'EXPIRED'}
`);
}
