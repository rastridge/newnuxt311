<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	definePageMeta({
		middleware: ['auth'],
	})

	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	// Sponsors form action
	//
	const onSubmit = async function (state) {
		alert.clear()
		await onSubmitAdd('sponsors', state)
		if (alert.message === null) {
			navigateTo(`/admin/sponsors`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add sponsors</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add sponsor" />
			</div>
			<sponsors-form @submitted="onSubmit" />
		</div>
	</div>
</template>
