<script>
	import { page } from '$app/stores';
	import dataset from '$lib/data/dataset.json';

	let entry = null;
	let id = '';

	$: id = $page.url.searchParams.get('id');
	$: if (id) {
		entry = dataset.find((d) => d.id == id);
	}
	console.log(dataset);
</script>

<main>
	{#if !id}
		<h2>s</h2>
	{:else if !entry}
		<h2>x</h2>
	{:else}
		{entry.name}
		<hr />
		<h2>Symptoms</h2>
		<br />
		{#each entry.symptoms as symptom}
			<h3>{symptom.symptom}</h3>
			<h3>{symptom.percentage}</h3>
		{/each}
		<hr />
		<h2>Common Tests</h2>
		<br />
		{#each entry.commonTestProcedures as test}
			<h3>{test}</h3>
		{/each}
		<hr />
		<h2>Medication</h2>
		<br />
		{#each entry.commonMedication as medication}
			<h3>{medication}</h3>
		{/each}
	{/if}
</main>
