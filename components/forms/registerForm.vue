<template>
	<div>
		<Button label="Show" @click="visible = true" />

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
					label="Prove you are a human. What is 3x5?"
					type="text"
					validation="required | matches:15"
				/>
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
					label="Previous club(s)"
					name="member_prev_club"
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
					type="text"
					label="Street"
					name="account_addr_street"
					validation="required"
				/>
				<FormKit
					type="text"
					label="Street Ext"
					name="account_addr_street_ext"
				/>
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
				<display-alert />
				<display-cancelform />
			</FormKit>
			<p v-if="saving">
				<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
				Saving ...
			</p>
		</div>
	</div>

	<!-- Modal -->
	<Dialog
		v-model:visible="visible"
		:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
		:style="{ width: '50vw' }"
		modal
		:pt="{
			root: {
				style: {
					padding: '0',
					minWidth: '10rem',
					'border-radius': '20px',
				},
			},
			header: {
				style: {
					'background-color': '#CCC',
				},
			},
			content: {
				style: {
					padding: '1rem',
					'background-color': '#EEE',
				},
			},
			footer: {
				style: {
					'background-color': '#CCC',
					padding: '1rem',
				},
			},
		}"
	>
		<template #header>
			<div>
				<span class="text-lg font-semibold"
					>Thank you for considering the Buffalo Rugby Club</span
				>
			</div>
		</template>
		<p>
			Registering is an expression of interest in being informed of the club
			activities and does not imply any commitment financially or otherwise.
			Just come to practice and see if we're right for you.
		</p>

		<p>
			To be a full time member eligible to play in sanctioned USA Rugby
			competitions you will be required to:
		</p>
		<ul>
			<li>Become a member of USA Rugby $</li>
			<li>Pay Buffalo Rugby Club dues $</li>
			<li>Practice 2 hours twice a week</li>
			<li>
				Have the ability to travel on weekends to away games as far as NYC $
			</li>
		</ul>
		<p>
			We love our sport. We take our preparation seriously and play hard. Join
			us.
		</p>

		<nuxt-link to="/schedule" target="_blank" rel="noopener">
			<Button label="See current schedule" />
		</nuxt-link>

		<template #footer>
			<Button
				type="button"
				label="Cancel"
				severity="secondary"
				@click="navigateTo('/')"
			/>
			<Button
				type="button"
				label="Continue"
				@click="visible = false"
				autofocus
			/>
		</template>
	</Dialog>
</template>

<script setup>
	import { getNode } from '@formkit/core'
	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	import { color } from 'chart.js/helpers'
	const auth = useAuthStore()
	const alert = useAlertStore()
	const { $dayjs } = useNuxtApp()
	const { getCountries, setRegions } = useLocations()
	const saving = ref(false)
	const visible = ref(true)

	// Outgoing
	//
	const emit = defineEmits(['submitted'])

	// initialize form for add
	//
	const state = ref({})

	state.value.member_year = $dayjs().format('YYYY')
	state.value.account_addr_phone = '+1716'
	state.value.member_show_phone = '1'
	state.value.account_addr_state = 'NY'
	state.value.account_addr_street_ext = ''
	state.value.account_addr_country = 'US'
	state.value.member_show_addr = '1'
	state.value.newsletter_recipient = '1'
	state.value.mail_recipient = '0'
	state.value.sms_recipient = '1'
	state.value.member_type_id = '9'
	state.value.member_prev_club = 'None'
	state.value.member_type2_id = ''
	state.value.member_admin_type_id = '0'
	state.value.member_admin_type2_id = '0'
	state.value.member_position = ''
	state.value.member_nickname = ''

	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}

	// trying to get rid of "Saving"
	// alert.message !== null ? (saving.value = false) : (saving.value = true)

	// errors is Formkit error array
	const errors = computed(() => {
		return alert.message !== null ? [alert.message] : ['']
	})

	// Formkit preparations
	//
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

	// create coutry and region options formatted for Formkit
	const justCountries = ref(getCountries())
	// justCountries.value = getCountries()
	const justRegions = ref(setRegions(state.value.account_addr_country))
	// set regions for initial country
	// justRegions.value = setRegions(state.value.account_addr_country)
</script>
