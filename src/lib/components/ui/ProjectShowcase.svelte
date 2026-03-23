<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { base } from '$app/paths';
	import rawProjects from '$lib/content/projects.yaml';

	interface Project {
		title: string;
		description: string;
		year: string;
		link: string;
		image: string;
	}

	const projects = rawProjects as Project[];

	let hoveredIndex = $state<number | null>(null);
	let mousePosition = $state({ x: 0, y: 0 });
	let smoothPosition = $state({ x: 0, y: 0 });
	let isVisible = $state(false);
	let animationId: number | null = null;

	function lerp(start: number, end: number, factor: number) {
		return start + (end - start) * factor;
	}

	function animate() {
		smoothPosition = {
			x: lerp(smoothPosition.x, mousePosition.x, 0.15),
			y: lerp(smoothPosition.y, mousePosition.y, 0.15)
		};
		animationId = requestAnimationFrame(animate);
	}

	$effect(() => {
		animationId = requestAnimationFrame(animate);
		return () => {
			if (animationId !== null) cancelAnimationFrame(animationId);
		};
	});

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				node.remove();
			}
		};
	}

	function handleMouseMove(e: MouseEvent) {
		mousePosition = { x: e.clientX, y: e.clientY };
	}

	function handleMouseEnter(index: number) {
		hoveredIndex = index;
		isVisible = true;
	}

	function handleMouseLeave() {
		hoveredIndex = null;
		isVisible = false;
	}
</script>

<!-- Floating image preview — portalled to body so nothing clips it -->
<div
	use:portal
	class="pointer-events-none fixed z-[9999] overflow-hidden rounded-xl shadow-2xl"
	style="
    left: 0;
    top: 0;
    transform: translate3d({smoothPosition.x + 20}px, {smoothPosition.y - 100}px, 0);
    opacity: {isVisible ? 1 : 0};
    scale: {isVisible ? 1 : 0.8};
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  "
>
	<div class="bg-secondary relative h-[180px] w-[280px] overflow-hidden rounded-xl">
		{#each projects as project, index}
			<img
				src="{base}{project.image}"
				alt={project.title}
				class="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
				style="
          opacity: {hoveredIndex === index ? 1 : 0};
          scale: {hoveredIndex === index ? 1 : 1.1};
          filter: {hoveredIndex === index ? 'none' : 'blur(10px)'};
        "
			/>
		{/each}
		<div class="from-background/20 absolute inset-0 bg-gradient-to-t to-transparent"></div>
	</div>
</div>

<div
	role="region"
	aria-label="Projects"
	onmousemove={handleMouseMove}
	class="w-full"
>
	<!-- Project list -->
	<div class="space-y-0">
		{#each projects as project, index}
			<a
				href={project.link}
				class="group block"
				onmouseenter={() => handleMouseEnter(index)}
				onmouseleave={handleMouseLeave}
			>
				<div class="border-border relative border-t py-5 transition-all duration-300 ease-out">
					<!-- Background highlight -->
					<div
						class="
              bg-secondary/50 absolute inset-0 -mx-4 rounded-lg px-4
              transition-all duration-300 ease-out
              {hoveredIndex === index ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
            "
					></div>

					<div class="relative flex items-start justify-between gap-4">
						<div class="min-w-0 flex-1">
							<div class="inline-flex items-center gap-2">
								<h3 class="text-foreground text-lg font-medium tracking-tight">
									<span class="relative">
										{project.title}
										<span
											class="
                        bg-foreground absolute -bottom-0.5 left-0 h-px
                        transition-all duration-300 ease-out
                        {hoveredIndex === index ? 'w-full' : 'w-0'}
                      "
										></span>
									</span>
								</h3>

								<ArrowUpRight
									class="
                    text-muted-foreground h-4 w-4
                    transition-all duration-300 ease-out
                    {hoveredIndex === index
										? 'translate-x-0 translate-y-0 opacity-100'
										: '-translate-x-2 translate-y-2 opacity-0'}
                  "
								/>
							</div>

							<p
								class="
                  text-muted-foreground mt-1 text-sm leading-relaxed
                  transition-all duration-300 ease-out
                  {hoveredIndex === index ? 'text-foreground/70' : 'text-muted-foreground'}
                "
							>
								{project.description}
							</p>
						</div>

						<span
							class="
                text-muted-foreground font-mono text-xs tabular-nums
                transition-all duration-300 ease-out
                {hoveredIndex === index ? 'text-foreground/60' : ''}
              "
						>
							{project.year}
						</span>
					</div>
				</div>
			</a>
		{/each}

		<div class="border-border border-t"></div>
	</div>
</div>
