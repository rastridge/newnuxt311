<template>
	<div id="commonheader">
		<div class="my-header-style">{{ title }}</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		title: { String, required: true },
	})
</script>
