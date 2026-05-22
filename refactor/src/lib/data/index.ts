// server side
import conditions from './index.json' with { type: 'json' };
import symptoms from './index.json' with { type: 'json'};
// import Fuse from 'fuse.js';

async function wikipediaAPI(query: any) {
    const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/heart attack')

    if(!response.ok) {
        throw new Error('wikipedia is retardet')
    }

    const data = await response.json()
    return data.extract
};

export async function resolveCondition(slug: Number) {
    const condition = conditions.find((c: any) => c.id === slug)
    const wikipediaResults = await wikipediaAPI(condition?.name)
    
    const data = {
        ...condition,
        summary: await wikipediaResults
    }
    return data
    // return conditions.find((c: any) => 
    // c.name === slug || c.id === slug || c.name.toLowerCase() === slug.toLowerCase())
}

export function resolveSymptom(slug: any) {
    return symptoms.find((c:any) => c.name === slug )
}

// const fuse = new Fuse(conditions, {

// })
