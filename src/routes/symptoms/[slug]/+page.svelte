<script>
	import Tooltip from '$lib/components/tooltip.svelte';
	import Search from '@lucide/svelte/icons/search';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const symptom = $derived(data.symptom);
	const linkedConditions = $derived(data.linkedConditions);
</script>

<svelte:head>
	<title>{symptom.symptom} - Symptom | Symptom Explorer</title>
	<meta name="description" content={symptom.summary ?? ''} />
</svelte:head>
<main class="flex">
	<div class="sideBar fixed left-0 h-screen max-w-[70px] px-3 pt-8">
		<ul>
			<button onclick={() => goto('/')} aria-label="Back to search">
				<Search color="#f2f2f2" />
			</button>
		</ul>
	</div>

	<!-- Main -->
	<section class="content mx-auto w-1/2 max-w-[948px] py-8">
		<h1>{symptom.symptom}</h1>
		<h3 class="">ICD-10: {symptom.icd_10}</h3>
		<p style="">{symptom.summary ?? 'No summary available.'}</p>
		<hr />

		<div class="w-full rounded-b-xl">
			<Tooltip
				title={'Linked Conditions'}
				information={'Shows Conditions with the specified symptom. Do not rely on this data for medical/clinical purposes'}
			></Tooltip>
			<div class="flex w-full gap-8">
				<div class="lowProb flex-1">
					<h3>Low Likelihood</h3>
					<div class="flex flex-col gap-1">
						{#each linkedConditions.low as condition (condition.name)}
							<a href="/conditions/{condition.name}">{condition.name}</a>
						{/each}
					</div>
				</div>
				<span class=" border-l border-(--color-concrete-200)"></span>
				<div class="medProb flex-1">
					<h3>Medium Likelihood</h3>
					<div class="flex flex-col gap-1">
						{#each linkedConditions.medium as condition (condition.name)}
							<a href="/conditions/{condition.name}">{condition.name}</a>
						{/each}
					</div>
				</div>
				<span class=" border-l border-(--color-concrete-200)"></span>
				<div class="highProb flex-1">
					<h3>High Likelihood</h3>
					<div class="flex flex-col gap-1">
						{#each linkedConditions.high as condition (condition.name)}
							<a href="/conditions/{condition.name}">{condition.name}</a>
						{/each}
					</div>
				</div>
			</div>
			<br />
		</div>
		<p>
			For educational and research use only. Not intended for clinical use, diagnosis, treatment, or
			any real medical decision-making. Do not rely on this system for patient care.
		</p>
	</section>
	<!-- Context -->
	<div class="h-screen w-[340px] px-6 py-8"></div>
	<div
		class="contextMenu fixed right-0 flex h-screen w-[340px] flex-col justify-between px-6 pt-8"
	></div>
</main>
