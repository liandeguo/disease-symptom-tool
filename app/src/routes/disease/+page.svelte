<script>
	import { page } from '$app/stores';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { BarChart } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { cubicInOut } from 'svelte/easing';
	import * as Table from '$lib/components/ui/table/index.js';
	import dataset from '$lib/data/dataset.json';

	import Medication from '$lib/components/data/medication.svelte';
	import Symptoms from '$lib/components/data/symptoms.svelte';
	import Tests from '$lib/components/data/tests.svelte';
	let id = '';
	$: id = $page.url.searchParams.get('id');

	console.log(dataset);
</script>

<main class="h-screen w-screen bg-[#f5f5f5]">
	{dataset[id].name}
	<div class="w-1/2">
		<Symptoms index={id} />
	</div>
	<div class="w-1/2">
		<Tests index={id} />
	</div>
	<div class="w-1/2">
		<Medication index={id} />
	</div>
</main>
