<template>
	<p v-if="!state">
		<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>Loading
	</p>
	<div class="my-form-style">
		<FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			v-model="state"
			submit-label="Submit member"
			@submit="submitForm"
		>
			<display-alert />

			<FormKit
				label="First Name"
				name="member_firstname"
				type="text"
				validation="required"
			/>
			<FormKit
				label="Last Name"
				name="member_lastname"
				type="text"
				validation="required"
			/>
			<FormKit
				type="email"
				label="Email address"
				name="account_email"
				validation="required|email"
				:errors="errors"
			/>
			<FormKit
				type="date"
				label="DOB"
				name="member_dob"
				validation="required"
			/>
			<FormKit
				type="select"
				label="Gender"
				name="member_gender"
				:options="[
					{ label: 'Male', value: 1 },
					{ label: 'Female', value: 0 },
				]"
				validation="required"
			/>
			<FormKit
				type="text"
				label="Guardian"
				name="member_guardian"
				validation="required"
			/>
			<FormKit
				type="select"
				label="Permission to participate"
				name="flag_legal"
				:options="[
					{ label: 'Yes', value: 1 },
					{ label: 'No', value: 0 },
				]"
				validation="required"
			/>
			<FormKit
				type="select"
				label="Photo permission"
				name="flag_photo"
				:options="[
					{ label: 'Yes', value: 1 },
					{ label: 'No', value: 0 },
				]"
				validation="required"
			/>
			<FormKit
				type="text"
				label="Street"
				name="account_addr_street"
				validation="required"
			/>
			<FormKit type="text" label="Street Ext" name="account_addr_street_ext" />
			<FormKit
				type="text"
				label="City"
				name="account_addr_city"
				validation="required"
			/>
			<FormKit
				type="select"
				label="Country"
				name="account_addr_country"
				id="account_addr_country"
				:options="justCountries"
				validation="required"
			/>
			<FormKit
				type="select"
				label="Region"
				name="account_addr_state"
				id="account_addr_state"
				:options="justRegions"
				validation="required"
			/>
			<FormKit
				type="text"
				label="Postal Code"
				name="account_addr_postal"
				validation="required"
			/>
			<FormKit
				type="tel"
				label="Phone number"
				name="account_addr_phone"
				placeholder="+1##########"
				v-model="state.account_addr_phone"
				validation="required | matches:/^\+[1]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/"
				:validation-messages="{
					matches: 'US/CA only. Must be in the format +1#########',
				}"
				validation-visibility="live"
			/>
			<FormKit
				type="select"
				label="Member type"
				placeholder="Select member type"
				name="member_type_id"
				:options="[
					{ label: 'Active', value: 11 },
					{ label: 'Alumni', value: 15 },
					{ label: 'Pending', value: 12 },
				]"
				validation="required"
			/>
			<FormKit
				type="select"
				label="Receive newsletter?"
				name="newsletter_recipient"
				:options="[
					{ label: 'Yes', value: 1 },
					{ label: 'No', value: 0 },
				]"
			/>
			<FormKit
				type="select"
				label="Receive US Mail?"
				name="mail_recipient"
				:options="[
					{ label: 'Yes', value: 1 },
					{ label: 'No', value: 0 },
				]"
			/>
			<FormKit
				type="select"
				label="Receive SMS messages?"
				name="sms_recipient"
				:options="[
					{ label: 'Yes', value: 1 },
					{ label: 'No', value: 0 },
				]"
			/>
			<display-alert />
			<display-cancelform :destination="'/admin/accounts_flag'" />
		</FormKit>

		<p v-if="saving">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
			Saving ...
		</p>
	</div>
</template>

<script setup>
	import { getNode } from '@formkit/core'
	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const auth = useAuthStore()
	const alert = useAlertStore()
	const { $dayjs } = useNuxtApp()
	const { getCountries, setRegions } = useLocations()
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
	// initialize form for add
	//
	const state = ref({})

	state.value.member_year = $dayjs().format('YYYY')
	state.value.account_addr_phone = '+1716'
	state.value.account_addr_state = 'NY'
	state.value.account_addr_street_ext = ''
	state.value.account_addr_country = 'US'
	state.value.member_type_id = '11'

	state.value.newsletter_recipient = '1'
	state.value.mail_recipient = '0'
	state.value.sms_recipient = '1'
	state.value.member_type_id = '11'

	//
	// EDIT if there is an id - ADD if not
	//
	if (props.id !== '0') {
		//
		// Initialize Edit form
		//
		const { data, pending, error, refresh } = await useFetch(
			`/accounts_flag/${props.id}`,
			{
				key: props.id,
				method: 'get',
				headers: {
					authorization: auth.user.token,
				},
			}
		)
		state.value = data.value
	}

	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}

	// errors
	const errors = computed(() => {
		return alert.message !== null ? [alert.message] : ['']
	})

	// Formkit preparations
	//
	// create coutry and region options formatted for Formkit
	const justCountries = ref(getCountries())
	const justRegions = ref(setRegions(state.value.account_addr_country))

	// adjust date for formkit date input
	state.value.member_dob = $dayjs(state.value.member_dob).format('YYYY-MM-DD')

	// Region depends on country
	onMounted(() => {
		// Use the IDs of the inputs you want to get
		const countryNode = getNode('account_addr_country')
		const stateNode = getNode('account_addr_state')

		// Here we are listening for the 'commit' event
		countryNode.on('commit', ({ payload }) => {
			// We update the value of the regions
			justRegions.value = setRegions(payload)
		})
	})
</script>
