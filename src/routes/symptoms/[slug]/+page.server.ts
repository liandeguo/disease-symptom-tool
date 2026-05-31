import { resolveSymptom, resolveConditionName } from '$lib/data';
import { error } from '@sveltejs/kit';

export const load = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;
	const symptom = await resolveSymptom(slug.toLowerCase().replace(/\s+/g, '_'));

	if (!symptom) {
		throw error(404, 'sigma');
	}

	return {
		symptom
	};
};
