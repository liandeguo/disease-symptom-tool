<script>
    import { Plot, BarX, LinearGradientY, LinearGradientX, RuleX, setPlotDefaults } from 'svelteplot';

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
</script>

<main class="flex">
    <!-- Main -->
    <section class="content w-1/2 mx-auto pt-6">
        <h1>Myocardical Infarct</h1>
        <h3 class="font-serif italic font-medium">Synonyms: Heart Infarct, MI</h3>
        <p style="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula maximus lacus in vestibulum. Etiam commodo metus vel tristique sagittis. Nunc vitae velit sed risus tempor malesuada. Nullam urna nulla, vehicula quis odio vel, fringilla blandit tortor. Vestibulum commodo ligula quis auctor ullamcorper. Mauris nec lectus egestas, venenatis lectus quis, sodales ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus tortor iaculis suscipit luctus. Praesent ultricies metus lobortis neque congue, a ultricies odio consequat. Donec nec dignissim turpis, ac semper dolor. Sed est erat, dapibus eu arcu eu, porttitor luctus lectus. In maximus, enim id fringilla fringilla, leo purus cursus massa, id pretium ex lectus vel turpis. Duis pulvinar hendrerit tempor. </p>
        <hr class="my-6">
        <div class="w-min rounded-b-xl">
            <h2>Symptoms</h2>
            <label for="symptomGraph">[01] Percentage of specific symptoms perceived by patients with the condition</label>
            <Plot y={['Sharp chest pain', 'Shortness of beath', 'chest tightness', 'nausea', 'arm pain', 'fainting', 'sweating', 'heartburn', 'irregular heartbeat', 'increased heart rate'
            ]} x={{ domain: [0, 100]}} >
                <defs>
                    <LinearGradientX
                        id="temp-gradient"
                        stops={[
                            { x: 0, color: '#9F9F9F' },
                            { x: 100, color: '#000000' }
                        ]} />
                    </defs>
                <BarX data={[90, 80, 70, 60, 100, 40, 30, 20, 10, 5]} fill="url(#temp-gradient)"/>
            </Plot>
            
        </div>

        <div class="diagnosis">

        </div>

    </section>  
    <!-- Context -->
    <div class="contextMenu bg-white w-[340px] px-4 pt-8">
        {#each contexts as context}
            <div class="bg-gray-100 rounded-lg px-3 py-3">
                <h3>{context.title}</h3>
                <p>{context.content}</p>
            </div>
        {/each}
    </div>
</main>




