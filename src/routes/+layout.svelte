<script lang="ts">
	import '../app.css';

	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<nav class="flex gap-4 p-4 border-b border-surface-300-600-token">
	<a href="/">Matsemann</a>
	<LightSwitch class="ml-auto" />
</nav>

<slot />
