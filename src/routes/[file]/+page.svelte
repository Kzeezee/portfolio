<script lang="ts">
	import TerminalIntro from '$lib/components/ui/TerminalIntro.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.selectedContent.title} | Oliver Goh</title>
	<meta name="description" content={data.selectedContent.description} />
</svelte:head>

<main class="flex min-h-screen w-full items-center justify-center p-6">
	<TerminalIntro
		selectedFileId={data.selectedFileId}
		selectedContent={data.selectedContent}
	/>
</main>
