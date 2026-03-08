<script>
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
    import { Button } from "$lib/components/ui/button/index.js";
	import { BarChart } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { cubicInOut } from 'svelte/easing';
    import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import dataset from '$lib/data/dataset.json';
	import * as Table from '$lib/components/ui/table/index.js';

	export let extract;
</script>
{#if extract.title}
    <Card.Root class="gap-2">
        <Card.Header>
            <Card.Title>Clinical Overview</Card.Title>
            <Card.Description>{extract.description}</Card.Description>
                <Card.Action>
                    <div class="flex items-center">
                        <a href="{extract.content_urls.desktop.page}" target="_blank"><Button variant="link" class="m-0 p-0 pr-2">Wikipedia</Button></a>
                        <ArrowUpRight />
                    </div>
                </Card.Action>
        </Card.Header>
        <Card.Content>
            <Table.Root>
                <Table.Body>
                    {extract.extract}
                </Table.Body>
            </Table.Root>
        </Card.Content>
    </Card.Root>
{:else}
        <Card.Root class="gap-2">
            <Card.Header>
                <Card.Title>Clinical Overview</Card.Title>
                <Card.Description></Card.Description>
                    <Card.Action>
                    </Card.Action>
            </Card.Header>
            <Card.Content>
                <Table.Root>
                    <Table.Body>
                        Unfortunately there's currently no overview available.
                    </Table.Body>
                </Table.Root>
            </Card.Content>
        </Card.Root>
{/if}


