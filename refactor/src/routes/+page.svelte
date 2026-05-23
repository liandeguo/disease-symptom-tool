<!-- <script lang="ts">
	import { onMount } from 'svelte'

	type Condition = {
		name: string
		icd_10: string
		score?: number
		relevance?: number
	}

	let query = $state('')
	let results: Condition[] = []
	let loading = $state()

	let debounceTimeout: ReturnType<typeof setTimeout>

	async function search() {
		if (query.trim().length < 2) {
			results = []
			return
		}

		loading = true

		try {
			const res = await fetch(
				`/api/search?q=${encodeURIComponent(query)}`
			)

			results = await res.json()
		} catch (err) {
			console.error(err)
		} finally {
			loading = false
		}
	}

	function handleInput() {
		clearTimeout(debounceTimeout)

		debounceTimeout = setTimeout(() => {
			search()
		}, 200)
	}
</script>

<svelte:head>
	<title>Condition Search</title>
</svelte:head>

<div class="container">
	<h1>Search Conditions</h1>

	<input
		type="text"
		bind:value={query}
		on:input={handleInput}
		placeholder="Search conditions or ICD-10..."
		class="search"
	/>

	{#if loading}
		<p>Searching...</p>
	{/if}

	{#if results.length > 0}
		<div class="results">
			{#each results as result}
				<div class="card">
					<div class="top">
						<h2>{result.name}</h2>
						<span>{result.relevance}% match</span>
					</div>

					<p>ICD-10: {result.icd_10}</p>
				</div>
			{/each}
		</div>
	{:else if query.length >= 2 && !loading}
		<p>No results found.</p>
	{/if}
</div>
-->
<script lang="ts">
    import { Command } from "bits-ui";

    let query = $state('')
    let results = $state<{ name: string, icd_10: string }[]>([]);
    let loading = $state()

    async function search() {
        console.log('shake 1')
        if (query.trim().length < 2) {
            results = []
            return
        }

        loading = true
        try {
            const req = await fetch('/api/search?q=' + encodeURIComponent(query))

            results = await req.json()
        } catch (error) {
            console.log('error loading sigma ligma')
        } finally {
            loading = false
        }
    }
</script>
<main class="flex flex-col items-center justify-center w-screen h-screen">
    <nav><h1 class="mb-3">Symptom Explorer</h1></nav>
    {console.log(results)}
    <div class="w-120">
        <Command.Root onStateChange={() => search()} shouldFilter={false}
        class="divide-border border-muted bg-background flex h-full w-full flex-col divide-y self-start overflow-hidden rounded-xl border"
        >
        <Command.Input
            class="focus-override h-input placeholder:text-foreground-alt/50 bg-background focus:outline-hidden inline-flex truncate rounded-tl-xl rounded-tr-xl px-4 py-4 text-sm transition-colors focus:ring-0"
            placeholder="Search for a condition using it's name or ICD-10-CM" bind:value={query} 
        />
            {#if query.trim().length > 2}
                    <Command.List
                        class="overflow-y-auto overflow-x-hidden px-2 pb-2"
                    >
                        <Command.Viewport>
                        <Command.Empty
                            class="text-muted-foreground flex w-full items-center justify-center pb-6 pt-8 text-sm"
                        >
                            No results found.
                        </Command.Empty>
                        <Command.Group>
                            <Command.GroupItems>
                                {#each results as result}
                                    <a href="/conditions/{result.name}">
                                        <Command.Item class="searchItem flex items-center py-1">
                                            {result.name}
                                            <span class="badge bg-black">{result.icd_10}</span>
                                        </Command.Item>
                                    </a>
                                {/each}

                            </Command.GroupItems>
                        </Command.Group>
                        </Command.Viewport>
                    </Command.List>    
            {/if}
        </Command.Root>

    </div>
</main>


