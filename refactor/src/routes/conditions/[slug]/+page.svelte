<script>
    import { Plot, BarX, LinearGradientY, LinearGradientX, RuleX, setPlotDefaults } from 'svelteplot';
	import { arrowPath } from 'svelteplot/helpers/arrowPath.js';
    let { data } = $props();
    console.log(data)
    setPlotDefaults({
        height: 400,
        axis: {
            tickSize: 0,
            tickPadding: 5
        }
    });
    
    let contexts = [
        {title: 'ICD-10', content: 'F32.3'},
        {title: 'Prevelance', content: '130 in 130,000'},
        {title: 'Active Clinical Trials', content: 'goon moon skibidi '}
    ]

    let badges = [
        {type: 0, content: ('ICD-10 ' + data.condition.icd_10)}
    ]

    const procedures = data.condition.commonTestProcedures
    const treatments = data.condition.commonMedication

    const symptomsName = data.condition.symptoms.map(item => item.symptom)
    const symptomsPercentage = data.condition.symptoms.map(item => item.percentage)

</script>
<main class="flex">
    <!-- Main -->
    <section class="content w-1/2 mx-auto pt-6">
        <div class="badges">
            {#each badges as badge}
                <span class="badge">
                    {badge.content}
                </span>
            {/each}
        </div>
        <h1>{data.condition.name}</h1>
        <h3 class="font-serif italic font-medium">Synonyms: Heart Infarct, MI</h3>
        <p style="">{data.condition.summary}</p>
        <hr class="my-6">
        <div class="w-min rounded-b-xl">
            <h2>Symptoms</h2>
            <label for="symptomGraph">[01] Percentage of specific symptoms perceived by patients with the condition</label>
            <Plot y={symptomsName} x={{ domain: [0, 100]}} >
                <defs>
                    <LinearGradientX
                        id="temp-gradient"
                        stops={[
                            { x: 0, color: '#9F9F9F' },
                            { x: 100, color: '#000000' }
                        ]} />
                    </defs>
                <BarX data={symptomsPercentage} fill="url(#temp-gradient)"/>
            </Plot>
            
        </div>
        <hr class="my-6">
    <div class="treatmentDiagnosis flex gap-8">
        <!-- Procedures -->
        <div class="procedures flex-1">
            <h3 class="uppercase font-medium mb-2">Common tests & procedures</h3>
            <div class="flex flex-wrap gap-1">
                {#each procedures as procedure}
                    <span class="badge">
                        {procedure}
                    </span>
                {/each}
            </div>
        </div>

        <!-- Treatments -->
        <div class="treatments flex-1">
            <h3 class="uppercase font-medium mb-2">Common treatments</h3>
            <div class="flex flex-wrap gap-1">
                {#each treatments as treatment}
                    <span class="badge">
                        {treatment}
                    </span>
                {/each}
            </div>
        </div>
    </div>

    </section>  
    <!-- Context -->
    <!-- <div class="contextMenu bg-white w-[340px] px-4 pt-8">
        {#each contexts as context}
            <div class="bg-gray-100 rounded-lg px-3 py-3">
                <h3>{context.title}</h3>
                <p>{context.content}</p>
            </div>
        {/each}
    </div> -->
</main>




