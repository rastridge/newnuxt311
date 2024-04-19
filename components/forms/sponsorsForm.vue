<template>
	<div class="my-form-style">
		<display-alert />

		<FormKit
			v-model="state"
			type="form"
			:config="{ validationVisibility: 'live' }"
			submit-label="Submit"
			@submit="submitForm(state)"
		>
			<FormKit
				label="Sponsor Name"
				name="ad_client_name"
				type="text"
				validation="required"
			/>

			<FormKit
				label="Sponsor contact"
				name="ad_client_contact"
				type="text"
				validation="required"
			/>

			<FormKit
				label="Sponsor email"
				name="ad_client_email"
				type="email"
				validation="required | email"
			/>

			<FormKit
				label="Sponsor phone"
				name="ad_client_phone"
				placeholder="xxx-xxx-xxxx"
				validation=" required | matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
				type="tel"
				:validation-messages="{
					matches: 'Phone number must be in the format xxx-xxx-xxxx',
				}"
			/>

			<FormKit
				label="Website"
				name="ad_client_website"
				type="text"
				validation="required"
			/>

			<div class="my-fileupload-wrapper-style">
				<!-- sponsor image file upload 			-->
				<p>Image must be 750w 125h 72dpi</p>
				<label for="ad_image">Add or Replace Sponsor image file</label><br />
				<!-- show image file  -->
				<div
					v-if="state.ad_image_path"
					class="card flex justify-content-start mb-2"
				>
					<label
						>Current image filepath is<br />
						{{ state.ad_image_path }}</label
					>
					<Image :src="state.ad_image_path" alt="Image" width="320" />
				</div>
				<FileUpload
					class="mb-4 my-text-style"
					mode="basic"
					name="fileInput"
					:auto="true"
					accept="image/*"
					customUpload
					@uploader="customUploader"
				/>
			</div>
			<display-alert />
			<display-cancelform :destination="'/admin/sponsors'" />
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
	import { useAuthStore } from '~/stores/authStore'
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const auth = useAuthStore()
	const saving = ref(false)
	// const fileInput = ref(null)
	// const image = ref(null)

	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])
	//
	// Incoming id
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
		// get opponent with id === props.id
		const { data } = await useFetch(`/sponsors/${props.id}`, {
			key: props.id,
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = data.value
		//
		// Insert to make images responsive
		//
		state.value.ad_image_path = state.value.ad_image_path.replace(
			/\<img/g,
			'<img width="100%"'
		)
	}
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
		state.value.ad_image_path = null
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

		if (imageDimensions.height === 125 && imageDimensions.width === 750) {
			const formData = new FormData()
			formData.append('file', file)
			openProgressModal()

			// Find server code in folder Nuxt3-brc-media-api
			const CONFIG = useRuntimeConfig()

			const url = `${CONFIG.public.MEDIA_URL}sponsors`

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
			state.value.ad_image_path = data.imageUrl
		} else {
			alert.error(
				'Incorrect image dimensons ' +
					imageDimensions.height +
					'px ' +
					imageDimensions.width +
					'px - Image must be 750px 125px'
			)
		}
	}

	//
	// form handlers
	//
	const submitForm = (state) => {
		if (state.ad_image_path) {
			saving.value = true
			alert.clear()
			emit('submitted', state)
		} else {
			alert.error('Image required')
		}
	}
</script>
