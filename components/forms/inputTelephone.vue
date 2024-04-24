<template>
	<div class="text-lg font-semibold mb-1">Telephone</div>
	<VueTelInput v-model="t" @input="submitTel" />
	<div class="mb-2"></div>
</template>

<script setup>
	import { VueTelInput } from 'vue-tel-input'
	import 'vue-tel-input/vue-tel-input.css'

	const props = defineProps({
		tnumber: { type: String, required: true },
	})

	const t = ref(props.tnumber)
	const emit = defineEmits(['update'])

	const submitTel = () => {
		emit('update', t)
	}

	const bindProps = ref({
		mode: 'international',
		defaultCountry: 'US',
		disabledFetchingCountry: false,
		disabled: false,
		disabledFormatting: false,
		placeholder: 'Enter a phone numb',
	})
</script>
