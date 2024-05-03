<template>
	<div id="commonheader">
		<div class="my-header-style">{{ title }}</div>
	</div>
</template>

<script setup>

const props = defineProps({
	title: { type: String, required: true },
})
</script>
