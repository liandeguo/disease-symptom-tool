<script>
	import dataset from '$lib/data/dataset.json';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import Footer from '$lib/components/footer.svelte'
	import { toSlug } from '$lib/data/slug.js';

	let query = '';
	// Filter only for the disease searched, slice 10 for faster rendering
	$: filtered = dataset.filter(d => d.name.toLowerCase().includes(query.toLowerCase()))
</script>

<main class="flex h-screen w-screen flex-col items-center justify-between bg-[#f5f5f5]">
	<div></div>
	<div class="flex flex-col items-center justify-center">
		<h1 class="mb-5 font-['SourceSerif'] text-4xl">Search for a disease.</h1>
		<Command.Root class="w-150 rounded-lg border shadow-md md:min-w-112.5">
			<Command.Input placeholder="" bind:value={query}/>
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group heading="Last Searches">
						<Command.LinkItem href={''}>
							<!-- <a href={'/disease?id=' + disease.id}> {disease.name}</a> -->
						</Command.LinkItem>
				</Command.Group>
				<Command.Group heading="Suggestions">
					{#each filtered as disease}
						<Command.LinkItem href={'/diseases/' + toSlug(disease.name)}>
							{disease.name}
						</Command.LinkItem>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</div>
	<Footer></Footer>
</main>
