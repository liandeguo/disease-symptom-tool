import { resolveCondition } from '$lib/data/index'
import { error } from '@sveltejs/kit'

export const load = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const condition = resolveCondition(Number(slug))

    if (!condition) {
        throw error(404)
    }

    return {
        condition
    };
}