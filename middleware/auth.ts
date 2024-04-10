import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()

export default defineNuxtRouteMiddleware((to, from) => {
	if (!auth.isLoggedIn) {
		return navigateTo('/loginpage')
	}
})
