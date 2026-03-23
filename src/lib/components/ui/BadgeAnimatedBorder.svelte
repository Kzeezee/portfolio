<script lang="ts">
	let { text = 'Badge' }: { text?: string } = $props();
</script>

<div
	class="inline-flex animate-shine items-center justify-center rounded-sm border border-border/60 bg-[linear-gradient(110deg,var(--card),45%,var(--muted),55%,var(--card))] bg-[length:200%_100%] px-2 py-0.5 font-mono text-[11px] text-foreground/75 transition-colors"
>
  {text}
</div>
