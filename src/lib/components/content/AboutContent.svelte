<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import BadgeAnimatedBorder from '../ui/BadgeAnimatedBorder.svelte';
	import about from '$lib/content/about.yaml';
</script>

<section class="max-w-2xl space-y-6">
	<!-- Block A: Profile Header -->
	<div
		in:fly={{ x: -12, y: 6, duration: 420, delay: 0, easing: quintOut }}
		class="flex items-center gap-4 rounded-lg border border-border bg-card/40 p-4"
	>
		<div class="relative h-16 w-16 shrink-0">
			<img
				src="/images/profile.webp"
				alt="Profile avatar"
				class="h-full w-full rounded-xl border border-border/60 object-cover"
			/>
		</div>

		<div class="min-w-0 flex-1 space-y-1.5">
			<p class="font-mono text-xs text-primary">// software engineer &amp; cs student</p>
			<p class="font-mono text-xs text-muted-foreground">&gt; singapore · smu</p>
			<div class="flex flex-wrap gap-1.5 pt-0.5">
				<span
					class="rounded-sm border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
					>cs @ smu</span
				>
				<span
					class="rounded-sm border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
					>software eng</span
				>
				<span
					class="rounded-sm border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
					>ai focus</span
				>
			</div>
		</div>
	</div>

	<!-- Block B: Bio -->
	<div in:fly={{ x: -12, y: 6, duration: 420, delay: 80, easing: quintOut }}>
		<h3 class="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-primary">
			<span class="block h-px w-8 bg-primary/50"></span>
			Who I Am
		</h3>
		<div class="mt-3 space-y-2">
			{#each about.bio as line, i}
				<p
					in:fly={{ x: -8, y: 4, duration: 380, delay: 150 + i * 80, easing: quintOut }}
					class="text-sm leading-6 text-foreground/90"
				>
					{line}
				</p>
			{/each}
		</div>
	</div>

	<!-- Block C: Tech Stack -->
	<div in:fly={{ x: -12, y: 6, duration: 420, delay: 160, easing: quintOut }}>
		<h3 class="flex items-center gap-2 font-mono text-sm font-semibold tracking-wider text-primary">
			<span class="block h-px w-8 bg-primary/50"></span>
			Tech Stack
		</h3>
		<div class="mt-3 space-y-3">
			{#each about.skills as group, i}
				<div in:fly={{ x: -12, y: 6, duration: 420, delay: 200 + i * 100, easing: quintOut }}>
					<p class="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
						{group.category}
					</p>
					<div class="flex flex-wrap gap-1.5">
						{#each group.items as tech (tech)}
							<BadgeAnimatedBorder text={tech} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	
</section>
