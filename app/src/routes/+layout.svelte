<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<!-- Basics -->
	<title>Symptom Explorer - Built by Leander Guo</title>
 	<meta name="description" content="Search 700+ diseases and explore their associated symptoms with frequency data.">
 	<meta name="author" content="Leander Guo" />

</svelte:head>
{@render children()}
