<script setup lang="ts">
	const { $dayjs } = useNuxtApp()
</script>

<template>
	<!-- <div class="mt-4 layout-footer"> -->
	<div class="mt-4">
		<div class="text-center w-full">
			<!-- <sponsor-ads /> -->
			<span class="my-text-style text-gray-50"
				>Copyright {{ $dayjs().format('YYYY') }} &copy; The Buffalo Rugby Club -
				Buffalo New York</span
			>
		</div>
	</div>
</template>
