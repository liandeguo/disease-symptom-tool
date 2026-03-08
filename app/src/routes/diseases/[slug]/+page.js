import { error } from '@sveltejs/kit';
import { toSlug } from '$lib/data/slug.js';
import diseases from '$lib/data/dataset.json';

export function load({ params }) {
    const id = diseases.findIndex(d => toSlug(d.name) === params.slug);

    if (id === -1) {
        throw error(404, {message: 'disease not found', disease: params.slug});
    }

    const disease = diseases[id];

    return { disease, id };
}
