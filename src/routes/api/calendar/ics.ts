export function parseDateWithTimeZone(dateString: string, timeZone: string) {
	const date = new Date(dateString.replace(/Z?$/, 'Z'));
	const parts = ['year', 'month', 'day', 'hour', 'minute', 'second'] as const;

	const f = new Intl.DateTimeFormat(undefined, {
		...parts.reduce((p, v) => ({ ...p, [v]: 'numeric' }), {}),
		hour12: false,
		timeZone
	})
		.formatToParts(date)
		.reduce((p, v) => ({ ...p, [v.type]: v.value }), {} as Record<(typeof parts)[number], number>);

	return new Date(
		date.getTime() +
			date.getTime() -
			Date.UTC(f.year, f.month - 1, f.day, f.hour, f.minute, f.second, date.getUTCMilliseconds())
	);
}

function pad(input: number, len: number) {
	return input.toString().padStart(len, '0');
}

export function formatDateToICSDateTime(date: Date) {
	return [
		pad(date.getUTCFullYear(), 4),
		pad(date.getUTCMonth() + 1, 2),
		pad(date.getUTCDate(), 2),
		'T',
		pad(date.getUTCHours(), 2),
		pad(date.getUTCMinutes(), 2),
		pad(date.getUTCSeconds(), 2),
		'Z'
	].join('');
}

export function formatDateToICSDate(date: Date) {
	const pad = (input: number, len: number) => input.toString().padStart(len, '0');

	return [
		pad(date.getUTCFullYear(), 4),
		pad(date.getUTCMonth() + 1, 2),
		pad(date.getUTCDate(), 2)
	].join('');
}

function foldLine(text: string) {
	const length = 75;
	if (text.length <= length) {
		return text;
	}
	let out = '';
	for (let i = 0; i < text.length; i += length) {
		out += text.substring(i, i + length);
	}
	return out;
}

export function formatText(text: string) {
	return foldLine(
		text
			.replace(/<br \/>/g, '\n')
			.replace(/\\/gm, '\\\\')
			.replace(/\r?\n/gm, '\\n')
			.replace(/;/gm, '\\;')
			.replace(/,/gm, '\\,')
	);
}
