<script setup lang="ts">
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
</script>

<template>
	<div v-if="!auth.isLoggedIn">
		<app-social />
	</div>
	<div v-if="!auth.isLoggedIn">
		<app-brand />
	</div>
	<div>
		<app-menu class="mt-2" />
	</div>
</template>
