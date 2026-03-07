<script lang="ts">
	import FileTreeNode from './FileTreeNode.svelte';
	import type { FileNode } from '../../types/file-tree.types';

	export type { FileNode };

	export let nodes: FileNode[] = [];
	export let depth: number = 0;
	export let onFileClick: (id: string) => void = () => {};
	export let getFileHref: (id: string) => string = (id) => `/${id}`;
	export let activeFile: string | null = null;
	export let autoExpand: boolean = false;
</script>

<div class="select-none">
	{#each nodes as node, index}
		<FileTreeNode {node} {depth} {index} {onFileClick} {getFileHref} {activeFile} {autoExpand} />
	{/each}
</div>
