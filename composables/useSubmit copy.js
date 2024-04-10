//
// used in all except Newsletters and SMS
// because they must handle Send Now Send Later
//
import { useAuthStore } from '~/stores/authStore'
import { useAlertStore } from '~/stores/alertStore'

export default function useSubmit() {
	const auth = useAuthStore()
	const alert = useAlertStore()

	const onSubmitEdit = async function (app, form_state) {
		const { data, error } = await useFetch(`/${app}/editone`, {
			method: 'post',
			body: form_state,
			headers: {
				authorization: auth.user.token,
			},
		})
		// console.log('IN onsubmitedit ', 'form_state = ', form_state)
		// console.log('IN onsubmitedit ', 'data.value.message = ', data.value.message)
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Error submitting data to /${app}/editone`,
			})
		} else {
			if (data.value.message) {
				// message if email exists
				alert.error(data.value.message)
			}
		}
	}

	const onSubmitAdd = async function (app, form_state) {
		const { data, error } = await useFetch(`/${app}/addone`, {
			method: 'post',
			body: form_state,
			headers: {
				authorization: auth.user.token,
			},
		})

		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Error submitting data to /${app}/addone`,
			})
		} else {
			if (data.value.message) {
				// message if email exists
				alert.error(data.value.message)
			}
			return data.value.message
		}
	}

	const onSubmitAddByGuest = async function (app, form_state) {
		const { data, error } = await useFetch(`/${app}/addonebyguest`, {
			method: 'post',
			body: form_state,
		})

		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Error submitting data to /${app}/addonebyguest`,
			})
		} else {
			if (data.value.message) {
				// message if email exists
				alert.error(data.value.message)
			}
			return data.value.message
		}
	}

	return { onSubmitEdit, onSubmitAdd, onSubmitAddByGuest }
}
