    export async function wikipedia(disease) {
        try {
            const response = await(fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + disease))
            if (!response.ok) {

            }
            const result = await response.json()
            return result
        } catch (error) {
            console.error(error.message);
        }
    } 

    export async function clinicalTrials(disease) {
        try {
            const response = await(fetch('https://clinicaltrials.gov/api/v2/studies?query.cond=' + disease + '&filter.overallStatus=ACTIVE_NOT_RECRUITING&sort=%40relevance&pageSize=3'))
            const result = await response.json()
            return result
        } catch (error) {
            console.error(error.message)
        }
    }