import { format } from 'date-fns';
import * as v from 'valibot';
import { parseDateWithTimeZone } from './ics';

function parseEventStringBoolean(input: unknown) {
	return input !== '0' && input !== '' && typeof input !== 'undefined';
}
const DATE_REGEX =
	/^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])T(?:0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d$/u;

function parseEventStringDate(input: string) {
	return parseDateWithTimeZone(input, 'Europe/Berlin');
}

const calenderEventSchema = v.object({
	title: v.string(),
	name: v.string(),
	start: v.transform(v.string([v.regex(DATE_REGEX)]), parseEventStringDate),
	end: v.transform(v.string([v.regex(DATE_REGEX)]), parseEventStringDate),
	location: v.object({
		name: v.string(),
		street: v.string(),
		nr: v.string(),
		desc: v.string()
	}),
	lecturer: v.object({
		name: v.optional(v.string()),
		mail: v.optional(v.string())
	}),
	information: v.string(),
	isHoliday: v.coerce(v.boolean(), parseEventStringBoolean),
	isExercise: v.coerce(v.boolean(), parseEventStringBoolean),
	allDay: v.boolean(),
	isLecture: v.coerce(v.boolean(), parseEventStringBoolean)
});
const calenderEventListSchema = v.array(calenderEventSchema);

export type CalenderEvent = v.Output<typeof calenderEventSchema>;

const ACADEMIC_YEAR_NAMES = ['1. Lehrjahr', '2. Lehrjahr', '3. Lehrjahr', 'Wahlpflicht'];

export async function getAllEvents(winter: boolean, year: number): Promise<CalenderEvent[]> {
	const events: CalenderEvent[] = [];
	for (let i = 0; i < ACADEMIC_YEAR_NAMES.length; i++) {
		const e = await getAcademicYearEvents(winter, year, i + 1);
		events.push(...e);
	}
	return events;
}

export async function getEventNames(winter: boolean, year: number) {
	const events: Record<string, string[]> = {};

	for (let i = 0; i < ACADEMIC_YEAR_NAMES.length; i++) {
		const e = await getAcademicYearEvents(winter, year, i + 1);

		events[ACADEMIC_YEAR_NAMES[i]] = [
			...new Set(e.filter((e) => !e.isHoliday).map((e) => e.name.replace(/^\(!\)\s+/, '')))
		].sort();
	}

	return events;
}

async function getAcademicYearEvents(winter: boolean, year: number, academicYear: number) {
	const start = winter ? new Date(year, 8, 1) : new Date(year, 2, 1);
	const end = winter ? new Date(year + 1, 2, 15) : new Date(year, 8, 15);
	const feedUrl = new URL(
		`https://www.matse.itc.rwth-aachen.de/stundenplan/web/eventFeed/${academicYear}`
	);
	feedUrl.searchParams.set('start', format(start, 'yyyy-MM-dd'));
	feedUrl.searchParams.set('end', format(end, 'yyyy-MM-dd'));

	return await fetch(feedUrl)
		.then((res) => res.json())
		.then((data) => v.parse(calenderEventListSchema, data));
}
