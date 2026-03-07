<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	// importing initialises the store and applies the class on the client
	import '$lib/stores/theme.svelte';

	let { children } = $props();
</script>

<!-- Prevent flash of unstyled content: apply dark class before first paint -->
<svelte:head>
	<link rel="icon" href={favicon} />
	{@html `<script>(function(){var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');})();<\/script>`}
</svelte:head>

<!-- Fixed theme toggle button — top-right corner -->
<div class="fixed top-4 right-4 z-50">
	<ThemeToggle />
</div>

{@render children()}
