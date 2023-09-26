import { createEvents, convertTimestampToArray } from 'ics';
import { getSelectedEvents } from './calender.js';
import { error } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	const year = parseInt(url.searchParams.get('year') ?? 'ERROR');
	const winter = url.searchParams.get('winter') === 'true';
	const courses = url.searchParams.getAll('courses');

	const events = await getSelectedEvents(winter, year, courses);

	const result = createEvents(
		events.map((e) => {
			return {
				title: e.name,
				start: convertTimestampToArray(e.start, ''),
				end: convertTimestampToArray(e.end, '')
			};
		})
	);

	if (!result.value) {
		throw error(500);
	}

	return new Response(result.value, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': 'attachment; filename="calendar.ics"'
		}
	});
};
