<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import type { FileNode } from '../../types/file-tree.types';

	export let node: FileNode;
	export let depth: number = 0;
	export let index: number = 0;
	export let onFileClick: (id: string) => void = () => {};
	export let getFileHref: (id: string) => string = (id) => `/${id}`;
	export let activeFile: string | null = null;
	export let autoExpand: boolean = false;

	let isOpen = autoExpand;

	$: isFolder = node.type === 'folder';
	$: isActive = node.id !== undefined && node.id === activeFile;

	function handleClick() {
		if (isFolder) {
			isOpen = !isOpen;
		} else if (node.id) {
			onFileClick(node.id);
		}
	}
</script>

<!-- Staggered fade + slide-in on mount -->
<div
	style="animation-delay: {index * 50 + depth * 100}ms"
	class="animate-in duration-300 fill-mode-both fade-in slide-in-from-left-2"
>
	{#if isFolder}
		<button
			on:click={handleClick}
			class="
      flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5
      text-left text-sm transition-colors duration-150
      {isActive
			? 'bg-primary/10 text-primary'
			: 'text-foreground/75 hover:bg-muted hover:text-foreground'}
    "
			style="padding-left: {depth * 20 + 8}px;"
		>
			<!-- Chevron for folders -->
			<span
				class="shrink-0 text-muted-foreground transition-transform duration-200"
				class:rotate-90={isOpen}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="m9 18 6-6-6-6" />
				</svg>
			</span>

			{#if isOpen}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.75"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="shrink-0 text-primary"
				>
					<path
						d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.75"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="shrink-0 text-primary"
				>
					<path
						d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
					/>
				</svg>
			{/if}

			<span class="truncate">{node.name}</span>
		</button>
	{:else}
		<a
			href={node.id ? getFileHref(node.id) : '#'}
			on:click|preventDefault={handleClick}
			class="
      flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5
      text-left text-sm transition-colors duration-150
      {isActive
				? 'bg-primary/10 text-primary'
				: 'text-foreground/75 hover:bg-muted hover:text-foreground'}
    "
			style="padding-left: {depth * 20 + 8}px;"
		>
			<span
				class="
        ml-[18px] shrink-0
        {node.icon === 'code'
					? 'text-[oklch(0.58_0.16_240)]'
					: node.icon === 'json'
						? 'text-[oklch(0.75_0.14_80)]'
						: node.icon === 'mail'
							? 'text-[oklch(0.70_0.16_42)]'
							: node.icon === 'svelte'
								? 'text-[oklch(0.60_0.20_25)]'
								: 'text-[oklch(0.58_0.13_162)]'}
      "
			>
				{#if node.icon === 'code'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M10 12.5 8 15l2 2.5" /><path d="m14 12.5 2 2.5-2 2.5" />
						<path d="M14 2v4a2 2 0 0 0 2 2h4" />
						<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
					</svg>
				{:else if node.icon === 'json'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M14 2v4a2 2 0 0 0 2 2h4" />
						<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
						<path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1" />
						<path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1" />
					</svg>
				{:else if node.icon === 'mail'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect width="20" height="16" x="2" y="4" rx="2" />
						<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
					</svg>
				{:else if node.icon === 'svelte'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
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
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
						<path d="M14 2v4a2 2 0 0 0 2 2h4" />
						<path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
					</svg>
				{/if}
			</span>

			<span class="truncate">{node.name}</span>
		</a>
	{/if}

	<!-- Animated children panel -->
	{#if isFolder && isOpen && node.children}
		<div transition:slide={{ duration: 250, easing: cubicInOut }} class="overflow-hidden">
			<div class="relative">
				<!-- Vertical tree connector line -->
				<div
					class="absolute top-0 bottom-0 w-px bg-border"
					style="left: {depth * 20 + 18}px;"
				></div>

				<!-- Recursive children via svelte:self -->
				{#each node.children as child, i}
					<svelte:self
						node={child}
						depth={depth + 1}
						index={i}
						{onFileClick}
						{getFileHref}
						{activeFile}
						{autoExpand}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>
