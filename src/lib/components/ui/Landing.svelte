<script lang="ts">
	import type { Component } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import AboutContent from '$lib/components/content/AboutContent.svelte';
	import ContactContent from '$lib/components/content/ContactContent.svelte';
	import ExperienceContent from '$lib/components/content/ExperienceContent.svelte';
	import ProjectsContent from '$lib/components/content/ProjectsContent.svelte';
	import FileTree from '$lib/components/ui/FileTree.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import type { FileNode } from '$lib/types/file-tree.types';
	import lastUpdated from '$lib/content/last_updated.yaml';
	import { terminalState } from '$lib/stores/terminal.svelte';

	type TerminalFileId = 'about' | 'experience' | 'projects' | 'contact';

	interface TerminalPageContent {
		id: TerminalFileId;
		fileName: string;
		icon: NonNullable<FileNode['icon']>;
		title: string;
		updatedAt: string;
		component: Component;
	}

	const TERMINAL_PAGES: Record<TerminalFileId, TerminalPageContent> = {
		about: {
			id: 'about',
			fileName: 'about.md',
			icon: 'text',
			title: 'About Me',
			updatedAt: lastUpdated.about,
			component: AboutContent
		},
		experience: {
			id: 'experience',
			fileName: 'experience.json',
			icon: 'json',
			title: 'Experience',
			updatedAt: lastUpdated.experience,
			component: ExperienceContent
		},
		projects: {
			id: 'projects',
			fileName: 'projects.tsx',
			icon: 'code',
			title: 'Projects',
			updatedAt: lastUpdated.projects,
			component: ProjectsContent
		},
		contact: {
			id: 'contact',
			fileName: 'contact.txt',
			icon: 'mail',
			title: 'Contact',
			updatedAt: lastUpdated.contact,
			component: ContactContent
		}
	};

	const FILE_TREE_ROOT: FileNode[] = [
		{
			type: 'folder',
			name: 'my-portfolio',
			children: (Object.values(TERMINAL_PAGES) satisfies TerminalPageContent[]).map((page) => ({
				type: 'file' as const,
				name: page.fileName,
				icon: page.icon,
				id: page.id
			}))
		}
	];

	function getPageById(id: string | null | undefined): TerminalPageContent | null {
		if (!id) return null;
		if (!(id in TERMINAL_PAGES)) return null;
		return TERMINAL_PAGES[id as TerminalFileId];
	}

	interface Props {
		selectedFileId?: string | null;
	}

	let { selectedFileId = null }: Props = $props();
	let command = $state('');
	let revealTreeTimeout: ReturnType<typeof setTimeout> | null = null;
	const INPUT_HIDE_DURATION_MS = 520;
	const animatedRouteIds = ['about', 'experience', 'projects', 'contact'] as const;
	const activeFile = $derived(selectedFileId);
	const activeContent = $derived(getPageById(activeFile));
	const hasSelection = $derived(Boolean(activeContent));
	const animateRouteContent = $derived(
		Boolean(activeContent && animatedRouteIds.includes(activeContent.id))
	);
	const ActiveContentComponent = $derived(activeContent?.component ?? null);

	$effect(() => {
		return () => {
			if (revealTreeTimeout) {
				clearTimeout(revealTreeTimeout);
			}
		};
	});

	$effect(() => {
		if (selectedFileId) {
			terminalState.hasHiddenInput = true;
			terminalState.hasExpandedTerminalBody = true;
			terminalState.hasRevealedTree = true;
		}
	});

	function handleCommandInput() {
		if (!terminalState.hasHiddenInput && command.trim().toLowerCase() === 'ls') {
			terminalState.hasHiddenInput = true;
			if (revealTreeTimeout) {
				clearTimeout(revealTreeTimeout);
			}
			revealTreeTimeout = setTimeout(() => {
				terminalState.hasExpandedTerminalBody = true;
				terminalState.hasRevealedTree = true;
				revealTreeTimeout = null;
			}, INPUT_HIDE_DURATION_MS);
		}
	}

	function handleInputTransitionEnd(event: TransitionEvent) {
		if (!terminalState.hasHiddenInput || event.propertyName !== 'max-height') {
			return;
		}
		if (revealTreeTimeout) {
			clearTimeout(revealTreeTimeout);
		}
		terminalState.hasExpandedTerminalBody = true;
		terminalState.hasRevealedTree = true;
		revealTreeTimeout = null;
	}

	function handleFileClick(id: string) {
		if (id === activeFile) {
			goto(base || '/');
			return;
		}
		goto(`${base}/${id}`);
	}
</script>

