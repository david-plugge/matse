import { getEventNames } from '../../../api/stundenplan/calender.js';

export const load = async ({ params }) => {
	const year = parseInt(params.year);
	const isWinter = params.semester === 'winter';

	const events = await getEventNames(isWinter, year);

	return {
		...params,
		events
	};
};
