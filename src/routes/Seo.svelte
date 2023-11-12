<script lang="ts">
	import { page } from '$app/stores';

	$: meta = $page.data.meta;
</script>

<svelte:head>
	<title>{meta.title}</title>

	{#if meta.description}
		<meta name="description" content={meta.description} />
	{/if}
</svelte:head>
