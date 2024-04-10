<template>
	<NuxtLayout>
		<NuxtLoadingIndicator :height="10" />
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
	// import { useMenuStore, useAuthStore } from '@/stores'
	// const auth = useAuthStore()
	import { useMenuStore } from '~/stores/menuStore'
	const menuStore = useMenuStore()

	useHead({
		title: 'The Buffalo Rugby Club',
	})

	useSeoMeta({
		title: 'The Buffalo Rugby Club',
		ogTitle: 'The Buffalo Rugby Club',
		description: 'Welcome to the Buffalo Rugby Club',
		ogDescription: 'Welcome to the Buffalo Rugby Club',
		ogImage: 'https://buffalorugby.org/bflo_blue.png',
	})

	//
	// get custom menu items
	await menuStore.initCustomMenuItems()

	// stay logged in?
	if (localStorage.getItem('auth')) {
		auth.loginAuto()
	}

	import '@formkit/themes/genesis'
</script>

<style lang="scss">
	@use '~/assets/sass/layout/layout';
</style>
