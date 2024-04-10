<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
</script>

<template>
	<div
		class="bg-transparent border-round-lg md:border-round-xl md:m-2 p-1 md:p-2"
	>
		<app-header />
	</div>
	<div
		class="surface-400 border-round-lg md:border-round-xl shadow-6 m-0 md:m-2 p-1 md:p-2"
	>
		<slot />
	</div>
	<div v-if="!auth.isLoggedIn"><AppFooter /></div>
</template>
