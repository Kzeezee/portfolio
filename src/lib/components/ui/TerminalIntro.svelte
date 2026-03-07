<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';
	import FileTree from '$lib/components/ui/FileTree.svelte';
	import { FILE_TREE_ROOT, getTerminalFileById, type TerminalFileContent } from '$lib/data/terminal-files';

	interface Props {
		selectedFileId?: string | null;
		selectedContent?: TerminalFileContent | null;
	}

	let { selectedFileId = null, selectedContent = null }: Props = $props();
	let command = $state('');
	let hasRevealedTree = $state(false);
	const activeFile = $derived(selectedFileId);
	const activeContent = $derived(selectedContent ?? getTerminalFileById(activeFile));
	const hasSelection = $derived(Boolean(activeFile && activeContent));

	$effect(() => {
		if (selectedFileId) {
			hasRevealedTree = true;
		}
	});

	function handleCommandInput() {
		if (!hasRevealedTree && command.trim().toLowerCase() === 'ls') {
			hasRevealedTree = true;
		}
	}

	function handleFileClick(id: string) {
		if (id === activeFile) {
			goto('/');
			return;
		}
		goto(`/${id}`);
	}
</script>

<section class="intro-layout" class:has-selection={hasSelection}>
	<div class="intro-panel">
		<h1 class="font-sans text-3xl font-semibold tracking-tight text-foreground">Oliver Goh</h1>
		<p class="mt-1 font-mono text-sm tracking-wide text-muted-foreground">
			Software Engineer &amp; Developer
		</p>

		<div
			class="mt-8 w-full rounded-xl border border-border/80 bg-card/60 p-4 shadow-lg backdrop-blur-sm"
		>
			<div class="terminal-body">
				<div class="input-panel" class:hidden={hasRevealedTree}>
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
						class="h-11 w-full rounded-md border border-input bg-background px-4 font-mono text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/40"
					/>
				</div>

				<div class="tree-panel" class:active={hasRevealedTree}>
					<div class="pt-1">
						<FileTree
							nodes={FILE_TREE_ROOT}
							{activeFile}
							onFileClick={handleFileClick}
							getFileHref={(id) => `/${id}`}
							autoExpand
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="content-panel">
		{#if hasSelection && activeContent}
			{#key activeContent.id}
				<article
					class="rounded-xl border border-border/80 bg-card/60 p-5 shadow-lg backdrop-blur-sm"
					in:fly={{ x: 50, duration: 520, easing: quintOut }}
				>
					<p class="font-mono text-xs tracking-wider text-muted-foreground">
						{activeContent.fileName} · updated {activeContent.updatedAt}
					</p>
					<h2 class="mt-2 font-sans text-2xl font-semibold text-foreground">{activeContent.title}</h2>
					<p class="mt-2 text-sm leading-6 text-muted-foreground">{activeContent.description}</p>

					<div class="mt-6 space-y-6">
						{#each activeContent.sections as section}
							<section>
								<h3 class="font-mono text-xs font-semibold tracking-wider text-primary">
									{section.heading}
								</h3>
								{#each section.body as paragraph}
									<p class="mt-2 text-sm leading-6 text-foreground/90">{paragraph}</p>
								{/each}
								{#if section.list}
									<ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/85">
										{#each section.list as item}
											<li>{item}</li>
										{/each}
									</ul>
								{/if}
							</section>
						{/each}
					</div>
				</article>
			{/key}
		{:else}
			<div class="placeholder-panel rounded-xl border border-dashed border-border/90 bg-muted/40 p-5">
				<p class="font-mono text-xs tracking-wider text-muted-foreground">
					Select a file from the tree to open a route-backed content page.
				</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.intro-layout {
		width: 100%;
		max-width: 68rem;
		display: grid;
		gap: 1rem;
		grid-template-columns: minmax(0, 1fr);
		align-items: start;
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
		opacity: 0;
		pointer-events: none;
		transform: translateX(1.2rem) scale(0.99);
		transition:
			opacity 460ms ease,
			transform 660ms cubic-bezier(0.22, 1.1, 0.32, 1);
	}

	.intro-layout.has-selection .intro-panel {
		align-items: flex-start;
		text-align: left;
		transform: translateX(-0.8rem);
	}

	.intro-layout.has-selection .content-panel {
		opacity: 1;
		pointer-events: auto;
		transform: translateX(0) scale(1);
	}

	@media (min-width: 920px) {
		.intro-layout.has-selection {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
	}

	.terminal-body {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
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
