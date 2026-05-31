<script lang="ts">
	import { Command } from 'bits-ui';
	import { MeshGradient } from '@devmischief/shaders-svelte';
	import GitHub from '$lib/assets/github.svg'
	let query = $state('');
	let results = $state<{ name: string; icd_10: string; symptom: string }[]>([]);
	let loading = $state();

	async function search() {
		if (query.trim().length < 2) {
			results = [];
			return;
		}

		loading = true;
		try {
			const req = await fetch('/api/search?q=' + encodeURIComponent(query));

			results = await req.json();	
		} catch (error) {
			console.log('Error while searching')
		} finally {
			loading = false;
		}
	}
</script>



<nav class="fixed z-50 w-screen px-6 py-8 flex justify-between">
	<h3><b>Symptom Explorer</b> | Asclevor</h3>
	<span class="flex items-center gap-3">
		<a href="https://liande.me" target="_blank" class="underline">Leander Guo</a>
		<a href="https://github.com/liandeguo/disease-symptom-tool" target="_blank"><img src="{GitHub}" width="24px" alt=""></a>
	</span>
	
</nav>
<main
	class="relative flex h-screen w-screen flex-col items-center justify-between bg-(--color-concrete-100)"
>
	<span></span>
	<div>
		<h1 class="mb-3" style="line-height: 120%; font-weight: 500; text-align: center;">
			Explore conditions, symptoms,<br /> and their connections.
		</h1>
		<div class="px w-180 rounded-2xl bg-white px-1 py-1">
			<Command.Root
				onStateChange={() => search()}
				shouldFilter={false}
				class="divide-border border-muted bg-background flex h-full w-full flex-col divide-y self-start overflow-hidden rounded-xl  bg-white shadow-[0px_0px_100px_3px_rgba(0,_0,_0,_0.1)]"
			>
				<Command.Input
					class="focus-override h-input placeholder:text-foreground-alt/50 bg-background inline-flex truncate rounded-tl-xl rounded-tr-xl px-4 py-4 text-sm shadow-[0px_0px_100px_3px_rgba(0,_0,_0,_0.1)] transition-colors focus:ring-0 focus:outline-hidden"
					placeholder="Search for a condition using it's name or ICD-10-CM"
					bind:value={query}
				/>
				{#if query.trim().length > 2}
					<div class="absolute w-178 translate-y-16 rounded-2xl bg-white px-1 py-1">
						<Command.List
							class=" overflow-x-hidden rounded-xl bg-white px-4 py-4 shadow-[0px_0px_100px_3px_rgba(0,_0,_0,_0.1)]"
						>
							<Command.Viewport>
								<Command.Empty
									class="text-muted-foreground flex w-full items-center justify-center pt-8 pb-6 text-sm"
								>
									No results found.
								</Command.Empty>
								<Command.Group>
									<Command.GroupItems class="overflow-y-scroll h-[30vh]">
										{#each results as result}
											{#if result.name}
												<a href="/conditions/{result.name}">
													<Command.Item class="searchItem flex items-center py-1">
														<span class="badge mr-4 bg-black px-2 py-1">{result.icd_10}</span>
														{result.name}
													</Command.Item>
												</a>
											{:else if result.symptom}
												<a href="/symptoms/{result.symptom}">
													<Command.Item class="searchItem flex items-center py-1">
														<span class="badge mr-4 px-2 py-1" style="background-color: grey;">{result.icd_10}</span>
														{result.symptom}
													</Command.Item>
												</a>
											{/if}
											
										{/each}
									</Command.GroupItems>
								</Command.Group>
							</Command.Viewport>
						</Command.List>
					</div>
				{/if}
			</Command.Root>
		</div>
	</div>
	<div class="flex flex-col items-center justify-center">
		<div class="flex gap-8 py-8 text-center">
			<span
			><h2>700+</h2>
			<p>Diseases Indexeed</p></span
		>
		<span class="h-full border"></span>
		<span
			><h2>300+</h2>
			<p>Symptoms Indexed</p></span
		>
		<span class="h-full border"></span>
		<span
			><h2>100%</h2>
			<p>Free</p></span
		>
		</div>
		<p>For educational and research use only. Not intended for clinical use, diagnosis, treatment, or any real medical decision-making. Do not rely on this system for patient care.</p>
	</div>
</main>

<div class="bg-(--background)">
	<div></div>
</div>
