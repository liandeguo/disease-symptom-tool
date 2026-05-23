// server side
import conditions from './index.json' with { type: 'json' };
import symptoms from './index.json' with { type: 'json'};
import Fuse from 'fuse.js';

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

async function clinicalTablesAPI(query: any) {
    let icd_main = query.split('.')[0]
    const response = await fetch('https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=' + icd_main)
    
    if (!response.ok) {
        throw new Error('fuck icd');
    }

    const data = await response.json()
    return data[data.length - 1]
}

export async function resolveCondition(slug: String) {
    const condition = conditions.find((c: any) => c.name.toLowerCase().replace(/\s+/g, '_') === slug || c.id === Number(slug))
    const wikipediaResults = await wikipediaAPI(condition?.name)
    const clinicalTrials = await clinicalTrialsAPI(condition?.name)
    const icd_main = await clinicalTablesAPI(condition?.icd_10)

    const data = {
        ...condition,
        summary: await wikipediaResults,
        clinicalTrials: await clinicalTrials,
        icdStructure: await icd_main
    }
    return data
    // return conditions.find((c: any) => 
    // c.name === slug || c.id === slug || c.name.toLowerCase() === slug.toLowerCase())
}

export function resolveSymptom(slug: any) {
    return symptoms.find((c:any) => c.name === slug )
}

const fuse = new Fuse(conditions, {
    keys: [
        {name: 'name', weight: 0.7},
        {name: 'icd_10', weight: 0.7}
    ],
    threshold: 0.4,
    includeScore: true,
    ignoreLocation: true,
    useExtendedSearch: true,
});

export function searchConditions(query:string, limit=10) {
    if (!query || query.trim().length < 2) {
        return []
    }

    const results = fuse.search(query)

    return results.slice(0, limit).map(results => ({...results.item, score: results.score, relevance: Math.round((1- (results.score || 0)) * 100)}))
}