<section class="intro-layout" class:has-selection={hasSelection}>
	<div class="intro-panel">
		<h1
			class="font-sans text-3xl font-semibold tracking-tight text-foreground"
			in:fly={{ y: 20, duration: 420, easing: quintOut }}
		>
			Oliver Goh
		</h1>
		<p
			class="mt-1 font-mono text-sm tracking-wide text-muted-foreground"
			in:fly={{ y: 16, duration: 440, delay: 60, easing: quintOut }}
		>
			Software Engineer &amp; Developer
		</p>

		<div
			class="terminal-shell mt-6 w-full rounded-xl border border-border/80 bg-card/60 p-5 shadow-lg backdrop-blur-sm"
			class:expanded={terminalState.hasExpandedTerminalBody}
		>
			<div class="terminal-body">
				{#if !hasSelection}
					<div
						class="input-panel"
						class:hidden={terminalState.hasHiddenInput}
						ontransitionend={handleInputTransitionEnd}
					>
						<span class="shrink-0 text-muted-foreground">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="1.75"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M14 2v4a2 2 0 0 0 2 2h4" />
								<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
							</svg>
						</span>
						<input
							bind:value={command}
							oninput={handleCommandInput}
							placeholder="Type 'ls' to begin"
							class="h-11 w-full rounded-md border border-input bg-background px-4 font-mono text-sm text-foreground transition-all duration-200 outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/40"
						/>
					</div>
				{/if}

				<div class="tree-panel" class:active={terminalState.hasRevealedTree}>
					<div class="pt-1">
						<FileTree
							nodes={FILE_TREE_ROOT}
							{activeFile}
							onFileClick={handleFileClick}
							getFileHref={(id) => `${base}/${id}`}
							autoExpand
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	{#if hasSelection}
		<div class="content-panel">
			{#if activeContent}
				{#key activeContent.id}
					<article
						class="relative grid max-h-[75vh] grid-rows-[auto_auto_1fr] overflow-hidden rounded-xl border border-border/80 bg-card/60 p-5 shadow-lg backdrop-blur-sm"
						in:fly={{
							y: animateRouteContent ? 24 : 0,
							duration: animateRouteContent ? 520 : 0,
							easing: quintOut
						}}
					>
						<p class="font-mono text-xs tracking-wider text-muted-foreground">
							{activeContent.fileName} · updated {activeContent.updatedAt}
						</p>
						<h2 class="mt-2 font-sans text-2xl font-semibold text-foreground">
							{activeContent.title}
						</h2>

						<ScrollArea class="relative z-10 mt-4 min-h-0 pb-4">
							<div class="pr-4">
								{#if ActiveContentComponent}
									<ActiveContentComponent />
								{/if}
							</div>
						</ScrollArea>
						<!-- Bottom Fade Effect overlay -->
						<!-- <div
							class="pointer-events-none absolute right-7 bottom-5 left-5 z-20 h-12 bg-gradient-to-t from-background/90 to-transparent"
						></div> -->
					</article>
				{/key}
			{/if}
		</div>
	{/if}
</section>

<style>
	.intro-layout {
		width: 100%;
		max-width: 68rem;
		display: grid;
		gap: 1rem;
		grid-template-columns: minmax(0, 1fr);
		align-items: center;
	}

	.intro-panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		transition:
			transform 760ms cubic-bezier(0.22, 1.28, 0.32, 1),
			max-width 760ms cubic-bezier(0.22, 1, 0.36, 1),
			align-items 760ms ease,
			text-align 760ms ease;
	}

	.content-panel {
		animation: content-panel-enter 580ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	@keyframes content-panel-enter {
		from {
			opacity: 0;
			transform: translateY(1.5rem) scale(0.99);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.intro-layout.has-selection .intro-panel {
		align-items: flex-start;
		text-align: left;
	}

	@media (min-width: 920px) {
		.intro-layout.has-selection {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}

		.terminal-shell {
			max-width: 24rem;
		}
	}

	@media (max-width: 919px) {
		.intro-layout.has-selection .intro-panel {
			width: 100%;
		}

		.intro-layout.has-selection .terminal-shell {
			max-width: none;
		}
	}

	.terminal-body {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.terminal-shell {
		height: 5rem;
	}

	.terminal-shell.expanded {
		height: max-content;
	}

	.input-panel {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		max-height: 4rem;
		opacity: 1;
		transform: translateY(0) scale(1);
		transition:
			max-height 520ms cubic-bezier(0.4, 0, 0.2, 1),
			opacity 300ms ease,
			transform 420ms ease;
	}

	.input-panel.hidden {
		max-height: 0;
		opacity: 0;
		transform: translateY(-0.2rem) scale(0.985);
		pointer-events: none;
		overflow: hidden;
	}

	.tree-panel {
		max-height: 0;
		opacity: 0;
		transform: translateY(0.5rem) scale(0.99);
		transform-origin: top center;
		overflow: hidden;
		pointer-events: none;
		transition:
			max-height 760ms cubic-bezier(0.22, 1.35, 0.32, 1),
			opacity 420ms ease 40ms,
			transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.tree-panel.active {
		max-height: 24rem;
		opacity: 1;
		transform: translateY(0) scale(1);
		pointer-events: auto;
	}
</style>
