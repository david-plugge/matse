import { getAllEvents } from './calender.js';
import { formatDateToICSDate, formatDateToICSDateTime, formatText } from './ics.js';
import { parseSemesterString } from './semester.js';

// http://localhost:5173/api/stundenplan?semester=winter&year=2023&courses=Algorithmen&courses=Analysis+2&courses=BeginnerMeeting&courses=Einf%C3%BChrung+in+die+MATSE-Dienste&courses=Erstievent&courses=Java-Blockkurs&courses=Klausureinsicht&courses=Lineare+Algebra+2&courses=Mathematische+Grundlagen&courses=Siegerehrung+MATSE+Rallye&courses=Theoretische+Informatik&courses=Tutorium+Java&courses=Tutorium+Mathematik+-+Analysis+1&courses=Tutorium+Mathematik+-+Analysis+2&courses=Wahlmodulvorstellung&courses=%C3%9Cbung+1.+Lehrjahr
export const GET = async ({ url }) => {
	const { year, semester } = parseSemesterString(url.searchParams.get('semester'));
	const courses = url.searchParams.getAll('courses');

	const events = await getAllEvents(semester === 'winter', year).then((events) =>
		events.filter((e) => courses.includes(e.name))
	);

	const creationTimestamp = formatDateToICSDateTime(new Date());

	const icsString = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		`PRODID:-//davidplugge/calender/matse`,
		...events.flatMap((e) => {
			const start = formatDateToICSDateTime(e.start);

			return [
				'BEGIN:VEVENT',

				`UID:${start}-${e.name.toLowerCase()}@matse.davidplugge.de`,
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
