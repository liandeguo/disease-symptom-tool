<script>
	import { resolve } from '$app/paths';
	import Tooltip from '$lib/components/tooltip.svelte';
	import { resolveCondition, resolveConditionName } from '$lib/data/index.js';
	import Search from '@lucide/svelte/icons/search';
	let { data } = $props();
	import { goto } from '$app/navigation';

	const symptom = data.symptom;

	function condition(condition) {
		const cond = resolveConditionName(condition, symptom.symptom);
		return {
			conditionName: cond.name,
			symptomLikelihood: cond.symptom
		};
	}
</script>
<svelte:head>
	<title>{symptom.symptom} - Symptom | Symptom Explorer</title>
	<meta name="description" content="{symptom.summary}">
</svelte:head>
<main class="flex">
	<div class="sideBar fixed left-0 h-screen max-w-[70px] px-3 pt-8">
		<ul>
			<button onclick={() => goto('/')}>
				<Search color="#f2f2f2" />
			</button>
		</ul>
	</div>

	<!-- Main -->
	<section class="content mx-auto w-1/2 max-w-[948px] py-8">
		<h1>{symptom.symptom}</h1>
		<h3 class="">ICD-10: {symptom.icd_10}</h3>
		<p style="">{symptom.summary}</p>
		<hr />

		<div class="w-full rounded-b-xl">
			<Tooltip
				title={'Linked Conditions'}
				information={'Shows Conditions with the specified symptom. Do not rely on this data for medical/clinical purposes'}
			></Tooltip>
			<div class="flex w-full gap-8">
				<div class="lowProb flex-1">
					<h3>Low Volume</h3>
					{#each symptom.id as conditionX}
						<div class="flex flex-col gap-1">
							{#if condition(conditionX).symptomLikelihood <= 5}
								<a href="/conditions/{condition(conditionX).conditionName}"
									>{condition(conditionX).conditionName}</a
								>
							{/if}
						</div>
					{/each}
				</div>
				<span class=" border-l border-(--color-concrete-200)"></span>
				<div class="medProb flex-1">
					<h3>Medium Volume</h3>
					<div class="flex flex-col gap-1">
						{#each symptom.id as conditionX}
							{#if condition(conditionX).symptomLikelihood >= 5 && condition(conditionX).symptomLikelihood <= 21}
								<a href="/conditions/{condition(conditionX).conditionName}"
									>{condition(conditionX).conditionName}</a
								>
							{/if}
						{/each}
					</div>
				</div>
				<span class=" border-l border-(--color-concrete-200)"></span>
				<div class="highProb flex-1">
					<h3>High Volume</h3>
					<div class="flex flex-col gap-1">
						{#each symptom.id as conditionX}
							{#if condition(conditionX).symptomLikelihood >= 21 && condition(conditionX).symptomLikelihood <= 100}
								<a href="/conditions/{condition(conditionX).conditionName}"
									>{condition(conditionX).conditionName}</a
								>
							{/if}
						{/each}
					</div>
				</div>
			</div>
			<br />
		</div>

		<!-- <hr />
		<div class="treatmentDiagnosis flex gap-8">
			Procedures
			<div class="procedures flex-1">
				<h2 class="mb-2">Common Tests & Procedures</h2>
				<div class="flex flex-col flex-wrap gap-1"></div>
			</div>

			Treatments
			<div class="treatments flex-1">
				<h2 class="mb-2">Common Teatments</h2>
				<div class="flex flex-col flex-wrap gap-1"></div>
			</div>
		</div>

		<hr />
		<div class="clinicalTrials">
			<h2 class="mb-2">Clinical Trials</h2>
		</div> -->
		<p>For educational and research use only. Not intended for clinical use, diagnosis, treatment, or any real medical decision-making. Do not rely on this system for patient care.</p>
	</section>
	<!-- Context -->
	<div class="h-screen w-[340px] px-6 py-8"></div>
	<div
		class="contextMenu fixed right-0 flex h-screen w-[340px] flex-col justify-between px-6 pt-8"
	></div>
</main>

<style>
</style>
