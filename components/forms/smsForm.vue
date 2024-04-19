<template>
	<p v-if="id">
		Current version of this SMS was sent {{ sms_opened_cnt }} times
	</p>
	<div class="my-form-style">
		<FormKit
			v-model="state"
			type="form"
			:config="{ validationVisibility: 'live' }"
			submit-label="Submit"
			@submit="submitForm"
		>
			<FormKit
				type="select"
				label="Recipient Group"
				name="sms_recipient_type_id"
				placeholder="Select Recipient Group"
				:options="newsletterRecipientTypeOptions"
				validation="required"
			/>
			<FormKit
				label="SMS subject"
				name="sms_subject"
				type="text"
				validation="required"
			/>
			<FormKit
				label="SMS message"
				name="sms_body_text"
				type="textarea"
				validation="required"
			/>
			<display-cancelform :destination="'/admin/sms'" />
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
	// Incoming id
	//
	const props = defineProps({
		id: { type: String, default: '0' },
	})
	//
	// Outgoing form data
	//
	const emit = defineEmits(['submitted'])

	//
	// Formkit initial Add state
	//
	const state = ref({})
	state.value.sms_recipient_type_id = 13
	state.value.admin_user_id = auth.user.admin_user_id

	//
	//
	//
	const sms_opened_cnt = ref(0)
	//
	// Editing if there is an id - Adding if not
	//
	if (props.id !== '0') {
		//
		// get sms data for id
		//
		const { data: sms_data } = await useFetch(`/sms/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})

		//
		// assign existing data to Edit form
		//
		state.value = sms_data.value
		// additional
		state.value.admin_user_id = auth.user.admin_user_id

		sms_opened_cnt.value = sms_data.value.sms_recp_cnt
	}
	//
	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}

	// get newletter recipient types
	//
	const { data: newsletterRecipientTypes } = await useFetch(
		'/newsletters/newsletterrecipienttypes',
		{
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		}
	)
	//
	// convert for Formkit "label" "value"
	//
	const setNewsletterRecipientTypeOptions = (nltypes) => {
		const result = []
		nltypes.map((old) => {
			const n = {}
			n.label = old.newsletter_recipient_type
			n.value = old.newsletter_recipient_type_id
			result.push(n)
		})
		return result
	}
	const newsletterRecipientTypeOptions = setNewsletterRecipientTypeOptions(
		newsletterRecipientTypes.value
	)
</script>
