<script lang="ts">
	let { text = 'Badge' }: { text?: string } = $props();
</script>

<div
	class="group relative grid overflow-hidden rounded-sm bg-border/50 px-2 py-0.5 transition-colors duration-200"
>
	<span>
		<span
			class="spark mask-gradient animate-flip animate-kitrotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-sm text-foreground [mask:linear-gradient(white,_transparent_50%)] before:absolute before:[inset:0_auto_auto_50%] before:aspect-square before:w-[200%] before:[translate:-50%_-15%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,currentColor_360deg)] before:content-['']"
		/>
	</span>
	<span class="backdrop absolute inset-px rounded-sm bg-secondary transition-colors duration-200" />
	<span class="z-10 font-mono text-[11px] text-secondary-foreground">{text}</span>
</div>

<style>
	.animate-flip {
		animation: flip 6s infinite steps(2, end);
	}
	.animate-kitrotate::before {
		animation: kitrotate 3s linear infinite both;
	}
	@keyframes flip {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes kitrotate {
		to {
			transform: rotate(90deg);
		}
	}
</style>
