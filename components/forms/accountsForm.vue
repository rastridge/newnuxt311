<template>
	<p v-if="!memberTypeOptions || !memberAdminTypeOptions || !state">
		<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>Loading
	</p>

	<div class="my-form-style">
		<display-alert />

		<FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			v-model="state"
			submit-label="Submit member"
			@submit="submitForm"
		>
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
				type="number"
				label="Year joined"
				name="member_year"
				min="1966"
				step="1"
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
				type="text"
				label="Previous Club(s)"
				name="member_prev_club"
				v-model="state.member_prev_club"
			/>

			<FormKit
				type="select"
				label="Show phone?"
				name="member_show_phone"
				:options="[
					{ label: 'Yes', value: 1 },
					{ label: 'No', value: 0 },
				]"
			/>
			<FormKit
				type="select"
				label="Show address?"
				name="member_show_addr"
				:options="[
					{ label: 'Yes', value: 1 },
					{ label: 'No', value: 0 },
				]"
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
			<FormKit
				type="select"
				label="Member type"
				placeholder="Select member type"
				name="member_type_id"
				:options="memberTypeOptions"
				validation="required"
			/>
			<FormKit
				type="select"
				label="2nd Member type"
				placeholder="Select member type"
				name="member_type2_id"
				:options="memberTypeOptions"
			/>
			<FormKit
				type="select"
				label="Member Administrator role"
				placeholder="Select admin type"
				name="member_admin_type_id"
				:options="memberAdminTypeOptions"
			/>
			<FormKit
				type="select"
				label="2nd Member Administrator role"
				placeholder="Select admin type"
				name="member_admin_type2_id"
				:options="memberAdminTypeOptions"
			/>
			<!-- wall of fame year -->

			<FormKit
				type="number"
				label="WOF Year"
				name="member_wall_of_fame_year"
				min="1966"
				step="1"
			/>
			<div class="my-fileupload-wrapper-style">
				<!-- wof image file upload 	-->
				<label
					><span class="font-semibold"
						>Add or Replace WOF image file</span
					></label
				>
				<p>Image must be 72w 72h 72dpi</p>
				<FileUpload
					class="mb-2 my-test-style"
					mode="basic"
					name="fileInput"
					:auto="true"
					accept="image/*"
					customUpload
					@uploader="customUploader"
				/>
				<!-- show image file  -->
				<div
					v-if="state.member_pic_path"
					class="card flex justify-content-start mb-2"
				>
					<label
						>Current image filepath is<br />
						{{ state.member_pic_path }}</label
					>
					<Image :src="state.member_pic_path" alt="Image" width="72" />
				</div>
				<display-alert />
			</div>
			<display-cancelform :destination="'/admin/accounts/men'" />
		</FormKit>
		<p v-if="saving">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
			Saving ...
		</p>
	</div>
	<!-- Modal -->
	<Dialog
		v-model:visible="displayModal"
		:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
		:style="{ width: '50vw' }"
	>
		<template #header>
			<div class="my-dialog-header">
				<h3>Processing file</h3>
			</div></template
		>
		<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
	</Dialog>
</template>

<script setup>
	import { getNode } from '@formkit/core'
	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const auth = useAuthStore()
	const alert = useAlertStore()
	const { $dayjs } = useNuxtApp()
	const { getCountries, setRegions } = useLocations()
	const { getMemberAdminTypeOptions, getMemberTypeOptions } = useMembertypes()
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
	state.value.member_show_phone = '1'
	state.value.account_addr_state = 'NY'
	state.value.account_addr_street_ext = ''
	state.value.account_addr_country = 'US'
	state.value.member_show_addr = '1'
	state.value.member_type_id = '2'
	state.value.member_type2_id = '0'
	state.value.member_admin_type_id = '0'
	state.value.member_admin_type2_id = '0'
	state.value.member_prev_club = 'None'
	state.value.newsletter_recipient = '1'
	state.value.mail_recipient = '0'
	state.value.sms_recipient = '1'

	//
	// EDIT if there is an id - ADD if not
	//
	if (props.id !== '0') {
		//
		// Initialize Edit form
		//
		const { data, pending, error, refresh } = await useFetch(
			`/accounts/${props.id}`,
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

	//
	// Formkit preparations
	//
	// create coutry and region options formatted for Formkit
	const justCountries = ref(getCountries())
	const justRegions = ref(setRegions(state.value.account_addr_country))
	// get member types for options formatted for Formkit
	const memberAdminTypeOptions = await getMemberAdminTypeOptions()
	const memberTypeOptions = await getMemberTypeOptions()
	//
	// errors
	//
	const errors = computed(() => {
		return alert.message !== null ? [alert.message] : ['']
	})
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
	// ////////////////// Handle wof image upload
	//
	// progress modal
	//
	const displayModal = ref(false)
	const openProgressModal = () => {
		displayModal.value = true
	}
	const closeProgressModal = () => {
		displayModal.value = false
	}
	const customUploader = async (event) => {
		const file = event.files[0]
		// voodoo
		const image = new Image()
		const imageDimensions = await new Promise((resolve) => {
			image.src = URL.createObjectURL(file)
			image.onload = () => {
				const dimensions = {
					height: image.height,
					width: image.width,
				}
				resolve(dimensions)
			}
		})
		if (imageDimensions.height === 72 && imageDimensions.width === 72) {
			const formData = new FormData()
			formData.append('file', file)
			openProgressModal()
			// Find server code in folder Nuxt3-brc-media-api
			const CONFIG = useRuntimeConfig()

			const url = `${CONFIG.public.MEDIA_URL}wof`

			const res = await fetch(url, {
				method: 'POST',
				body: formData,
				headers: {
					authorization: auth.user.token,
				},
			})
			const data = await res.json()
			closeProgressModal()
			image.value = data.imageUrl
			// console.log('IN handle image.value = ', image.value)
			state.value.member_pic_path = data.imageUrl
		} else {
			alert.error(
				'Illegal dimensons ' +
					imageDimensions.height +
					'px ' +
					imageDimensions.width +
					'px - Image must be 72h 72w'
			)
		}
	}

	//
	// form handlers
	//
	const submitForm = (state) => {
		saving.value = true
		emit('submitted', state)
	}
</script>
