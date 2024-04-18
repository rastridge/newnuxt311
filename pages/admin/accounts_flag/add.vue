<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	definePageMeta({
		middleware: ['auth'],
	})
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitAdd('accounts_flag', form_state)
		if (alert.message === null) {
			navigateTo(`/admin/accounts_flag`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Flag Account</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add flag account" />
			</div>
			<accounts-flag-form @submitted="onSubmit" />
		</div>
	</div>
</template>
