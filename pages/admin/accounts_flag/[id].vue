<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	definePageMeta({
		middleware: ['auth'],
	})

	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()

	//
	// Get account id to edit
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitEdit('accounts_flag', form_state)
		if (alert.message === null) {
			navigateTo(`/admin/accounts_flag`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Flag Account {{ id }}</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Edit flag account" />
			</div>
			<accounts-flag-form :id="id" @submitted="onSubmit" />
		</div>
	</div>
</template>
