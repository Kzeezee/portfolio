<script lang="ts">
	import TerminalIntro from '$lib/components/ui/Landing.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title} | Oliver Goh</title>
	<meta name="description" content={data.description} />
</svelte:head>

<main class="flex min-h-screen w-full items-center justify-center p-6">
	<TerminalIntro selectedFileId={data.selectedFileId} />
</main>
