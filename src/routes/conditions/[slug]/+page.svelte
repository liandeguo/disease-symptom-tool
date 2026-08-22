<script>
	// Graph
	import { Plot, BarX, LinearGradientX, setPlotDefaults } from 'svelteplot';
	import { goto } from '$app/navigation';
	import Tooltip from '$lib/components/tooltip.svelte';
	// Icons
	import Search from '@lucide/svelte/icons/search';

	let { data } = $props();

	setPlotDefaults({
		height: 400,
		axis: {
			tickSize: 0,
			tickPadding: 5
		}
	});

	const condition = data.condition;
	const clinicalTrials = Array.isArray(condition.clinicalTrials) ? condition.clinicalTrials : [];
	const icd10Structure = Array.isArray(condition.icdStructure) ? condition.icdStructure : [];

	let contexts = [{ title: 'ICD-10', content: condition.icd_10 }];

	// Computed once (and reversed together) so the labels stay aligned with
	// their values and the template never mutates state while rendering.
	const symptomsName = condition.symptoms.map((item) => item.symptom).reverse();
	const symptomsPercentage = condition.symptoms.map((item) => item.percentage).reverse();
</script>

<svelte:head>
	<title>{condition.name} - Condition | Symptom Explorer</title>
	<meta name="description" content={condition.summary ?? ''} />
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
		<h1>{condition.name}</h1>
		<h3 class="">ICD-10: {condition.icd_10}</h3>
		<p style="">{condition.summary ?? 'No summary available.'}</p>
		<hr />

		<div class="w-max rounded-b-xl">
			<Tooltip
				title={'Symptoms'}
				information={'Graph shows specific symptoms per hundred patients. Data is not validated and should not be used to make diagnostic decisions.'}
			></Tooltip>
			<Plot y={symptomsName} x={{ domain: [0, 100] }}>
				<defs>
					<LinearGradientX
						id="temp-gradient"
						stops={[
							{ x: 0, color: '#0d6062' },
							{ x: 100, color: '#effefc' }
						]}
					/>
				</defs>
				<BarX onmouseenter data={symptomsPercentage} fill="url(#temp-gradient)" />
			</Plot>
		</div>

		<hr />
		<div class="treatmentDiagnosis flex gap-8">
			<!-- Procedures -->
			<div class="procedures flex-1">
				<h2 class="mb-2">Common Tests &amp; Procedures</h2>
				<div class="flex flex-col flex-wrap gap-1">
					{#each condition.commonTestProcedures ?? [] as procedure}
						<p>{procedure}</p>
					{/each}
				</div>
			</div>

			<!-- Treatments -->
			<div class="treatments flex-1">
				<h2 class="mb-2">Common Treatments</h2>
				<div class="flex flex-col flex-wrap gap-1">
					{#each condition.commonMedication ?? [] as treatment}
						<p>{treatment}</p>
					{/each}
				</div>
			</div>
		</div>

		<hr />
		<div class="clinicalTrials">
			<h2 class="mb-2">Clinical Trials</h2>
			{#if clinicalTrials.length === 0}
				<p>No active clinical trials found.</p>
			{:else}
				{#each clinicalTrials as trial (trial.protocolSection?.identificationModule?.nctId)}
					<a
						href="https://clinicaltrials.gov/study/{trial.protocolSection?.identificationModule
							?.nctId}"
						target="_blank"
					>
						<div class="clinicalTrial relative mb-3">
							<span class="">
								{trial.protocolSection?.identificationModule?.officialTitle ?? 'Untitled study'}
							</span> <br />
							{trial.protocolSection?.identificationModule?.organization?.fullName ??
								'Unknown sponsor'}
							<br />
							<div class="flex flex-wrap gap-1">
								<span class="badge"
									>{trial.protocolSection?.statusModule?.startDateStruct?.date ?? '?'} - {trial
										.protocolSection?.statusModule?.primaryCompletionDateStruct?.date ?? '?'}</span
								>
								<span class="badge"
									>{trial.protocolSection?.designModule?.enrollmentInfo?.count ?? '?'} participants</span
								>
							</div>
						</div>
					</a>
				{/each}
			{/if}
		</div>
		<p>
			For educational and research use only. Not intended for clinical use, diagnosis, treatment, or
			any real medical decision-making. Do not rely on this system for patient care.
		</p>
	</section>
	<!-- Context -->
	<div class="h-screen w-[340px] px-6 py-8"></div>
	<div class="contextMenu fixed right-0 flex h-screen w-[340px] flex-col justify-between px-6 pt-8">
		<div class="icd">
			{#each icd10Structure as icd}
				{#if icd[0] == condition.icd_10}
					<p class="text-red-300"><i>{icd[0]}</i> <br /> <br /> {icd[1]}</p>
				{:else}
					<p><i>{icd[0]}</i> <br /> {icd[1]}</p>
				{/if}
			{/each}
		</div>

		{#each contexts as context (context.title)}
			<div class="contextCard rounded-lg px-3 py-3">
				<h3>{context.title}</h3>
				<p>{context.content}</p>
			</div>
		{/each}
	</div>
</main>
