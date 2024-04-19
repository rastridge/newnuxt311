<template>
	<div class="my-form-style">
		<FormKit
			v-model="state"
			type="form"
			:config="{ validationVisibility: 'live' }"
			submit-label="Submit"
			@submit="submitForm(state)"
		>
			<FormKit
				label="App Name"
				name="supportingApp_name"
				type="text"
				validation="required"
				value=""
			/>

			<FormKit
				label="Details"
				name="supportingApp_description"
				type="textarea"
				validation="required"
				value=""
			/>

			<FormKit
				label="Website"
				name="supportingApp_url"
				type="text"
				validation="required"
				value=""
			/>

			<FormKit
				label="Manager"
				name="supportingApp_owner"
				type="text"
				validation="required"
				value=""
			/>

			<FormKit
				label="Username"
				name="supportingApp_username"
				type="text"
				validation="required"
				value=""
			/>
			<FormKit
				label="Password"
				name="supportingApp_password"
				type="text"
				validation="required"
				value=""
			/>
			<display-cancelform :destination="'/admin/supporting_accounts'" />
		</FormKit>

		<p v-if="saving">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
			Saving ...
		</p>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const saving = ref(false)

	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])
	//
	// Incoming
	//
	const props = defineProps({
		id: { type: String, default: '0' },
	})

	//
	// Initialize form
	//
	const state = ref({})

	//
	// edit if there is an id - add if not
	//
	if (props.id !== '0') {
		const { data } = await useFetch(`/supporting_accounts/${props.id}`, {
			key: props.id,
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = data.value
	}

	//
	// form handlers
	//

	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}
</script>
