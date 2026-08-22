import { json } from '@sveltejs/kit';
import { searchConditions, searchSymptoms } from '$lib/data/';
import type { RequestHandler } from './$types';

const MIN_LIMIT = 1;
const MAX_LIMIT = 25;
const DEFAULT_LIMIT = 10;

export const GET: RequestHandler = ({ url }) => {
	const query = url.searchParams.get('q') ?? '';

	const rawLimit = Number(url.searchParams.get('limit'));
	const limit = Number.isFinite(rawLimit)
		? Math.min(Math.max(Math.trunc(rawLimit), MIN_LIMIT), MAX_LIMIT)
		: DEFAULT_LIMIT;

	// Interleave conditions and symptoms so the best matches surface first,
	// instead of always listing every condition before any symptom.
	const results = [...searchConditions(query, limit), ...searchSymptoms(query, limit)].sort(
		(a, b) => b.relevance - a.relevance
	);

	return json(results.slice(0, limit * 2), {
		headers: { 'cache-control': 'public, max-age=60' }
	});
};
