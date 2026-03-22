/**
 * Terminal state store — persists the reveal state of the terminal UI
 * across page navigations so the file tree stays visible after deselecting a file.
 */

let hasHiddenInput = $state(false);
let hasExpandedTerminalBody = $state(false);
let hasRevealedTree = $state(false);

export const terminalState = {
	get hasHiddenInput() {
		return hasHiddenInput;
	},
	set hasHiddenInput(v: boolean) {
		hasHiddenInput = v;
	},
	get hasExpandedTerminalBody() {
		return hasExpandedTerminalBody;
	},
	set hasExpandedTerminalBody(v: boolean) {
		hasExpandedTerminalBody = v;
	},
	get hasRevealedTree() {
		return hasRevealedTree;
	},
	set hasRevealedTree(v: boolean) {
		hasRevealedTree = v;
	}
};
