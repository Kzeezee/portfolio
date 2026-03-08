<script lang="ts">
	import { ExternalLink, Github, Folder } from '@lucide/svelte';

	const projects = [
		{
			title: 'Design-system starter',
			description:
				'A comprehensive design system featuring themed components, dark mode support, and accessible primitives.',
			tags: ['SvelteKit', 'TailwindCSS', 'Storybook'],
			github: '#',
			demo: '#',
			featured: true
		},
		{
			title: 'Personal dashboard',
			description:
				'A sleek, integrated dashboard pulling data from multiple external APIs to display metrics and analytics.',
			tags: ['TypeScript', 'REST APIs', 'Charts'],
			github: '#',
			demo: '#',
			featured: false
		},
		{
			title: 'Interactive narrative page',
			description:
				'An immersive, scroll-driven storytelling experience with staged animations and complex layout transitions.',
			tags: ['GSAP', 'Framer Motion', 'Svelte'],
			github: '#',
			demo: '#',
			featured: false
		},
		{
			title: 'AI Prompt Generator',
			description:
				'A smart tool that leverages language models to construct optimized prompts for various AI art engines.',
			tags: ['OpenAI', 'Next.js', 'Vercel'],
			github: '#',
			demo: '#',
			featured: false
		}
	];
</script>

<section class="flex w-full flex-col gap-6">
	<!-- Header -->
	<header>
		<h3 class="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-primary">
			<span class="block h-px w-8 bg-primary/50"></span>
			Featured Work
		</h3>
		<p class="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/80">
			A collection of selected projects that showcase my experience in building modern, interactive,
			and highly performant web applications.
		</p>
	</header>

	<!-- Grid Layout -->
	<div class="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each projects as project}
			<div
				class="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border/40 bg-card/20 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card/40 hover:shadow-lg hover:shadow-primary/5"
			>
				<!-- Top Section -->
				<div>
					<div class="mb-5 flex items-center justify-between text-primary">
						<div
							class="rounded-full bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/20"
						>
							<Folder class="h-6 w-6 stroke-[1.5]" />
						</div>
						<div class="z-10 flex gap-3 text-muted-foreground">
							{#if project.github}
								<a
									href={project.github}
									target="_blank"
									rel="noreferrer"
									class="transition-colors hover:scale-110 hover:text-primary"
									aria-label="GitHub Repository"
								>
									<Github class="h-5 w-5" />
								</a>
							{/if}
							{#if project.demo}
								<a
									href={project.demo}
									target="_blank"
									rel="noreferrer"
									class="transition-colors hover:scale-110 hover:text-primary"
									aria-label="Live Demo"
								>
									<ExternalLink class="h-5 w-5" />
								</a>
							{/if}
						</div>
					</div>
					<h4
						class="mb-2 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary"
					>
						{project.title}
					</h4>
					<p class="mb-6 text-sm leading-relaxed text-foreground/70">
						{project.description}
					</p>
				</div>

				<!-- Bottom Section: Tags -->
				<ul class="mt-auto flex flex-wrap gap-2">
					{#each project.tags as tag}
						<li
							class="rounded-md bg-secondary/50 px-2.5 py-1 font-mono text-[10px] font-medium text-secondary-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary"
						>
							{tag}
						</li>
					{/each}
				</ul>

				<!-- Subtle gradient highlight on hover -->
				<div
					class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					style="background: radial-gradient(circle at 50% 0%, rgba(var(--color-primary-rgb), 0.05), transparent 70%);"
				></div>
			</div>
		{/each}
	</div>
</section>
