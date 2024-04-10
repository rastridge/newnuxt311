<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAddByGuest } = useSubmit()

	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitAddByGuest('accounts', form_state)
		if (alert.message === null) {
			navigateTo(`/`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title>Register to Join Men</Title>
		</Head>
		<common-header title="Register to Join Men" />
		<register-form @submitted="onSubmit" />
	</div>
</template>
