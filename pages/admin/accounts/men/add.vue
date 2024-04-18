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
		await onSubmitAdd('accounts', form_state)
		if (alert.message === null) {
			navigateTo(`/admin/accounts/men`)
		}
	}
</script>
