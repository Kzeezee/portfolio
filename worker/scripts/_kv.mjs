import { execFileSync } from 'node:child_process';

const BINDING = 'RESUME';

/** Run a `wrangler kv ...` subcommand against the remote namespace. */
function kv(args, { quiet = false } = {}) {
	return execFileSync('npx', ['wrangler', 'kv', ...args, '--binding', BINDING, '--remote'], {
		encoding: 'utf8',
		stdio: quiet ? ['ignore', 'pipe', 'pipe'] : ['ignore', 'pipe', 'inherit']
	});
}

export function kvPut(key, value, { expirationTtl } = {}) {
	const args = ['key', 'put', key, value];
	// NB: the CLI flag is `--ttl` (seconds). `expirationTtl` is the Workers
	// *runtime* KV API name and is not accepted here.
	if (expirationTtl) args.push('--ttl', String(Math.max(expirationTtl, 60)));
	kv(args);
}

export function kvGet(key) {
	try {
		return kv(['key', 'get', key, '--text'], { quiet: true });
	} catch {
		return null; // wrangler exits non-zero when the key is absent
	}
}

export function kvDelete(key) {
	kv(['key', 'delete', key]);
}

/** All token keys currently in the namespace. */
export function listTokenKeys() {
	const out = kv(['key', 'list', '--prefix', 'tok:'], { quiet: true });
	try {
		// Slice from the first bracket so any wrangler/npm banner lines are ignored.
		return JSON.parse(out.slice(out.indexOf('['))).map((k) => k.name);
	} catch {
		return [];
	}
}

export const DAY_MS = 24 * 60 * 60 * 1000;
export const GRACE_MS = 30 * DAY_MS;

export function tokenUrl(token) {
	return `https://kzeezee.com/r/${token}`;
}

export function fmt(ms) {
	return new Date(ms).toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
}

/** Minimal `--flag value` parser. */
export function args(argv = process.argv.slice(2)) {
	const out = {};
	for (let i = 0; i < argv.length; i++) {
		if (!argv[i].startsWith('--')) continue;
		const key = argv[i].slice(2);
		const next = argv[i + 1];
		if (next && !next.startsWith('--')) {
			out[key] = next;
			i++;
		} else {
			out[key] = true;
		}
	}
	return out;
}
