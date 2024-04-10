<template>
	<div>
		<Head>
			<Title>Edit User {{ id }}</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem"></div>
		</div>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Edit User" />
			</div>
			<user-form :id="id" @submitted="onSubmit" />
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()
	//
	// Get user id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// Users form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitEdit('users', form_state)
		if (alert.message === null) {
			navigateTo('/admin/users')
		}
	}
</script>
