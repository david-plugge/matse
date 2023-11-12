import { getEventNames } from '../api/stundenplan/calender.js';
import { parseSemesterString } from '../api/stundenplan/semester.js';

export const load = async ({ url }) => {
	const { semester, year } = parseSemesterString(url.searchParams.get('semester'));

	const events = await getEventNames(semester === 'winter', year);

	return {
		semester: `${year}-${semester}`,
		events,
		selectedCourses: url.searchParams.getAll('courses')
	};
};
