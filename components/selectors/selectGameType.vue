<template>
	<div>
		<!-- 		<Dropdown v-model="gametype" :options="gametypes" optionLabel="label" optionValue="value"
			placeholder="Select Game Type" :pt="{
				root: { class: 'w-full md:w-20rem' },
				item: { class: 'text-sm md:text-lg  font-semibold' },
				input: { class: 'text-sm md:text-lg  font-semibold' },
			}" /> -->
		<Listbox v-model="gametype" :options="gametypes" optionLabel="label" optionValue="value" :pt="{
			root: { class: 'w-full md:w-20rem' },
			item: { class: 'text-sm md:text-lg  font-semibold' },
			input: { class: 'text-sm md:text-lg  font-semibold' },
		}" />
	</div>
</template>

<script setup>
//
// Incoming
//
const props = defineProps({
	currenttype: {
		type: Number,
		required: true,
	},
})
const gametype = ref(props.currenttype)

//
// Outgoing
//
const emit = defineEmits(['submitted'])

//
// Info for dropdown
//
const gametypes = [
	{ label: '15s', value: 1 },
	{ label: '7s and 10s', value: 7 },
]
//
// Watch for dropdown value change
//
watch(gametype, () => emit('submitted', gametype.value))
</script>