<script lang="ts">
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { BarChart } from 'layerchart';
	import { scaleBand, scaleLinear } from 'd3-scale';
	import { cubicInOut } from 'svelte/easing';
	import dataset from '$lib/data/dataset.json';
	export let index;
	const chartData = dataset[index].symptoms;
	const chartConfig = {
		percentage: { label: 'x', color: '#262626' },
		label: { color: 'var(--background)' }
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Symptoms</Card.Title>
		<Card.Description
			>Symptoms coming from {dataset[index].name} per one hundred patients</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<BarChart
				labels={{ offset: 12 }}
				data={chartData}
				orientation="horizontal"
				yScale={scaleBand().padding(0.25)}
				xScale={scaleLinear().domain([0, 100])}
				y="symptom"
				axis="y"
				rule={false}
				series={[
					{
						key: 'percentage',
						label: 'Percentage of patients with this symptom',
						color: chartConfig.percentage.color
					}
				]}
				padding={{ right: 16 }}
				props={{
					bars: {
						stroke: 'none',
						radius: 5,
						rounded: 'all',
						initialWidth: 0,
						initialX: 0,
						motion: {
							x: { type: 'tween', duration: 500, easing: cubicInOut },
							width: { type: 'tween', duration: 500, easing: cubicInOut }
						}
					},
					highlight: { area: { fill: 'none' } },
					yAxis: {
						tickLabelProps: { textAnchor: 'start', dx: 6, class: 'stroke-none fill-background!' },
						tickLength: 0
					}
				}}
			></BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
