/**
 * Theme store — manages light/dark mode by toggling the `.dark` class
 * on the <html> element. Persists the preference to localStorage.
 */

const STORAGE_KEY = 'theme';

type Theme = 'light' | 'dark';

function createThemeStore() {
	// Initialise from localStorage or system preference (SSR-safe)
	function getInitial(): Theme {
		if (typeof window === 'undefined') return 'light';
		const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
		if (stored === 'light' || stored === 'dark') return stored;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	let theme = $state<Theme>(getInitial());

	function apply(value: Theme) {
		if (typeof document === 'undefined') return;
		document.documentElement.classList.toggle('dark', value === 'dark');
	}

	// Apply immediately on first load
	apply(theme);

	function toggle() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem(STORAGE_KEY, theme);
		apply(theme);
	}

	function set(value: Theme) {
		theme = value;
		localStorage.setItem(STORAGE_KEY, theme);
		apply(theme);
	}

	return {
		get current() {
			return theme;
		},
		get isDark() {
			return theme === 'dark';
		},
		toggle,
		set
	};
}

export const themeStore = createThemeStore();
