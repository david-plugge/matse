<script lang="ts">
	import { ArrowUp } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let scrollY = 0;
</script>

<svelte:window bind:scrollY />

{#if scrollY > 50}
	<button
		on:click={() => {
			window.scrollTo({ top: 0 });
		}}
		transition:fly={{ y: 50, duration: 150 }}
		class="variant-glass-surface btn fixed bottom-16 right-6 z-20 rounded-full p-3 shadow-xl md:bottom-6 md:left-6 md:right-auto"
	>
		<ArrowUp></ArrowUp>
	</button>
{/if}
