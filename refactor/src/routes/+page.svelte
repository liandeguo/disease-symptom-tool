<script lang="ts">
	import { Command } from 'bits-ui';

	let query = $state('');
	let results = $state<{ name: string; icd_10: string }[]>([]);
	let loading = $state();

	async function search() {
		console.log('shake 1');
		if (query.trim().length < 2) {
			results = [];
			return;
		}

		loading = true;
		try {
			const req = await fetch('/api/search?q=' + encodeURIComponent(query));

			results = await req.json();
		} catch (error) {
			console.log('error loading sigma ligma');
		} finally {
			loading = false;
		}
	}
</script>

<main class="relative h-screen w-screen">
	<h1 class="mb-3">Symptom Explorer</h1>
	<div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-20%]">
		{console.log(results)}
		<div class="h-200">
			<div class="w-120">
				<Command.Root
					onStateChange={() => search()}
					shouldFilter={false}
					class="divide-border border-muted bg-background flex h-full w-full flex-col divide-y self-start overflow-hidden rounded-xl border"
				>
					<Command.Input
						class="focus-override h-input placeholder:text-foreground-alt/50 bg-background inline-flex truncate rounded-tl-xl rounded-tr-xl px-4 py-4 text-sm transition-colors focus:ring-0 focus:outline-hidden"
						placeholder="Search for a condition using it's name or ICD-10-CM"
						bind:value={query}
					/>
					{#if query.trim().length > 2}
						<Command.List class="overflow-x-hidden overflow-y-auto px-2 pb-2">
							<Command.Viewport>
								<Command.Empty
									class="text-muted-foreground flex w-full items-center justify-center pt-8 pb-6 text-sm"
								>
									No results found.
								</Command.Empty>
								<Command.Group>
									<Command.GroupItems>
										{#each results as result}
											<a href="/conditions/{result.name}">
												<Command.Item class="searchItem flex items-center py-1">
													{result.name}
													<span class="badge bg-black">{result.icd_10}</span>
												</Command.Item>
											</a>
										{/each}
									</Command.GroupItems>
								</Command.Group>
							</Command.Viewport>
						</Command.List>
					{/if}
				</Command.Root>
			</div>
		</div>
	</div>
</main>
