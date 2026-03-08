<script>
	import { page } from '$app/state';
    import { Separator } from "$lib/components/ui/separator/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { toSlug } from '$lib/data/slug.js';
    import database from '$lib/data/dataset.json'

    let filter = database.filter(d => d.name.toLowerCase().includes(page.error.disease.slice(0,3))).slice(0,3)
    if (filter.length == 0) {
        filter = database.slice(0,3)
    }
</script>

<!-- <h1>{page.status} {page.error.message}</h1> -->

<main class="flex h-screen w-screen items-center justify-center flex-col bg-[#f5f5f5]">
    <h1 class="font-[SourceSerif] text-8xl">{page.status}</h1>
    {#if page.error.message == 'disease not found'}
        <div class="text-center">
            <h2 class="text-xl font-medium">We couldn’t find that condition.</h2>
            <p class="text-[#525252]">It might be spelled differently, listed under another name, or not yet included in our database.</p>
            <Separator class="m-4"/>
            <h2 class="mb-1">Did you mean:</h2>
            <div class="flex items-center justify-center">        
                {#each filter as disease}
                    <a href="/diseases/{toSlug(disease.name)}" class="m-1"><Button variant="outline">{disease.name}</Button></a>
                {/each}
                <a href="/" class="m-1"><Button>Go Back</Button></a>
            </div>
        </div>
    {/if}
</main>