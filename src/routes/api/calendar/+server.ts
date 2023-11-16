import { getAllEvents } from './calendar.js';
import { formatDateToICSDate, formatDateToICSDateTime, formatText } from './ics.js';
import { parseSemesterString } from './semester.js';

export const GET = async ({ url }) => {
	const { year, semester } = parseSemesterString(url.searchParams.get('semester'));
	const courses = url.searchParams.getAll('courses');

	const allEvents = await getAllEvents(semester === 'winter', year);
	const events = allEvents.filter((e) => courses.includes(e.name));

	const creationTimestamp = formatDateToICSDateTime(new Date());

	const icsString = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		`PRODID:-//davidplugge/calender/matse`,
		'X-WR-CALNAME:Matse Stundenplan',
		'NAME:Matse Stundenplan',
		...events.flatMap((e) => {
			const start = formatDateToICSDateTime(e.start);

			return [
				'BEGIN:VEVENT',
				`UID:${start}-${e.name.toLowerCase().replace(/\s+/g, '_')}@matse.davidplugge.de`,
				`DTSTAMP:${creationTimestamp}`,
				e.allDay ? `DTSTART;VALUE=DATE:${formatDateToICSDate(e.start)}` : `DTSTART:${start}`,
				!e.allDay && `DTEND:${formatDateToICSDateTime(e.end)}`,
				formatText(`SUMMARY:${e.name}`),
				formatText(`DESCRIPTION:${e.information}`),
				formatText(
					`LOCATION:${[e.location.name, `${e.location.street} ${e.location.nr}`, e.location.desc]
						.filter(Boolean)
						.join('\n')}`
				),
				formatText(`ORGANIZER:CN=${e.lecturer.name}:MAILTO:${e.lecturer.mail}`),

				e.isLecture && formatText(`CATEGORIES:Lecture`),
				e.isExercise && formatText(`CATEGORIES:Exercise`),
				e.isHoliday && formatText(`CATEGORIES:Holiday`),

				'END:VEVENT'
			];
		}),
		'END:VCALENDAR'
	]
		.filter(Boolean)
		.join('\r\n');

	return new Response(icsString, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': 'attachment; filename="calendar.ics"'
		}
	});
};
