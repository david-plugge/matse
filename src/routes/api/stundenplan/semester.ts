import * as v from 'valibot';

export function getCurrentSemester() {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = now.getUTCMonth();

	if (month < 2) {
		return `${year - 1}-winter`;
	}
	if (month > 7) {
		return `${year}-winter`;
	}
	return `${year}-summer`;
}

const schema = v.transform(
	v.fallback(v.string([v.regex(/^\d{4}-winter|summer$/)]), getCurrentSemester),
	(input) => {
		const [year, semester] = input.split('-');
		return {
			semester,
			year: parseInt(year)
		};
	}
);

export function parseSemesterString(semester?: string | null) {
	return v.parse(schema, semester);
}
