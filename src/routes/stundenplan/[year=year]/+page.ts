import { redirect } from '@sveltejs/kit';

export const load = ({ params }) => {
	const month = new Date().getMonth() + 1;

	const isWinter = month >= 9 || month <= 3;

	throw redirect(303, `/stundenplan/${params.year}/${isWinter ? 'winter' : 'sommer'}`);
};
