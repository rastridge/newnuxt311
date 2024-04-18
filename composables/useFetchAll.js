import { useAuthStore } from '~/stores/authStore'

export default function useFetchAll() {
	const auth = useAuthStore()

	const getAll = async (app) => {
		const { data } = await useFetch(`/${app}/getall`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})

		return { data }
	}

	const deleteOne = async (app, id) => {
		const { data } = await useFetch(`/${app}/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: auth.user.token,
			},
		})
		return data
	}

	const changeStatusOne = async (app, { id, status }) => {
		const { pending } = await useFetch(`/${app}/status`, {
			method: 'POST',
			headers: {
				authorization: auth.user.token,
			},
			body: { id, status },
		})
	}
	return {
		getAll,
		deleteOne,
		changeStatusOne,
	}
}
