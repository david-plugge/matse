<script lang="ts">
	import '../app.css';

	import { LightSwitch } from '@skeletonlabs/skeleton';

	import ScrollTop from './ScrollTop.svelte';
	import Seo from './Seo.svelte';

	import { Home, Link, Calendar } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<Seo></Seo>

<ScrollTop></ScrollTop>

<div class="flex min-h-screen flex-col">
	<div class="hidden md:block">
		<nav class="container mx-auto flex items-center justify-between gap-4 px-4 py-2">
			<a href="/" class="rounded-lg px-3 py-2 hover:bg-surface-500/25">
				<span class="block -rotate-3 text-2xl font-bold uppercase tracking-[-0.1em]">Matse</span>
			</a>

			<nav class="flex gap-2">
				<a
					href="/"
					class="rounded-lg px-4 py-2 font-medium"
					class:bg-surface-200-700-token={$page.url.pathname === '/'}>Home</a
				>
				<a
					href="/links"
					class="rounded-lg px-4 py-2 font-medium"
					class:bg-surface-200-700-token={$page.url.pathname.startsWith('/links')}>Links</a
				>
				<a
					href="/stundenplan"
					class="rounded-lg px-4 py-2 font-medium"
					class:bg-surface-200-700-token={$page.url.pathname.startsWith('/stundenplan')}
					>Stundenplan</a
				>
			</nav>

			<LightSwitch />
		</nav>
	</div>

	<div
		class="bg-surface-200-700-token fixed bottom-0 z-20 grid h-14 w-full place-items-center rounded-t-lg shadow-md md:hidden"
	>
		<div class="absolute left-2">
			<LightSwitch></LightSwitch>
		</div>
		<nav class="flex items-center gap-1">
			<a
				href="/"
				class="rounded-lg px-4 py-3 font-medium"
				title="Home"
				class:bg-surface-300-600-token={$page.url.pathname === '/'}
			>
				<Home></Home>
			</a>
			<a
				href="/links"
				class="rounded-lg px-4 py-3 font-medium"
				class:bg-surface-300-600-token={$page.url.pathname.startsWith('/links')}
				title="Links"
			>
				<Link />
			</a>
			<a
				href="/stundenplan"
				class="rounded-lg px-4 py-3 font-medium"
				class:bg-surface-300-600-token={$page.url.pathname.startsWith('/stundenplan')}
				title="Stundenplan"
			>
				<Calendar />
			</a>
		</nav>
	</div>

	<div class="flex-1 pb-20">
		<slot />
	</div>
</div>
