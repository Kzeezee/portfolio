declare module '$lib/content/last_updated.yaml' {
	const value: Record<string, string>;
	export default value;
}

declare module '$lib/content/experience.yaml' {
	const value: Array<{
		role: string;
		company: string;
		period: string;
		description: string;
		tech: string[];
	}>;
	export default value;
}

declare module '$lib/content/about.yaml' {
	interface SkillCategory {
		category: string;
		items: string[];
	}
	interface Interest {
		label: string;
		icon: string;
	}
	const value: {
		bio: string[];
		skills: SkillCategory[];
		interests: Interest[];
	};
	export default value;
}
