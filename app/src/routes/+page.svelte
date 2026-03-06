<script>
	import dataset from '$lib/data/dataset.json';
	import CalculatorIcon from '@lucide/svelte/icons/calculator';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import CreditCardIcon from '@lucide/svelte/icons/credit-card';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import SmileIcon from '@lucide/svelte/icons/smile';
	import UserIcon from '@lucide/svelte/icons/user';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
</script>

<main class="flex h-screen w-screen flex-col items-center bg-[#f5f5f5]">
	<div class="fixed inset-x-0 top-[35%] flex flex-col items-center justify-center">
		<h1 class="mb-5 font-['SourceSerif'] text-4xl">Search for a disease.</h1>
		<Command.Root class="w-[600px] rounded-lg border shadow-md md:min-w-[450px]">
			<Command.Input placeholder="" />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group heading="Suggestions">
					{#each dataset as disease, index}
						<Command.LinkItem href={'/disease?id=' + index}>
							{disease.name}
							<!-- <a href={'/disease?id=' + disease.id}> {disease.name}</a> -->
						</Command.LinkItem>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</div>
	<footer class="width-1/2 center fixed bottom-0 mb-4 flex flex-col items-center justify-center">
		<!-- <p class=" text-[#262626]">
			For educational and research purposes only. This tool does not provide medical advice and is
			not a substitute for professional clinical judgment. Symptom data sourced from [source].<br /> If
			you are experiencing symptoms, consult a licensed healthcare provider.
		</p> -->
		<h3>
			Built by Leander Guo - <a
				href="https://github.com/liandeguo/disease-symptom-tool"
				target="_blank"
				class="underline">View on GitHub</a
			>
		</h3>
	</footer>
</main>

<AlertDialog.Root open="true">
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>This tool is not intended for medical use</AlertDialog.Title>
			<AlertDialog.Description>
				For educational and research purposes only. This tool does not provide medical advice and is
				not a substitute for professional clinical judgment. If you are experiencing symptoms,
				consult a licensed healthcare provider.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>I understand</AlertDialog.Cancel>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
