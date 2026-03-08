<script>
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { BarChart } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { cubicInOut } from 'svelte/easing';
	import dataset from '$lib/data/dataset.json';
	import * as Table from '$lib/components/ui/table/index.js';
	export let index;
	const tests = dataset[index].commonTestProcedures;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Diagnostic Procedures</Card.Title>
		<Card.Description>Common procedures used to confirm a {dataset[index].name} diagnosis</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Body>
				{#each tests as test}
					<Table.Row>
						<Table.Cell>{test}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
