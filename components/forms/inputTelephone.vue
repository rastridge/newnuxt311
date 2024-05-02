<template>
	<div class="formkit-outer">
		<div class="formkit-wrapper">
			<div class="formkit-label">Telephone</div>
			<div class="text-small vue-tel-inout">
				<VueTelInput
					v-model="t"
					:preferredCountries="['us', 'gb', 'au', 'ca']"
					:enabledCountryCode="enableCC"
					:autoFormat="atoformat"
					:defaultCountry="'us'"
					:inputOptions="inputOptions"
					@input="submitTel"
				/>
			</div>
			<div v-if="t !== null && t.length < 10" class="mt-1 text-red-500">
				Phone number required
			</div>
		</div>
	</div>
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
	const atoformat = ref(true)
	const inputOptions = ref({ showDialCode: true })
	const enableCC = ref(false)
	/* 	const bindProps = ref({
		mode: 'international',
		defaultCountry: 'US',
		disabledFetchingCountry: false,
		disabled: false,
		disabledFormatting: false,
		placeholder: 'Enter a phone numb',
	}) */
</script>

<style scoped>
	.vue-tel-input {
		height: 45px;
	}
</style>
