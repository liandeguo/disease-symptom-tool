// server side
import { resolveCondition } from '$lib/data/';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const condition = await resolveCondition(params.slug.toLowerCase().replace(/\s+/g, '_'));

	if (!condition) {
		error(404, 'Condition not found');
	}

	return {
		condition
	};
};
