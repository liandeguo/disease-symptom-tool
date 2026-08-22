import { resolveSymptom, resolveConditionName } from '$lib/data';
import { error } from '@sveltejs/kit';

// Likelihood thresholds (percentage of patients with this symptom) per bucket.
const MEDIUM_THRESHOLD = 5;
const HIGH_THRESHOLD = 21;

export const load = async ({ params }) => {
	const symptom = await resolveSymptom(params.slug.toLowerCase().replace(/\s+/g, '_'));

	if (!symptom) {
		error(404, 'Symptom not found');
	}

	// Resolved here on the server so the full dataset is never shipped to the client.
	const linked = (symptom.id ?? [])
		.map((id) => resolveConditionName(id, symptom.symptom))
		.filter((c) => c?.name != null && c.symptom != null)
		.map((c) => ({ name: c.name, likelihood: c.symptom }));

	const linkedConditions = {
		low: linked.filter((c) => c.likelihood < MEDIUM_THRESHOLD),
		medium: linked.filter((c) => c.likelihood >= MEDIUM_THRESHOLD && c.likelihood < HIGH_THRESHOLD),
		high: linked.filter((c) => c.likelihood >= HIGH_THRESHOLD)
	};

	return {
		symptom,
		linkedConditions
	};
};
