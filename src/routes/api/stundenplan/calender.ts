import { format } from 'date-fns';

const ACADEMIC_YEAR_NAMES = ['1. Lehrjahr', '2. Lehrjahr', '3. Lehrjahr', 'Wahlpflicht'];

export async function getSelectedEvents(winter: boolean, year: number, courses: string[]) {
	const events = await getAllEvents(winter, year);

	return events.filter((e) => courses.includes(e.name));
}

async function getAllEvents(winter: boolean, year: number) {
	const events: any[] = [];
	for (let i = 0; i < ACADEMIC_YEAR_NAMES.length; i++) {
		const e = await getAcademicYearEvents(winter, year, i + 1);
		events.push(...e);
	}
	return events;
}

export async function getEventNames(winter: boolean, year: number) {
	const events: Record<string, any[]> = {};

	for (let i = 0; i < ACADEMIC_YEAR_NAMES.length; i++) {
		const e = await getAcademicYearEvents(winter, year, i + 1);

		events[ACADEMIC_YEAR_NAMES[i]] = [
			...new Set(e.filter((e) => !e.isHoliday).map((e) => e.name.replace(/^\(!\)\s+/, '')))
		];
	}

	return events;
}

async function getAcademicYearEvents(
	winter: boolean,
	year: number,
	academicYear: number
): Promise<any[]> {
	const start = winter ? new Date(year, 9, 1) : new Date(year, 3, 1);
	const end = winter ? new Date(year + 1, 3, 15) : new Date(year, 9, 15);
	const feedUrl = new URL(
		`https://www.matse.itc.rwth-aachen.de/stundenplan/web/eventFeed/${academicYear}`
	);
	feedUrl.searchParams.set('start', format(start, 'yyyy-MM-dd'));
	feedUrl.searchParams.set('end', format(end, 'yyyy-MM-dd'));

	return await fetch(feedUrl).then((res) => res.json());
}
