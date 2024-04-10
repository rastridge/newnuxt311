<script setup lang="ts">
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
</script>

<template>
	<div v-if="!auth.isLoggedIn" class="order-1 border-white">
		<app-social />
	</div>
	<div v-if="!auth.isLoggedIn" class="order-1 border-white">
		<app-brand />
	</div>
	<div class="order-1 border-white">
		<app-menu />
	</div>
</template>
