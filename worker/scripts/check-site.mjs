/**
 * Post-deploy check A: confirm the Worker route did NOT shadow the portfolio.
 *
 * A route of "kzeezee.com/*" instead of "/r/*" takes the whole site down and
 * nothing would tell you. Run this after every `npm run deploy`.
 */
const paths = ['', 'about', 'experience', 'projects', 'contact'];

let failed = false;
for (const p of paths) {
	const url = `https://kzeezee.com/${p}`;
	try {
		const res = await fetch(url, { redirect: 'follow' });
		const ok = res.status === 200 && !res.headers.get('content-type')?.includes('pdf');
		if (!ok) failed = true;
		console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${res.status}  ${url}`);
	} catch (err) {
		failed = true;
		console.log(`  FAIL  ---  ${url}  (${err.message})`);
	}
}

console.log(
	failed
		? '\n  Site is NOT healthy. Check `routes` in wrangler.toml is scoped to /r/*\n'
		: '\n  Site healthy — Worker is correctly scoped to /r/*\n'
);
process.exit(failed ? 1 : 0);
