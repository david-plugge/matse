import { format } from 'date-fns';
import * as v from 'valibot';
import { type AcademicYear, type Semester, eventSchema, semesterSchema } from './schemas';

function getSemesterStartEnd({ winter_semester, year }: Semester) {
	return {
		start: winter_semester ? new Date(year, 9, 1) : new Date(year, 3, 1),
		end: winter_semester ? new Date(year + 1, 3, 15) : new Date(year, 9, 15)
	};
}

function getEvents(semester: Semester, academicYear: AcademicYear) {
	const url = new URL(
		`https://www.matse.itc.rwth-aachen.de/stundenplan/web/eventFeed/${academicYear}`
	);
	const { start, end } = getSemesterStartEnd(semester);
	url.searchParams.set('start', format(start, 'yyyy-MM-dd'));
	url.searchParams.set('end', format(end, 'yyyy-MM-dd'));

	return fetch(url)
		.then((res) => res.json())
		.then((data) => v.parse(v.array(eventSchema), data));
}

const coursesSchema = v.array(v.string());

export const GET = async ({ url }) => {
	const semester = v.parse(semesterSchema, {
		winter_semester: url.searchParams.get('winter_semester'),
		year: url.searchParams.get('year')
	});
	const courses = v.parse(coursesSchema, url.searchParams.get('courses'));

	return new Response();
};

interface Calender {
	version: string;
	prodId: string;
	events: Array<{
		id: string;
		start: Date;
		end: Date;
		name: string;
		location: string;
		categories: string[];
	}>;
}

function json2ics() {}
