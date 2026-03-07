<script>
	import { page } from '$app/stores';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { BarChart } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { cubicInOut } from 'svelte/easing';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	import Medication from '$lib/components/data/medication.svelte';
	import Symptoms from '$lib/components/data/symptoms.svelte';
	import Tests from '$lib/components/data/tests.svelte';
	
	export let data;
	const { disease, id } = data;
	

	async function getICD(name) {
		try {
			const response = await fetch('https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=' + name + '&sf=consumer_name&ef=icd10cm_codes,icd10cm')
			if (!response.ok) {
				throw new Error
			}
			const result = await response.json()
			console.log(result)
		} catch (error) {
			
		}
	}
	getICD(disease.name)
	console.log(id)
</script>

<svelte:head>
  <title>{data.disease.name} — Symptoms & Frequency | Symptom Explorer</title>
  <meta name="description" content="Explore symptoms associated with {disease.name}. See frequency data across 300+ symptoms. Built by Leander Guo" />
  <meta property="og:title" content="{disease.name} — Symptom Explorer" />
  <meta property="og:description" content="Symptom frequency data for {disease.name}. An open-source medical education tool." />
</svelte:head>

<Resizable.PaneGroup direction="vertical" class="min-h-screen">
	<Resizable.Pane defaultSize={7.5}>
		<div class="flex flex-col items-center justify-start p-4">
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="/">Search</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>{disease.name}</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<h1 class="font-[SourceSerif] text-3xl">{disease.name}</h1>
		</div>
	</Resizable.Pane>
	<Resizable.Handle disabled />
	<Resizable.Pane defaultSize={75}>
		<Resizable.PaneGroup direction="horizontal">
			<Resizable.Pane maxSize="50">
				<div class="overflow-auto h-full scrollbar-hide">
					<div class="m-4">
						<Symptoms index={id} />
					</div>
					<div class="m-4">
						<Tests index={id} />
					</div>
				</div>
			</Resizable.Pane>
			<Resizable.Handle />
			<Resizable.Pane maxSize="50">
				<div class="m-4">
					<Medication index={id} />
				</div></Resizable.Pane
			>
			<Resizable.Handle />
			<Resizable.Pane maxSize="50">Three</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
