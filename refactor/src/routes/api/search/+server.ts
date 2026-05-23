import { json } from '@sveltejs/kit'
import { searchConditions } from '$lib/data/'

export async function GET({
	url
}: {
	url: URL
}) {
	const query = url.searchParams.get('q') || ''
	const limit = Number(url.searchParams.get('limit') || 10)

	const results = searchConditions(query, limit)

	return json(results)
}