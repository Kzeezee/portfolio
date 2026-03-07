import type { FileNode } from '$lib/types/file-tree.types';

export type TerminalFileId = 'about' | 'experience' | 'projects' | 'contact';

export interface TerminalFileSection {
	heading: string;
	body: string[];
	list?: string[];
}

export interface TerminalFileContent {
	id: TerminalFileId;
	slug: string;
	fileName: string;
	icon: NonNullable<FileNode['icon']>;
	title: string;
	description: string;
	updatedAt: string;
	sections: TerminalFileSection[];
}

export const TERMINAL_FILES: TerminalFileContent[] = [
	{
		id: 'about',
		slug: 'about',
		fileName: 'about.md',
		icon: 'text',
		title: 'About Me',
		description: 'A short intro focused on product-minded engineering and building polished UI systems.',
		updatedAt: 'March 7, 2026',
		sections: [
			{
				heading: 'Who I Am',
				body: [
					'I design and ship web products with a focus on smooth interactions, clear architecture, and maintainable code.',
					'I care about the details that users notice: fast loading, clear content structure, and clean visual rhythm.'
				]
			},
			{
				heading: 'Current Focus',
				body: ['I am currently refining this portfolio to blend terminal aesthetics with modern responsive layouts.'],
				list: [
					'SvelteKit-based component architecture',
					'Animation systems with practical motion constraints',
					'SEO-aware content routing'
				]
			}
		]
	},
	{
		id: 'experience',
		slug: 'experience',
		fileName: 'experience.json',
		icon: 'json',
		title: 'Experience',
		description: 'Recent roles and outcomes with emphasis on measurable product and platform improvements.',
		updatedAt: 'March 7, 2026',
		sections: [
			{
				heading: 'Highlights',
				body: [
					'This section is placeholder content for now, but it is structured for easy replacement with real timeline data.',
					'Each item can later map to enriched cards with links, outcomes, and stack details.'
				],
				list: [
					'Built reusable UI primitives for internal apps',
					'Improved release confidence with lightweight validation pipelines',
					'Reduced UI regressions through component-level test coverage'
				]
			}
		]
	},
	{
		id: 'projects',
		slug: 'projects',
		fileName: 'projects.tsx',
		icon: 'code',
		title: 'Projects',
		description: 'Selected builds across product interfaces, tooling, and frontend performance work.',
		updatedAt: 'March 7, 2026',
		sections: [
			{
				heading: 'Featured Work',
				body: [
					'Project content is placeholder-only right now. Replace this with production projects, links, and screenshots.',
					'The layout already supports longer narrative sections and compact bullet summaries.'
				],
				list: [
					'Design-system starter with themed components',
					'Personal dashboard with API integrations',
					'Interactive narrative page with staged animation'
				]
			}
		]
	},
	{
		id: 'contact',
		slug: 'contact',
		fileName: 'contact.txt',
		icon: 'mail',
		title: 'Contact',
		description: 'Ways to collaborate, availability notes, and preferred channels.',
		updatedAt: 'March 7, 2026',
		sections: [
			{
				heading: 'Get In Touch',
				body: [
					'This is placeholder contact content for now.',
					'Use this area for links to email, GitHub, LinkedIn, and current availability.'
				],
				list: ['Email: hello@example.com', 'GitHub: github.com/your-handle', 'LinkedIn: linkedin.com/in/your-handle']
			}
		]
	}
];

export const FILE_TREE_ROOT: FileNode[] = [
	{
		type: 'folder',
		name: 'my-portfolio',
		children: TERMINAL_FILES.map((file) => ({
			type: 'file' as const,
			name: file.fileName,
			icon: file.icon,
			id: file.id
		}))
	}
];

export const TERMINAL_FILE_IDS = TERMINAL_FILES.map((file) => file.id);

export function getTerminalFileById(id: string | null | undefined): TerminalFileContent | null {
	if (!id) return null;
	return TERMINAL_FILES.find((file) => file.id === id) ?? null;
}

export function getTerminalFileBySlug(slug: string | null | undefined): TerminalFileContent | null {
	if (!slug) return null;
	return TERMINAL_FILES.find((file) => file.slug === slug) ?? null;
}
