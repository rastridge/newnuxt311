<template>
	<div class="my-form-style">
		<FormKit
			v-model="state"
			type="form"
			:config="{ validationVisibility: 'live' }"
			submit-label="Submit Video"
			@submit="submitForm(state)"
		>
			<FormKit
				label="Video Name"
				name="video_title"
				type="text"
				validation="required"
			/>

			<FormKit
				label="Video Description"
				name="video_synop"
				type="textarea"
				validation="required"
			/>
			<FormKit
				label="Video URL"
				name="video_url"
				type="text"
				validation="required"
			/>

			<!-- Date input-->
			<FormKit
				type="date"
				label="Event Date"
				name="video_event_dt"
				validation="required"
			/>
			<!-- Date input-->
			<FormKit
				type="date"
				label="Release Date"
				name="video_release_dt"
				validation="required"
			/>

			<!-- Date input-->
			<FormKit
				type="date"
				label="Expire Date"
				name="video_expire_dt"
				validation="required"
			/>
			<display-cancelform :destination="'/admin/videos'" />
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
	const { $dayjs } = useNuxtApp()

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
		const { data } = await useFetch(`/videos/${props.id}`, {
			key: props.id,
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = data.value

		// Format for Primevue calendar
		state.value.video_event_dt = $dayjs(data.value.video_event_dt).format(
			'YYYY-MM-DD'
		)
		state.value.video_release_dt = $dayjs(data.value.video_release_dt).format(
			'YYYY-MM-DD'
		)
		state.value.video_expire_dt = $dayjs(data.value.video_expire_dt).format(
			'YYYY-MM-DD'
		)
	}

	//
	// form handlers
	//
	const submitForm = async (state) => {
		saving.value = true
		emit('submitted', state)
	}
</script>
