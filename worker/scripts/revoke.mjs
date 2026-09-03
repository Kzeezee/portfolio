/** npm run revoke — kill switch. Every link dies immediately, no redeploy. */
import { kvDelete, listTokenKeys } from './_kv.mjs';

const keys = listTokenKeys();
if (!keys.length) {
	console.log('\n  Nothing to revoke.\n');
	process.exit(0);
}

for (const key of keys) kvDelete(key);

console.log(`\n  Revoked ${keys.length} token(s). All links now return 404.`);
console.log('  To issue a new one:  npm run mint -- --days 30 --force');
console.log('  (that requires reprinting the QR and rewriting the NFC tag)\n');
