<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { themeStore } from '$lib/stores/theme.svelte';
	import { flushSync } from 'svelte';
	import { cn } from '$lib/utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		class: className = '',
		duration = 400,
		...props
	}: HTMLButtonAttributes & { duration?: number } = $props();

	let buttonRef = $state<HTMLButtonElement | null>(null);

	function toggleTheme() {
		if (!buttonRef) return;

		const { top, left, width, height } = buttonRef.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
		const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
		const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y));

		if (typeof document.startViewTransition !== 'function') {
			themeStore.toggle();
			return;
		}

		const transition = document.startViewTransition(() => {
			flushSync(() => {
				themeStore.toggle();
			});
		});

		const ready = transition.ready;
		if (ready && typeof ready.then === 'function') {
			ready.then(() => {
				document.documentElement.animate(
					{
						clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`]
					},
					{
						duration,
						easing: 'ease-in-out',
						pseudoElement: '::view-transition-new(root)'
					}
				);
			});
		}
	}
</script>

<button
	type="button"
	bind:this={buttonRef}
	onclick={toggleTheme}
	class={cn(
		'group relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-accent/20 hover:shadow-md active:scale-95',
		className
	)}
	aria-label={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	title={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	{...props}
>
	<!-- Sun icon — shown in dark mode (click → go light) -->
	<span
		class={cn(
			'absolute transition-all duration-300',
			themeStore.isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
		)}
	>
		<Sun size={16} class="text-primary" />
	</span>

	<!-- Moon icon — shown in light mode (click → go dark) -->
	<span
		class={cn(
			'absolute transition-all duration-300',
			themeStore.isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
		)}
	>
		<Moon size={16} class="text-foreground/70 group-hover:text-primary" />
	</span>

	<span class="sr-only">Toggle theme</span>
</button>
