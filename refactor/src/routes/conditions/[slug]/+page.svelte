<script>
	// Graph
	import {
		Plot,
		BarX,
		LinearGradientY,
		LinearGradientX,
		RuleX,
		setPlotDefaults,
		HTMLTooltip
	} from 'svelteplot';
	import { arrowPath } from 'svelteplot/helpers/arrowPath.js';
	import Tooltip from '$lib/components/tooltip.svelte';
	import { onMount } from 'svelte';
	// Icons
	import Search from '@lucide/svelte/icons/search';
	import X from '@lucide/svelte/icons/x';

	let { data } = $props();
	console.log(data);
	setPlotDefaults({
		height: 400,
		axis: {
			tickSize: 0,
			tickPadding: 5
		}
	});

	onMount(async () => {
		const mod = await import('svelteplot');
		setPlotDefaults({
			height: 400,
			axis: {
				tickSize: 0,
				tickPadding: 5
			}
		});
	});

	let contexts = [{ title: 'ICD-10', content: data.condition.icd_10 }];

	let badges = [{ type: 0, content: 'ICD-10 ' + data.condition.icd_10 }];

	const procedures = data.condition.commonTestProcedures;
	const treatments = data.condition.commonMedication;

	const symptomsName = data.condition.symptoms.map((item) => item.symptom);
	const symptomsPercentage = data.condition.symptoms.map((item) => item.percentage);

	const clinicalTrials = data.condition.clinicalTrials;

	const icd10Structure = data.condition.icdStructure;
</script>

<main class="flex">
	<div class="sideBar fixed left-0 h-screen max-w-[70px] px-3 pt-8">
		<ul>
			<button onclick={() => window.location.href('/')}>
				<Search color="#f2f2f2" />
			</button>
		</ul>
	</div>

	<!-- Main -->
	<section class="content mx-auto w-1/2 max-w-[948px] py-8">
		<h1>{data.condition.name}</h1>
		<h3 class="">ICD-10: {data.condition.icd_10}</h3>
		<p style="">{data.condition.summary}</p>
		<hr />

		<div class="w-max rounded-b-xl">
			<Tooltip
				title={'Symptoms'}
				information={'Graph shows specific symptoms per hundred patients. Data is not validated and should not be used to make diagnostic decisions.'}
			></Tooltip>
			<Plot y={symptomsName.reverse()} x={{ domain: [0, 100] }}>
				<defs>
					<LinearGradientX
						id="temp-gradient"
						stops={[
							{ x: 0, color: '#0d6062' },
							{ x: 100, color: '#effefc' }
						]}
					/>
				</defs>
				<BarX
					onclick={(e, d) => console.log(e.dataY)}
					onmouseenter
					data={symptomsPercentage.reverse()}
					fill="url(#temp-gradient)"
				/>
			</Plot>
		</div>

		<hr />
		<div class="treatmentDiagnosis flex gap-8">
			<!-- Procedures -->
			<div class="procedures flex-1">
				<h2 class="mb-2">Common Tests & Procedures</h2>
				<div class="flex flex-col flex-wrap gap-1">
					{#each procedures as procedure}
						<p>{procedure}</p>
					{/each}
				</div>
			</div>

			<!-- Treatments -->
			<div class="treatments flex-1">
				<h2 class="mb-2">Common Teatments</h2>
				<div class="flex flex-col flex-wrap gap-1">
					{#each treatments as treatment}
						<p>{treatment}</p>
					{/each}
				</div>
			</div>
		</div>

		<hr />
		<div class="clinicalTrials">
			<h2 class="mb-2">Clinical Trials</h2>
			{#each clinicalTrials as trial}
				<a
					href="https://clinicaltrials.gov/study/{trial.protocolSection.identificationModule.nctId}"
					target="_blank"
				>
					<div class="clinicalTrial relative mb-3">
						<span class="">
							{trial.protocolSection.identificationModule.officialTitle}
						</span> <br />
						{trial.protocolSection.identificationModule.organization.fullName}
						<br />
						<div class="flex flex-wrap gap-1">
							<span class="badge"
								>{trial.protocolSection.statusModule.startDateStruct.date} - {trial.protocolSection
									.statusModule.primaryCompletionDateStruct.date}</span
							>
							<span class="badge"
								>{trial.protocolSection.designModule.enrollmentInfo.count} participants</span
							>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>
	<!-- Context -->
	<div class="h-screen w-[340px] px-6 py-8"></div>
	<div class="contextMenu fixed right-0 flex h-screen w-[340px] flex-col justify-between px-6 pt-8">
		<div class="icd">
			{#each icd10Structure as icd}
				{#if icd[0] == data.condition.icd_10}
					<p class="text-red-300"><i>{icd[0]}</i> <br /> <br /> {icd[1]}</p>
				{:else}
					<p><i>{icd[0]}</i> <br /> {icd[1]}</p>
				{/if}
			{/each}
		</div>

		{#each contexts as context}
			<div class="contextCard rounded-lg px-3 py-3">
				<h3>{context.title}</h3>
				<p>{context.content}</p>
			</div>
		{/each}
	</div>
</main>
