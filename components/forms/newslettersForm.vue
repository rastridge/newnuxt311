<template>
	<p v-if="id">
		Current version of newsletter opened count {{ newsletter_opened_cnt }}
		<br />
		Sent count {{ newsletter_recp_cnt }}
	</p>
	<div class="my-form-style">
		<FormKit
			v-model="state"
			type="form"
			:config="{ validationVisibility: 'live' }"
			submit-label="Submit Newsletter"
			@submit="submitForm"
		>
			<FormKit
				type="select"
				label="Recipient Group"
				placeholder="Select Recipient Group"
				name="newsletter_recipient_type_id"
				:options="newsletterRecipientTypeOptions"
				validation="required"
			/>

			<FormKit
				label="Newsletter subject"
				name="newsletter_subject"
				type="text"
				validation="required"
			/>
			<FormKit
				v-if="peek"
				label="Raw HTML newsletter_body_html"
				name="newsletter_body_html"
				type="textarea"
				disabled="true"
			/>
			<Button
				label="Toggle raw HTML view"
				class="p-button-secondary mb-1"
				@click="toggle"
			/>

			<h4>Content</h4>
			<input-body
				app="newsletter"
				:field="state.newsletter_body_html"
				@changeState="changeState"
			></input-body>
			<display-cancelform :destination="'/admin/newsletters'" />
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
	// Incoming i
	//
	const props = defineProps({
		id: { type: String, default: '0' },
	})
	//
	// incoming from inputBody component
	//
	const changeState = (field) => {
		state.value.newsletter_body_html = field
	}

	//
	// Outgoing form data
	//
	const emit = defineEmits(['submitted'])

	//
	// raw html view
	const peek = ref(false)
	const toggle = () => {
		peek.value = !peek.value
	}
	//
	// Formkit initial state
	//
	const state = ref({})
	state.value.newsletter_recipient_type_id = 9
	state.value.newsletter_id = ''
	state.value.newsletter_body_html = ''
	state.value.newsletter_body_text = ''
	state.value.newsletter_subject = ''
	state.value.admin_user_id = auth.user.admin_user_id

	//
	//
	//
	const newsletter_opened_cnt = ref(0)
	const newsletter_recp_cnt = ref(0)
	//
	// Editing if there is an id - Adding if not
	//
	if (props.id !== '0') {
		//
		// assign existing data to Edit form
		//
		const { data: news_data } = await useFetch(`/newsletters/${props.id}`, {
			method: 'get',
		})
		state.value = news_data.value

		//
		// Insert to make images responsive
		//
		state.value.newsletter_body_html = state.value.newsletter_body_html.replace(
			/\<img/g,
			'<img width="100%"'
		)

		newsletter_opened_cnt.value = news_data.value.newsletter_opened_cnt
		newsletter_recp_cnt.value = news_data.value.newsletter_recp_cnt
	}

	//
	// get newsletter recipient types
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
	// Convert for Formkit "label" "value"
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

	//
	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}
</script>
