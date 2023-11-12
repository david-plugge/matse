<script lang="ts">
	import { page } from '$app/stores';
	import { debounceSubmitNearestForm } from '$lib/utils';
	import { Search } from 'lucide-svelte';
	import { links } from './links';

	$: search = $page.url.searchParams.get('search')?.trim() ?? '';
	const debouncedSubmit = debounceSubmitNearestForm();

	function filterLinks(tokens: string[]) {
		if (tokens.length === 0) {
			return links;
		}

		return links.filter((l) => tokens.every((t) => l.searchString.includes(t)));
	}
</script>

<div class="container mx-auto px-4 py-12">
	<div class="mb-12">
		<h1 class="h1 font-medium">Matse Links</h1>

		<p class="mt-4">Sammlung vieler Links die du im Matse Studium öfter mal brauchst.</p>
	</div>

	<form data-sveltekit-keepfocus data-sveltekit-noscroll class="mb-8">
		<label class="input-group input-group-divider mx-auto grid-cols-[auto_1fr_auto] md:w-fit">
			<div class="input-group-shim"><Search /></div>
			<input
				name="search"
				type="search"
				placeholder="Search..."
				value={$page.url.searchParams.get('search') ?? ''}
				on:input={debouncedSubmit}
			/>
			<button class="variant-filled-primary">Search</button>
		</label>
	</form>

	<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
		{#each filterLinks(search.toLowerCase().split(/\s+/)) as link}
			<a href={link.url} class="card grid gap-2 p-4" target="_blank">
				<h4 class="h4 font-medium">{link.label}</h4>

				{#if link.description}
					<p>{link.description}</p>
				{/if}

				<div class="flex flex-wrap items-center gap-1 self-end">
					{#each link.tags as tag}
						<span class="variant-ghost-secondary badge">{tag}</span>
					{/each}
				</div>
			</a>
		{/each}
	</div>
	<!-- {:else}
		<div>
			{#each links as group, i}
				{#if i > 0}
					<hr class="my-16" />
				{/if}

				<div class="grid gap-4">
					<h2 class="h2 text-center">{group.label}</h2>

					{#each group.items as subgroup}
						<div class="grid gap-4">
							<h3 class="h3">{subgroup.label}</h3>

							<div class="grid grid-cols-3 gap-4">
								{#each subgroup.items as link}
									<a href={link.url} class="card p-4" target="_blank">
										<h4 class="h4 font-medium">{link.label}</h4>

										{#if link.description}
											<p>{link.description}</p>
										{/if}
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if} -->
</div>
