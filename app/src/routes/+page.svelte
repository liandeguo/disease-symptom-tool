<script>
	import dataset from '$lib/data/dataset.json';

	let searchTerm = '';
	$: results = dataset.filter((d) => d.name.includes(searchTerm));
	// $: results = dataset.filter((d) => new RegExp(searchTerm, 'i'));
	// console.log(dataset.filter((d) => d.name.includes('panic')));
</script>

<main>
	<input bind:value={searchTerm} placeholder="search" />
	<ul>
		{#each results as disease}
			<a href={'/disease?id=' + disease.id}> <li>{disease.name}</li></a>
		{/each}
	</ul>
</main>
