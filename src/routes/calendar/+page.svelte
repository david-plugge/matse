<script lang="ts">
	import { writable } from 'svelte/store';
	import { Share2, Copy, Check, X } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { submitNearestForm } from '$lib/utils';
	import { createCopyButton } from '$lib/copy';
	import { getCurrentSemester } from '../api/calendar/semester';
	import CourseList from './CourseList.svelte';

	export let data;

	$: selectedCourses = writable(new Set(data.selectedCourses));
	const currentSemester = getCurrentSemester();

	const copyShareUrl = createCopyButton(getShareUrl);
	const copyCalenderUrl = createCopyButton(getCalendarUrl);

	function getShareUrl() {
		const url = new URL('/calendar', $page.url.origin);
		url.searchParams.set('semester', data.semester);

		for (const course of $selectedCourses) {
			url.searchParams.append('courses', course);
		}

		return url.toString();
	}

	function getCalendarUrl() {
		const url = new URL('/api/calendar', $page.url.origin);
		url.searchParams.set('semester', data.semester);

		for (const course of $selectedCourses) {
			url.searchParams.append('courses', course);
		}

		return url.toString();
	}
</script>

<div class="container mx-auto px-4 py-12">
	<div class="mb-12">
		<h1 class="h1 font-medium">Erstelle deinen Kalender</h1>

		<p class="mt-4">
			Wähle deine Module und Termine aus und importiere das Ergebnis mithilfe der erstellten URL in
			einen Kalender deiner Wahl.
		</p>
	</div>

	<form
		data-sveltekit-replacestate
		data-sveltekit-keepfocus
		data-sveltekit-noscroll
		class="grid gap-4"
	>
		<div class="flex gap-2">
			<select
				class="select px-3 rounded-token"
				name="semester"
				value={data.semester}
				on:input={submitNearestForm}
			>
				{#each { length: 5 } as _, i}
					{@const year = new Date().getFullYear() - 2 + i}
					{@const winter = `${year}-winter`}
					{@const summer = `${year}-summer`}

					<option value={winter} selected={data.semester === winter}>
						{year} Winter
						{#if currentSemester === winter}
							(current)
						{/if}
					</option>
					<option value={summer} selected={data.semester === summer}>
						{year} Sommer
						{#if currentSemester === summer}
							(current)
						{/if}
					</option>
				{/each}
			</select>

			<button
				type="button"
				class="btn"
				class:variant-filled-primary={$copyShareUrl !== 'error'}
				class:variant-filled-error={$copyShareUrl === 'error'}
				on:click={() => copyShareUrl.copy()}
			>
				{#if $copyShareUrl === 'idle'}
					<Share2 />
				{:else if $copyShareUrl === 'success'}
					<Check />
				{:else if $copyShareUrl === 'error'}
					<X />
				{/if}
			</button>
		</div>
	</form>

	{#await data.lazy.events}
		<div class="grid gap-4 py-8 xl:grid-cols-2">
			{#each { length: 4 } as _}
				<div class="bg-surface-300-600-token h-48 animate-pulse rounded-lg"></div>
			{/each}
		</div>
	{:then events}
		<div class="grid gap-4 py-8 xl:grid-cols-2">
			{#each Object.entries(events) as [name, courses]}
				<CourseList {name} {courses} {selectedCourses}></CourseList>
			{/each}
		</div>
	{:catch}
		<div class="variant-soft-error">
			Es ist ein Fehler aufgetreten, bitte versuch es später erneut.
		</div>
	{/await}

	<div
		class="bg-surface-200-700-token border-surface-400-500-token mt-4 flex w-full items-center overflow-hidden rounded-full border"
	>
		<div
			class="text-surface-600-300-token flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-3 py-2"
		>
			{#key $selectedCourses}
				{getCalendarUrl()}
			{/key}
		</div>
		<button
			type="button"
			class="px-3 py-2 rounded-tr-token rounded-br-token"
			class:variant-filled-primary={$copyCalenderUrl !== 'error'}
			class:variant-filled-error={$copyCalenderUrl === 'error'}
			on:click={() => copyCalenderUrl.copy()}
		>
			{#if $copyCalenderUrl === 'idle'}
				<Copy></Copy>
			{:else if $copyCalenderUrl === 'success'}
				<Check />
			{:else if $copyCalenderUrl === 'error'}
				<X />
			{/if}
		</button>
	</div>
</div>
