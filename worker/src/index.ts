/**
 * resume-gate — serves a private resume PDF behind an unguessable, expiring token.
 *
 * Route: kzeezee.com/r/<token>   (scoped in wrangler.toml — never widen to /*)
 *
 * The PDF lives only in Workers KV. It is never committed to the public repo,
 * and nothing but this Worker can read it.
 */

export interface Env {
	RESUME: KVNamespace;
}

const PDF_KEY = 'pdf:current';
const FILENAME = 'Oliver_Goh_Resume.pdf';
const CONTACT = 'gxy.oliver@gmail.com';

/** 32 random bytes → base64url is exactly 43 chars. */
const TOKEN_RE = /^\/r\/([A-Za-z0-9_-]{43})$/;

interface TokenRecord {
	createdAt: number;
	exp: number;
	views: number;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method !== 'GET' && request.method !== 'HEAD') {
			return notFound();
		}

		const match = TOKEN_RE.exec(new URL(request.url).pathname);
		if (!match) return notFound();
		const token = match[1];

		const raw = await env.RESUME.get(`tok:${token}`);
		// Unknown token and malformed token return byte-identical responses,
		// so this endpoint can't be used to confirm whether a token exists.
		if (!raw) return notFound();

		let record: TokenRecord;
		try {
			record = JSON.parse(raw) as TokenRecord;
		} catch {
			return notFound();
		}

		if (typeof record.exp !== 'number' || Date.now() > record.exp) {
			return gone();
		}

		const pdf = await env.RESUME.get(PDF_KEY, { type: 'arrayBuffer' });
		if (!pdf) {
			// Token is valid but the PDF is missing — my problem, not the visitor's.
			return html(unavailablePage(), 503);
		}

		// Count after responding so the counter never delays the download.
		if (request.method === 'GET') {
			ctx.waitUntil(recordView(env, token, record));
		}

		return new Response(pdf, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `inline; filename="${FILENAME}"`,
				'Content-Length': String(pdf.byteLength),
				'Cache-Control': 'no-store, private',
				'X-Robots-Tag': 'noindex, nofollow, noarchive',
				'Referrer-Policy': 'no-referrer',
				'X-Content-Type-Options': 'nosniff'
			}
		});
	}
} satisfies ExportedHandler<Env>;

/**
 * Increment the view counter, preserving the key's original self-clean TTL.
 * Best-effort: a lost increment is preferable to a failed download.
 */
async function recordView(env: Env, token: string, record: TokenRecord): Promise<void> {
	try {
		const next: TokenRecord = { ...record, views: (record.views ?? 0) + 1 };
		// Key self-deletes 30 days after expiry, leaving a grace window in which
		// visitors still get a friendly "expired" page rather than a bare 404.
		const ttl = Math.floor((record.exp + THIRTY_DAYS - Date.now()) / 1000);
		await env.RESUME.put(`tok:${token}`, JSON.stringify(next), {
			expirationTtl: Math.max(ttl, 60) // KV minimum is 60s
		});
	} catch {
		/* counter is non-critical */
	}
}

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

// ---------------------------------------------------------------- responses

function notFound(): Response {
	return html(shell('404', 'Not found', 'This link is not valid.'), 404);
}

function gone(): Response {
	return html(
		shell(
			'410',
			'This link has expired',
			`Resume links are time-limited. Email <a href="mailto:${CONTACT}">${CONTACT}</a> and I'll send a fresh one.`
		),
		410
	);
}

function unavailablePage(): string {
	return shell(
		'503',
		'Temporarily unavailable',
		`Something is misconfigured on my end. Please email <a href="mailto:${CONTACT}">${CONTACT}</a>.`
	);
}

function html(body: string, status: number): Response {
	return new Response(body, {
		status,
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'Cache-Control': 'no-store',
			'X-Robots-Tag': 'noindex, nofollow',
			'Referrer-Policy': 'no-referrer'
		}
	});
}

/** Minimal standalone page — mirrors the portfolio's mono/dark aesthetic. */
function shell(code: string, title: string, message: string): string {
	return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${title}</title>
<style>
  :root { color-scheme: dark light; }
  body {
    margin: 0; min-height: 100dvh; display: grid; place-items: center;
    background: #0b0b0f; color: #e7e7ea; padding: 1.5rem;
    font-family: ui-monospace, "JetBrains Mono", SFMono-Regular, Menlo, monospace;
  }
  main { max-width: 34rem; text-align: center; }
  .code { font-size: .8rem; letter-spacing: .18em; color: #6f6f7b; }
  h1 { font-size: 1.25rem; font-weight: 600; margin: .75rem 0 .5rem; }
  p { color: #a1a1ad; line-height: 1.6; font-size: .9rem; margin: 0; }
  a { color: #e7e7ea; }
  .home { display: inline-block; margin-top: 2rem; font-size: .8rem; color: #6f6f7b; }
</style>
</head><body><main>
  <div class="code">${code}</div>
  <h1>${title}</h1>
  <p>${message}</p>
  <a class="home" href="https://kzeezee.com">kzeezee.com</a>
</main></body></html>`;
}
