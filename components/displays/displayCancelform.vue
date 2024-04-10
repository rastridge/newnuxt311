<template>
	<Button
		class="p-button-sm mb-1"
		label="Cancel"
		@click="cancelForm()"
		severity="warning"
	></Button>
</template>

<script setup>
	const props = defineProps({
		destination: { String, default: '/', required: false },
	})
	const cancelForm = () => {
		navigateTo(props.destination)
	}
</script>
