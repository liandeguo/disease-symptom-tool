// server side
import conditions from './index.json' with { type: 'json' };
import symptoms from './index.json' with { type: 'json'};
// import Fuse from 'fuse.js';

async function wikipediaAPI(query: any) {
    const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + query)

    if(!response.ok) {
        throw new Error('wikipedia is retardet')
    }

    const data = await response.json()
    return data.extract
};

async function clinicalTrialsAPI(query: any){
    const response = await fetch('https://clinicaltrials.gov/api/v2/studies?format=json&query.cond=' + query +'&filter.overallStatus=ACTIVE_NOT_RECRUITING&sort=%40relevance&pageSize=3')
     if (!response.ok) {
        throw new Error('clinicaltrials org is dumb')
     }

     const data = await response.json()
     return data.studies
}

export async function resolveCondition(slug: Number) {
    const condition = conditions.find((c: any) => c.id === slug)
    const wikipediaResults = await wikipediaAPI(condition?.name)
    const clinicalTrials = await clinicalTrialsAPI(condition?.name)

    const data = {
        ...condition,
        summary: await wikipediaResults,
        clinicalTrials: await clinicalTrials
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
