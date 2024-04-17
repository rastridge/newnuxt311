<template>
	<div>
		<Head>
			<Title>Add User</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add User" />
			</div>
			<div class="w-full">
				<user-form @submitted="onSubmit" />
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	definePageMeta({
		middleware: ['auth'],
	})
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// Users form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitAdd('users', form_state)
		if (alert.message === null) {
			navigateTo('/admin/users')
		}
	}
</script>
