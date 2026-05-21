import conditions from './index.json' with { type: 'json' };

export function resolveCondition(slug: Number) {
    return conditions.find((c: any) => c.id === slug)
    // return conditions.find((c: any) => 
    // c.name === slug || c.id === slug || c.name.toLowerCase() === slug.toLowerCase())
}
