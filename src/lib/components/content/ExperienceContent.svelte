<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import BadgeAnimatedBorder from '../ui/BadgeAnimatedBorder.svelte';

	type Experience = {
		role: string;
		company: string;
		period: string;
		description: string;
		tech: string[];
	};

	const experiences: Experience[] = [
		{
			role: 'AI Software Engineer',
			company: 'MikoMiko.ai',
			period: 'Dec 2025 - Present',
			description:
				'Architecting a GenAI SaaS platform for real-time image generation and community interaction using Next.js and diffusion models.',
			tech: ['Next.js', 'Firebase', 'Python', 'Diffusion Models', 'ETL']
		},
		{
			role: 'Technology & GDG Director',
			company: 'Singapore Management University',
			period: 'Sep 2025 - Present',
			description:
				'Leading technical workshops and developing internal software tools to grow the campus developer community.',
			tech: ['Leadership', 'Community Building', 'Public Speaking', 'Software Architecture']
		},
		{
			role: 'Full Stack Developer',
			company: 'mathilda',
			period: 'Mar 2021 - Aug 2021',
			description:
				'Engineered backend REST APIs and integrated ML-based candidate recommendation systems for an HR management platform.',
			tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'Azure ML', 'RESTful APIs']
		}
	];
</script>

<section class="max-w-2xl">
	<div class="pb-8">
		<div class="relative">
			<div class="absolute top-3 bottom-3 left-2 w-px bg-border"></div>

			<div class="space-y-8">
				{#each experiences as exp, i (exp.role)}
					<article
						in:fly={{ x: -12, y: 6, duration: 420, delay: i * 120, easing: quintOut }}
						class="relative pl-8"
					>
						<div
							class="absolute top-2 left-0 h-4 w-4 rounded-full border-2 border-primary bg-background"
						></div>

						<div class="space-y-2">
							<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
								<h4 class="font-mono text-base font-semibold text-foreground">{exp.role}</h4>
								<span class="font-mono text-xs text-muted-foreground">{exp.period}</span>
							</div>

							<p class="font-mono text-sm text-primary">{exp.company}</p>

							<p class="text-sm leading-relaxed text-foreground/75">{exp.description}</p>

							<div class="flex flex-wrap gap-1.5 pt-1">
								{#each exp.tech as tech (tech)}
									<BadgeAnimatedBorder text={tech} />
								{/each}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>
