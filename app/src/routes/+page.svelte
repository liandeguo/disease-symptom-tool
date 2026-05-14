<script>
	import dataset from '$lib/data/dataset.json';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import Footer from '$lib/components/footer.svelte'
	import FooterMobile from '$lib/components/footer_mobile.svelte'
	import { toSlug } from '$lib/data/slug.js';
	import { GrainGradient } from '@devmischief/shaders-svelte';

	let query = '';
	// Filter only for the disease searched, slice 10 for faster rendering
	$: filtered = dataset.filter(d => d.name.toLowerCase().includes(query.toLowerCase()))
</script>
<svelte:head>
	<title>Symptom Explorer - Built by Leander Guo</title>
 	<meta name="description" content="Search 700+ diseases and explore their associated symptoms with frequency data.">
 	<meta name="author" content="Leander Guo" />
</svelte:head>
<GrainGradient
  width={'100vw'}
  height={'100vh'}
  colors={['#3a86ff', '#06d6a0']}
  colorBack="#ffffff"
  shape="wave"
  softness={1}
  intensity={0.26}
  noise={0}
  scale={1.5}
  rotation={0}
  offsetX={0.09}
  offsetY={0.36}
  speed={1}
  fit="contain"
  style="position: fixed; top: 0; left: 0; z-index: -1;"
/>

<div class="w-screen h-screen flex flex-col items-center justify-center">
	<div>
		<h2 class="font-bold text-5xl">Medical Information <br> at Your Fingertips</h2>
			<Command.Root class="sm:w-150 rounded-lg shadow-md backdrop-filter backdrop-blur-3xl bg-opacity-100 h-20">
				<Command.Input placeholder="" bind:value={query}/>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group>
						<div class="flex overflow-x-scroll">
							{#each dataset as disease}
								<Command.LinkItem class="text-nowrap" href={'/diseases/' + toSlug(disease.name)}>
									{disease.name}
								</Command.LinkItem>
							{/each}
						</div>
					</Command.Group>
			</Command.Root>
	</div>
</div>


<!-- <main class="flex h-screen w-screen flex-col items-center justify-between bg-[#f5f5f5]">
	<div></div>
	<div class="flex flex-col items-center justify-center px-8">
		<h1 class="mb-5 font-['SourceSerif'] text-4xl">Search for a disease.</h1>
		<Command.Root class="sm:w-150 rounded-lg border shadow-md ">
			<Command.Input placeholder="" bind:value={query}/>
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group heading="Suggestions">
					{#each dataset as disease}
						<Command.LinkItem href={'/diseases/' + toSlug(disease.name)}>
							{disease.name}
						</Command.LinkItem>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</div>
	<FooterMobile/>
	<Footer></Footer>
</main>
 -->
