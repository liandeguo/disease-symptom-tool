<script>
	import { page } from '$app/stores';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import Link from '@lucide/svelte/icons/link';
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import * as Card from '$lib/components/ui/card/index.js';
	import { BarChart } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { cubicInOut } from 'svelte/easing';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import Footer from '$lib/components/footer.svelte'
	import FooterMobile from '$lib/components/footer_mobile.svelte'
	import Medication from '$lib/components/data/medication.svelte';
	import Symptoms from '$lib/components/data/symptoms.svelte';
	import Tests from '$lib/components/data/tests.svelte';
	import InfoBox from '$lib/components/data/infobox.svelte';
	import ClinicalTrials from '$lib/components/data/clinicalTrials.svelte';
	import { wikipedia, clinicalTrials } from '$lib/data/api.js'
	import { Button } from "$lib/components/ui/button/index.js";
	import { toSlug } from '$lib/data/slug.js';
	import { onMount } from 'svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import ClincialTrials from '$lib/components/data/clinicalTrials.svelte';
	
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
	// getICD(disease.name)

	let info = '';
	wikipedia(toSlug(disease.name)).then(data => {
		info = data
	})
	
	let clinicalTrialsInfo;
	clinicalTrials(disease.name).then(data => {
		clinicalTrialsInfo = data
	})

	
	let orientation = 'horizontal';
	const smBreakpoint = 640;

	function updateOrientation() {
		orientation = window.innerWidth > smBreakpoint ? 'horizontal' : 'vertical';
	}

	onMount(() => {
		updateOrientation(); // set initial value
		window.addEventListener('resize', updateOrientation);

		return () => {
		window.removeEventListener('resize', updateOrientation);
		};
	});
	function copyUrl() {
		navigator.clipboard.writeText(window.location.href);
	}
</script>

<svelte:head>
  <title>{disease.name} — Symptoms & Frequency | Symptom Explorer</title>
  <meta name="description" content="Explore symptoms associated with {disease.name}. See frequency data across 300+ symptoms. Built by Leander Guo" />
  <meta property="og:title" content="{disease.name} — Symptom Explorer" />
  <meta property="og:description" content="Symptom frequency data for {disease.name}. An open-source medical education tool." />
</svelte:head>

{#if orientation == 'horizontal'}
	<Resizable.PaneGroup direction="vertical" class="min-h-screen">
		<Resizable.Pane defaultSize={7.5}>
			<div class="flex items-center justify-between p-4">
				<Breadcrumb.Root class="flex-1">
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
				<h1 class="font-[SourceSerif] text-center text-3xl flex-1">{disease.name}</h1>
				<div class="flex-1 flex justify-end">
					<button on:click={copyUrl}>
						<Button variant="outline" size="sm">
							<Link/> Copy Link
						</Button>
					</button>
				</div>
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
				<Resizable.Pane maxSize="50">
					<div class="overflow-auto h-full scrollbar-hide">
						<div class="m-4">				
							<InfoBox extract={info}/>
						</div>
						<div class="m-4">				
							<ClinicalTrials rep={clinicalTrialsInfo}/>
						</div>
					</div>
				</Resizable.Pane>
			</Resizable.PaneGroup>
		</Resizable.Pane>
		<Footer/>
	</Resizable.PaneGroup>
{:else}
	<div class="p-4 flex justify-between items-center">
		<div>
			<Breadcrumb.Root class="flex-1">
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
		<button on:click={copyUrl}>
			<Button variant="outline" size="sm">
				<Link/> Copy Link
			</Button>
		</button>
	</div>
	<Separator></Separator>
	<div class="m-4">				
		<InfoBox extract={info}/>
	</div>
	<div class="m-4">
		<Symptoms index={id} />
	</div>
	<div class="m-4">
		<Tests index={id} />
	</div>
	<div class="m-4">
		<Medication index={id} />
	</div>
	<div class="m-4">
		<ClinicalTrials rep={clinicalTrialsInfo}/>
	</div>
{/if}


<FooterMobile></FooterMobile>
