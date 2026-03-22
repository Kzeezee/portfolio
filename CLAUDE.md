# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build (static site)
npm run preview      # Preview production build
npm run check        # TypeScript/Svelte type checking
npm run check:watch  # Type checking in watch mode
npm run lint         # ESLint + Prettier validation
npm run format       # Auto-format with Prettier
```

## Architecture

**SvelteKit static site** (adapter-static) with file-based routing, deployed as a fully prerendered portfolio.

### Routing

- `/` — Home page renders `Landing` with no file selected
- `/[file]` — Dynamic route for `about`, `experience`, `projects`, `contact`
  - `+page.ts` defines `FILE_PAGES` map, validates params, returns `selectedFileId`
  - `entries()` enables static prerendering of all valid file routes

### Core UI Pattern

The central interface is a **terminal-style file browser** (`Landing.svelte`):
1. User types `ls` into the terminal input → animated sequence reveals a file tree
2. Clicking a file node calls `goto()` to navigate to `/[file]`
3. The selected file's content component renders in the right panel

`Landing.svelte` contains both the `FILE_TREE_ROOT` (file tree structure) and `TERMINAL_PAGES` (map of file IDs → content components).

### Component Locations

- `src/lib/components/ui/` — Core UI: `Landing`, `FileTree`, `FileTreeNode`, `ThemeToggle`, `BadgeAnimatedBorder`
- `src/lib/components/content/` — Page content: `AboutContent`, `ExperienceContent`, `ProjectsContent`, `ContactContent`
- `src/lib/stores/theme.svelte.ts` — Theme store (Svelte 5 runes, localStorage-persisted)
- `src/lib/types/file-tree.types.ts` — `FileNode` interface
- `src/lib/types/yaml.d.ts` — TypeScript declarations for YAML module imports

### Static Content

YAML files in `src/lib/content/` are imported directly via `@rollup/plugin-yaml` (configured in `vite.config.ts`). Edit these to update content without touching components.

- `src/lib/content/last_updated.yaml` — per-section `updatedAt` dates shown in the file tree metadata; keys match `TerminalFileId` (`about`, `experience`, `projects`, `contact`)
- `src/lib/content/experience.yaml` — list of work experience entries rendered by `ExperienceContent.svelte`
- `src/lib/content/projects.yaml` — list of projects rendered by `ProjectsContent.svelte`

### Styling

- **TailwindCSS v4** via `@tailwindcss/vite` plugin (no `tailwind.config.js` — config lives in CSS)
- CSS custom properties and theme tokens defined in `src/routes/layout.css`
- **Color system:** oklch throughout; two palettes toggled by `.dark` class on `<html>`
- **Fonts:** Inter (sans) and JetBrains Mono (mono) via `@fontsource-variable`
- `cn()` utility in `src/lib/utils.ts` wraps `clsx` + `tailwind-merge`

### Theme Toggle

`ThemeToggle.svelte` uses the **View Transition API** (`document.startViewTransition`) for a circular clip-path reveal animation. Falls back to instant toggle. Theme state persists to `localStorage`.

### Animations

- Svelte `fly`/`slide` transitions with `quintOut`/cubic-bezier easing for panels
- `FileTreeNode` uses staggered delays based on `depth` and `index`
- `BadgeAnimatedBorder` uses conic-gradient mask animations
- Content components use staggered `fly` entry animations

### Adding a New Portfolio Section

1. Add a `FileNode` entry to `FILE_TREE_ROOT` in `Landing.svelte`
2. Add metadata to `FILE_PAGES` in `src/routes/[file]/+page.ts`
3. Create a content component in `src/lib/components/content/`
4. Add the component to `TERMINAL_PAGES` map in `Landing.svelte`
5. Add an `updatedAt` entry for the new key in `src/lib/content/last_updated.yaml`
