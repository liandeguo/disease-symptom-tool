<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Description } from '$lib/components/ui/sheet';

	let { children } = $props();
</script>

<svelte:head>
	<title>Symptom Explorer - Built by Leander Guo</title>
	<meta name="description" content="A open source database of more than 700+ conditions and 300+ symptoms." />
</svelte:head>
{@render children()}
