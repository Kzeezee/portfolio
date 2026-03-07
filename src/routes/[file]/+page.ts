import { error } from '@sveltejs/kit';
import { getTerminalFileBySlug, TERMINAL_FILES } from '$lib/data/terminal-files';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return TERMINAL_FILES.map((file) => ({ file: file.slug }));
}

export const load: PageLoad = ({ params }) => {
	const selectedContent = getTerminalFileBySlug(params.file);
	if (!selectedContent) {
		error(404, 'File not found');
	}

	return {
		selectedFileId: selectedContent.id,
		selectedContent
	};
};
