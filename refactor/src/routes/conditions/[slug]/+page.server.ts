// client side
import { resolveCondition } from '$lib/data/index';
import { error } from '@sveltejs/kit';

export const load = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;
	const condition = await resolveCondition(slug.toLowerCase().replace(/\s+/g, '_'));

	if (!condition) {
		throw error(404);
	}

	return {
		condition
	};
};
