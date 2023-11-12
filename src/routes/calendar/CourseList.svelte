<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let name: string;
	export let courses: string[];
	export let selectedCourses: Writable<Set<string>>;

	function handleSelectAll(e: Event & { currentTarget: HTMLInputElement }) {
		selectedCourses.update((set) => {
			if (e.currentTarget.checked) {
				courses.forEach((c) => set.add(c));
			} else {
				courses.forEach((c) => set.delete(c));
			}
			return set;
		});
	}

	function handleSelect(e: Event & { currentTarget: HTMLInputElement }, course: string) {
		selectedCourses.update((set) => {
			if (e.currentTarget.checked) {
				set.add(course);
			} else {
				set.delete(course);
			}
			return set;
		});
	}
</script>

<div class="card p-4">
	<h2 class="h2">
		<div class="flex items-center gap-4">
			<span>
				{name}
			</span>
		</div>
	</h2>

	<div class="flex flex-col gap-4 pt-4">
		{#if courses.length}
			<label class="flex items-center gap-2">
				<input
					class="checkbox"
					type="checkbox"
					checked={courses.every((c) => $selectedCourses.has(c))}
					on:change={handleSelectAll}
				/>
				<p>Select all</p>
			</label>

			<hr />

			<ul class="flex flex-col gap-1">
				{#each courses as course}
					<li>
						<label class="flex items-center gap-2">
							<input
								class="checkbox flex-shrink-0"
								type="checkbox"
								name="courses"
								value={course}
								checked={$selectedCourses.has(course)}
								on:change={(e) => handleSelect(e, course)}
							/>
							<p>{course}</p>
						</label>
					</li>
				{/each}
			</ul>
		{:else}
			<p>Keine Kurse gefunden</p>
		{/if}
	</div>
</div>
