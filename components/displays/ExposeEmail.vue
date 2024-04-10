<template>
	<div>
		<span v-if="!hover" style="color: rgb(4, 0, 255)" @mouseover="hover = true"
			>Email</span
		>
		<span v-if="hover" @mouseleave="hover = false">
			<a :href="'mailto:' + email" style="color: rgb(4, 0, 255)">{{ email }}</a>
		</span>
	</div>
</template>

<script setup>
	const hover = ref(false)
	const props = defineProps({
		email: { type: String, required: true },
	})
</script>
