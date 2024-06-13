<template>
	<div class="my-form-style">
		<FormKit v-model="state" type="form" :config="{ validationVisibility: 'live' }" submit-label="Submit"
			@submit="submitForm(state)">
			<FormKit label="Archive Title" name="archive_title" type="text" autofocus validation="required" />
			<FormKit label="Description" name="archive_description" type="textarea" validation="required" />
			<FormKit label="Category" name="archive_category" type="text" />

			<div class="my-fileupload-wrapper-style">
				<p>PDF file {{ state.archive_filepath }}</p>
				<FileUpload class="mb-4 my-test-style" mode="basic" name="fileInput" :auto="true" accept="application/pdf"
					customUpload @uploader="submitFileUpload" />
				<p v-if="error" class="alert-danger w-full">Error: Must submit file</p>
			</div>
			<FormKit type="date" label="Document Date" name="archive_date" validation="required" />
			<display-cancelform :destination="'/admin/archive'" />
		</FormKit>
		<p v-if="saving">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
			Saving ...
		</p>
	</div>

	<!-- Modal -->
	<Dialog v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }">
		<template #header>
			<div class="my-dialog-header">
				<h3>Processing file</h3>
			</div>
		</template>
		<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
	</Dialog>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()
const saving = ref(false)
const error = ref(false)

const { $dayjs } = useNuxtApp()
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
// Initialize Add form
//
const state = ref({})
//
// edit if there is an id - add if not
//
if (props.id !== '0') {
	//
	// Initialize Edit form
	//
	const { data: archive_data } = await useFetch(`/archive/${props.id}`, {
		method: 'get',
		headers: {
			authorization: auth.user.token,
		},
	})
	state.value = archive_data.value

	// Format for Primevue calendar / neessary?
	state.value.archive_date = $dayjs(archive_data.value.archive_date).format(
		'YYYY-MM-DD'
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

const submitFileUpload = async (event) => {
	state.value.archive_filepath = null
	const file = event.files[0]

	const formData = new FormData()
	formData.append('file', file)
	openProgressModal()
	// Find server code in folder Nuxt3-brc-media-api
	const CONFIG = useRuntimeConfig()

	const url = `${CONFIG.public.MEDIA_URL}archives`

	const res = await fetch(url, {
		method: 'POST',
		body: formData,
		headers: {
			authorization: auth.user.token,
		},
	})

	const data = await res.json()
	closeProgressModal()
	state.value.archive_filepath = data.imageUrl
}
//
// form handlers
//
const submitForm = async (state) => {
	if (state.archive_filepath) {
		saving.value = true
		error.value = false
		emit('submitted', state)
	} else {
		error.value = true
	}
}
</script>
