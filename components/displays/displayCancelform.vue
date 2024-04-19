<template>
	<Button
		class="p-button-sm mb-1"
		label="Cancel"
		severity="warning"
		@click="cancelForm()"
	></Button>
</template>

<script setup>
	const props = defineProps({
		destination: { type: String, default: '/', required: false },
	})
	const cancelForm = () => {
		navigateTo(props.destination)
	}
</script>
