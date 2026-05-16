<script>
    import { Plot, BarX, LinearGradientY, LinearGradientX, RuleX, setPlotDefaults } from 'svelteplot';

    setPlotDefaults({
        height: 400,
        axis: {
            tickSize: 0,
            tickPadding: 5
        }
    });
</script>

<main class="flex">
    <nav class="h-screen w-fit bg-[#fafafa] px-3">
        <span class="flex justify-between mt-4">SYMPTOM EXPLORER <p class="pl-4">v0.2</p></span>

        <div class="listElement">
            <img src="" alt="">
            <p>goon moon</p>
        </div>
        <div class="listElement">
            <img src="" alt="">
            <p>goon moon</p>
        </div>
        <div class="listElement">
            <img src="" alt="">
            <p>goon moon</p>
        </div>
        <div class="listElement">
            <img src="" alt="">
            <p>goon moon</p>
        </div>
    </nav>
    <section class="w-1/2 mx-auto">
        <h1>Myocardical Infarct (MI)</h1>
        <p style="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula maximus lacus in vestibulum. Etiam commodo metus vel tristique sagittis. Nunc vitae velit sed risus tempor malesuada. Nullam urna nulla, vehicula quis odio vel, fringilla blandit tortor. Vestibulum commodo ligula quis auctor ullamcorper. Mauris nec lectus egestas, venenatis lectus quis, sodales ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus tortor iaculis suscipit luctus. Praesent ultricies metus lobortis neque congue, a ultricies odio consequat. Donec nec dignissim turpis, ac semper dolor. Sed est erat, dapibus eu arcu eu, porttitor luctus lectus. In maximus, enim id fringilla fringilla, leo purus cursus massa, id pretium ex lectus vel turpis. Duis pulvinar hendrerit tempor. </p>

        <div class="bg-white w-min p-4 rounded-b-xl">
    <!-- Info -->
        <div>
            <h3 class="font-[Inter] font-semibold">Symptoms</h3>
            <span>
                <p>x</p>
                <p>y</p>
            </span>
        </div>
                <!-- Plot -->
            <Plot y={['Sharp chest pain', 'Shortness of beath', 'chest tightness', 'nausea', 'arm pain', 'fainting', 'sweating', 'heartburn', 'irregular heartbeat', 'increased heart rate'
            ]} x={{ domain: [0, 100]}} >
                <defs>
                    <LinearGradientX
                        id="temp-gradient"
                        stops={[
                            { x: 0, color: '#009951' },
                            { x: 50, color: '#E8B931' },
                            { x: 100, color: '#EC221F' }
                        ]} />
                    </defs>
            <BarX data={[90, 80, 70, 60, 100, 40, 30, 20, 10, 5]} fill="url(#temp-gradient)"/>
        </Plot>
        </div>
    </section>  
</main>




