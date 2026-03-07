<script lang="ts">
	import { Sun, Moon } from '@lucide/svelte';
	import { themeStore } from '$lib/stores/theme.svelte';
</script>

<button
	onclick={() => themeStore.toggle()}
	aria-label={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	title={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
	class="group relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-accent/20 hover:shadow-md active:scale-95"
>
	<!-- Sun icon — shown in dark mode (click → go light) -->
	<span
		class="absolute transition-all duration-300 {themeStore.isDark
			? 'scale-100 rotate-0 opacity-100'
			: 'scale-0 -rotate-90 opacity-0'}"
	>
		<Sun size={16} class="text-primary" />
	</span>

	<!-- Moon icon — shown in light mode (click → go dark) -->
	<span
		class="absolute transition-all duration-300 {themeStore.isDark
			? 'scale-0 rotate-90 opacity-0'
			: 'scale-100 rotate-0 opacity-100'}"
	>
		<Moon size={16} class="text-foreground/70 group-hover:text-primary" />
	</span>
</button>
