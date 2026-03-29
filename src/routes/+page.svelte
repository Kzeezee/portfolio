<script lang="ts">
	import TerminalIntro from '$lib/components/ui/Landing.svelte';
</script>

<svelte:head>
	<title>Oliver Goh | Portfolio</title>
	<meta
		name="description"
		content="Oliver Goh — CS student at SMU and software engineer. Building polished product interfaces and frontend systems."
	/>

	<!-- Canonical -->
	<link rel="canonical" href="https://kzeezee.github.io/portfolio" />

	<!-- Open Graph -->
	<meta property="og:title" content="Oliver Goh | Portfolio" />
	<meta
		property="og:description"
		content="Oliver Goh — CS student at SMU and software engineer. Building polished product interfaces and frontend systems."
	/>
	<meta property="og:url" content="https://kzeezee.github.io/portfolio" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://kzeezee.github.io/portfolio/images/profile.webp" />
	<meta property="og:image:alt" content="Oliver Goh" />
	<meta property="og:site_name" content="Oliver Goh | Portfolio" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Oliver Goh | Portfolio" />
	<meta
		name="twitter:description"
		content="Oliver Goh — CS student at SMU and software engineer. Building polished product interfaces and frontend systems."
	/>
	<meta name="twitter:image" content="https://kzeezee.github.io/portfolio/images/profile.webp" />

	<!-- Structured data -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Oliver Goh',
		url: 'https://kzeezee.github.io/portfolio',
		image: 'https://kzeezee.github.io/portfolio/images/profile.webp',
		sameAs: ['https://github.com/Kzeezee', 'https://www.linkedin.com/in/kzeezee-dev/'],
		email: 'gxy.oliver@gmail.com',
		alumniOf: { '@type': 'CollegeOrUniversity', name: 'Singapore Management University' },
		jobTitle: 'Software Engineer',
		description:
			'CS student at SMU and software engineer building polished product interfaces and frontend systems.'
	})}<\/script>`}
</svelte:head>

<main class="flex min-h-screen w-full items-center justify-center p-6">
	<TerminalIntro selectedFileId={null} />
</main>
