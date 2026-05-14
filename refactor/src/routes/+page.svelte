<script>
    import { Plot, BarX, LinearGradientY } from 'svelteplot';
</script>
<div class="bg-gray-100 w-full">
    <div>
        <h3>Symptoms</h3>
        <span>

        </span>
    </div>

<Plot grid y={['Sharp chest pain', 'Shortness of beath', 'chest tightness', 'nausea', 'arm pain', 'fainting', 'sweating', 'heartburn', 'irregular heartbeat', 'increased heart rate'
]}>
    <defs>
        <LinearGradientY
            id="temp-gradient"
            stops={[
                { y: 0, color: '#009951' },
                { y: 50, color: '#E8B931' },
                { y: 100, color: '#EC221F' }
            ]} />
    </defs>
    <BarX data={[1, 2, 3, 4]} fill="url(#temp-gradient)"/>
</Plot>
</div>