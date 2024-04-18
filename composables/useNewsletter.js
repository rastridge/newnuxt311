import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()

export default function useNewsletter() {
	const addNewsletter = async (state, send) => {
		const { data } = await useFetch('/newsletters/addone', {
			method: 'post',
			body: state,
			headers: {
				authorization: auth.user.token,
			},
		})

		state.newsletter_id = data.value.insertId
		if (send === 'sendNow') {
			const { data } = await useFetch('/newsletters/send', {
				method: 'post',
				body: state,
				headers: {
					authorization: auth.user.token,
				},
			})
		}
	}

	const editNewsletter = async (state, send) => {
		const { data } = await useFetch('/newsletters/editone', {
			method: 'post',
			body: state,
			headers: {
				authorization: auth.user.token,
			},
		})

		if (send === 'sendNow') {
			const { data } = await useFetch('/newsletters/send', {
				method: 'post',
				body: state,
				headers: {
					authorization: auth.user.token,
				},
			})
		}
	}
	return { addNewsletter, editNewsletter }
}
