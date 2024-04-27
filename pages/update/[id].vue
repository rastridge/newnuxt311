<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()
	//
	//
	const route = useRoute()
	const id = route.params.id
	// account_id follows the digit 4
	const account_id = ref(id.substring(id.lastIndexOf('I') + 1, id.length))

	//
	// Update Account form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitEdit('accounts', form_state)
		if (alert.message === null) {
			navigateTo(`/update/thankyou`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title>Update</Title>
		</Head>
		<common-header title="Update Membership" />
		<register-update-form :id="account_id" @submitted="onSubmit" />
	</div>
</template>
