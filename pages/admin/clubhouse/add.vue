<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// archives form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('clubhouse', form_state)
		navigateTo(`/admin/clubhouse`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add clubhouse Item</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add clubhouse item" />
			</div>
			<clubhouse-form @submitted="onSubmit" />
		</div>
	</div>
</template>
