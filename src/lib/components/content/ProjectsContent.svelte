<script lang="ts">
	import ProjectShowcase from '$lib/components/ui/ProjectShowcase.svelte';
</script>

<section class="flex w-full flex-col gap-6">
	<!-- Header -->
	<header class="top-0 z-10 pb-2">
		<h3 class="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-primary">
			<span class="block h-px w-8 bg-primary/50"></span>
			Projects
		</h3>
		<p class="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/80">
			A collection of projects spanning systems programming, web applications, and developer tooling.
		</p>
	</header>

	<div class="overflow-x-hidden">
		<ProjectShowcase />
	</div>
</section>
