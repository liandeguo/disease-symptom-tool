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