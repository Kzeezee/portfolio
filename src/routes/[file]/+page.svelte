<script lang="ts">
	import TerminalIntro from '$lib/components/ui/Landing.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title} | Oliver Goh</title>
	<meta name="description" content={data.description} />

	<!-- Canonical -->
	<link rel="canonical" href="https://kzeezee.github.io/portfolio/{data.selectedFileId}" />

	<!-- Open Graph -->
	<meta property="og:title" content="{data.title} | Oliver Goh" />
	<meta property="og:description" content={data.description} />
	<meta
		property="og:url"
		content="https://kzeezee.github.io/portfolio/{data.selectedFileId}"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://kzeezee.github.io/portfolio/images/profile.webp" />
	<meta property="og:image:alt" content="Oliver Goh" />
	<meta property="og:site_name" content="Oliver Goh | Portfolio" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{data.title} | Oliver Goh" />
	<meta name="twitter:description" content={data.description} />
	<meta name="twitter:image" content="https://kzeezee.github.io/portfolio/images/profile.webp" />
</svelte:head>

<main class="flex min-h-screen w-full items-center justify-center p-6">
	<TerminalIntro selectedFileId={data.selectedFileId} />
</main>
