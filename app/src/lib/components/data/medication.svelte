<script lang="ts">
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { BarChart } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { cubicInOut } from 'svelte/easing';
	import dataset from '$lib/data/dataset.json';
	import * as Table from '$lib/components/ui/table/index.js';

	export let index;
	const medication = dataset[index].commonMedication;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Common Medication</Card.Title>
		<Card.Description
			>This list contains drugs that are usually admministered for {dataset[index]
				.name}</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Body>
				{#each medication as drug}
					<Table.Row>
						<a
							target="_blank"
							href={'https://go.drugbank.com/unearth/q?searcher=drugs&query=' + drug}
							><Table.Cell>{drug}</Table.Cell></a
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
