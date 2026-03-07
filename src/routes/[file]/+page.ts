import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

const FILE_PAGES = {
	about: {
		title: 'About Me',
		description: 'A short intro focused on product-minded engineering and building polished UI systems.'
	},
	experience: {
		title: 'Experience',
		description:
			'Recent roles and outcomes with emphasis on measurable product and platform improvements.'
	},
	projects: {
		title: 'Projects',
		description: 'Selected builds across product interfaces, tooling, and frontend performance work.'
	},
	contact: {
		title: 'Contact',
		description: 'Ways to collaborate, availability notes, and preferred channels.'
	}
} as const;

type TerminalFileId = keyof typeof FILE_PAGES;

function isTerminalFileId(id: string): id is TerminalFileId {
	return id in FILE_PAGES;
}

export function entries() {
	return (Object.keys(FILE_PAGES) as TerminalFileId[]).map((file) => ({ file }));
}

export const load: PageLoad = ({ params }) => {
	if (!isTerminalFileId(params.file)) {
		error(404, 'File not found');
	}

	const selectedPage = FILE_PAGES[params.file];

	return {
		selectedFileId: params.file,
		title: selectedPage.title,
		description: selectedPage.description
	};
};
