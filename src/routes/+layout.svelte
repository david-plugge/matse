<script lang="ts">
	import '../app.css';

	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<nav class="flex gap-4 p-4 border-b border-surface-300-600-token justify-between items-center">
	<a href="/">Matse</a>

	<nav class="flex gap-2">
		<a href="/" class="px-4 py-2 font-medium">Home</a>
		<a href="/stundenplan" class="px-4 py-2 font-medium">Stundenplan</a>
	</nav>

	<LightSwitch />
</nav>

<slot />
