<template>
	<div>
		<Head>
			<Title>Add Account</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add account" />
			</div>

			<accounts-form @submitted="onSubmit" />
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitAdd('accounts', form_state)
		if (alert.message === null) {
			navigateTo(`/admin/accounts/men`)
		}
	}
</script>
