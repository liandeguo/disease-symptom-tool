<script>
	import TrendingUpIcon from '@lucide/svelte/icons/trending-up';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
    import { Button } from "$lib/components/ui/button/index.js";
	import { BarChart, Html } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { cubicInOut } from 'svelte/easing';
    import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import dataset from '$lib/data/dataset.json';
	import * as Table from '$lib/components/ui/table/index.js';
    import { Badge } from "$lib/components/ui/badge/index.js";
	export let rep;

    function statusBadge(status) {
        if (status == "ACTIVE_NOT_RECRUITING") {
            return '<Badge variant="outline">Active</Badge>'
        }
    }
</script>
{#if rep}
    <Card.Root class="gap-2">
        <Card.Header>
            <Card.Title>Clinical Trials</Card.Title>
            <Card.Description>Active and recent clinical trials</Card.Description>
                <!-- <Card.Action>
                    <div class="flex items-center">
                        <a href="" target="_blank"><Button variant="link" class="m-0 p-0 pr-2">Wikipedia</Button></a>
                        <ArrowUpRight />
                    </div>
                </Card.Action> -->
        </Card.Header>
        <Card.Content>
            <Table.Root>
                <Table.Body>
                    {#each rep.studies as trial}
                        <div class="mb-2">
                            <a href="https://clinicaltrials.gov/study/{trial.protocolSection.identificationModule.nctId}" target="_blank" class="">                            
                                <div class="">
                                        <Badge class="bg-[#22c55e]">Active</Badge>
                                        <div class="flex justify-between">
                                            <span>
                                                <h2 class="font-bold">{trial.protocolSection.identificationModule.organization.fullName}</h2>
                                                <h3>{trial.protocolSection.identificationModule.briefTitle}</h3> 
                                            </span>
                                            <p>{trial.protocolSection.statusModule.studyFirstSubmitDate} <br>{trial.protocolSection.statusModule.primaryCompletionDateStruct.date}</p>
                                        </div>
                                    </div>
                                </a>
                        </div>
                    {/each}
                </Table.Body>
            </Table.Root>
        </Card.Content>
    </Card.Root>
{:else}
        <Card.Root class="gap-2">
            <Card.Header>
                <Card.Title>Clinical Trials</Card.Title>
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


