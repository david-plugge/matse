import { getEventNames } from '../api/stundenplan/calender.js';
import { parseSemesterString } from '../api/stundenplan/semester.js';

export const load = async ({ url }) => {
	const { semester, year } = parseSemesterString(url.searchParams.get('semester'));

	return {
		semester: `${year}-${semester}`,
		lazy: {
			events: Promise.all([
				getEventNames(semester === 'winter', year),
				new Promise((res) => setTimeout(res, 500))
			]).then(([events]) => events)
		},
		selectedCourses: url.searchParams.getAll('courses')
	};
};
