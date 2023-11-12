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
