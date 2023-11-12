type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function submitNearestForm(e: Event & { currentTarget: FormElement }) {
	e.currentTarget.form?.requestSubmit();
}

export function debounce<Args extends any[]>(ms: number, fn: (...args: Args) => void) {
	let timeout: ReturnType<typeof setTimeout>;

	return (...args: Args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			fn(...args);
		}, ms);
	};
}

export function debounceSubmitNearestForm(ms = 300) {
	const run = debounce(ms, (target: FormElement) => target.form?.requestSubmit());
	return (e: Event) => {
		run(e.currentTarget as FormElement);
	};
}
