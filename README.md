# Portfolio

This is my portfolio website, built with SvelteKit. Instead of a typical scrolling site, it's styled like a terminal file browser where you navigate by clicking files and folders.

## What's Here

Projects spanning full-stack development, AI systems, and database design. You'll find everything from LLM routing platforms (Servo) to hand-optimized query processors (GooseDB) to complete applications built from the ground up.

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and explore.

### Other Commands

```bash
npm run build        # Generate static site for deployment
npm run preview      # Test the production build locally
npm run check        # TypeScript type checking
npm run lint         # ESLint + Prettier validation
npm run format       # Auto-format code
```

## How It Works

The portfolio uses SvelteKit's static site generation to prerender every page. Content lives in YAML files (`src/lib/content/`) so you can update projects and experience without touching component code.

**Navigation** works by clicking files in the tree, which routes to `/[file]`. Each section (about, experience, projects, contact) is a separate prerendered page.

**Styling** uses TailwindCSS v4 with CSS custom properties for theming. The dark/light mode toggle uses the View Transition API for a smooth animation.

## Tech Stack

Frontend: SvelteKit, Svelte 5 Runes, TailwindCSS v4, TypeScript

The whole thing is a static site, so no server needed. Just static files that deploy anywhere.

## Project Structure

```
src/
├── routes/               # Page routes
├── lib/
│   ├── components/       # UI components
│   │   ├── ui/          # Landing, FileTree, ThemeToggle
│   │   └── content/     # Page sections (About, Projects, etc.)
│   ├── content/         # YAML data files
│   ├── stores/          # Theme state
│   └── types/           # TypeScript types
└── routes/layout.css    # Global styles & theme tokens
```

## Adding a New Section

1. Add a file node to `FILE_TREE_ROOT` in `Landing.svelte`
2. Add metadata to `FILE_PAGES` in `src/routes/[file]/+page.ts`
3. Create a content component in `src/lib/components/content/`
4. Add it to the `TERMINAL_PAGES` map in `Landing.svelte`
5. Add an entry to `src/lib/content/last_updated.yaml`

## Deployment

It's just static files. Deploy to Vercel, Netlify, GitHub Pages, or anywhere that serves static sites:

```bash
npm run build
```

Then point your host to the `build/` directory.

## Why Built This Way

The terminal interface is honestly just more fun than a standard portfolio site. It gives me a chance to show off some web dev skills while you explore my work and projects.

## Get in Touch

Interested in collaborating? Have questions about a project? Head over to the contact section in the portfolio or reach out on GitHub.
