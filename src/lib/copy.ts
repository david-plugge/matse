import { writable } from 'svelte/store';

export function createCopyButton(getContent?: () => string) {
	const state = writable<'idle' | 'success' | 'error'>('idle');

	async function copy(content?: string) {
		try {
			const text = getContent?.() ?? content;
			if (typeof text !== 'string') {
				throw 'no content provided';
			}
			await navigator.clipboard.writeText(text);
			state.set('success');
		} catch {
			state.set('error');
		} finally {
			setTimeout(() => {
				state.set('idle');
			}, 1000);
		}
	}

	return {
		subscribe: state.subscribe,
		copy
	};
}
