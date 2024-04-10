<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// Events form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('events', form_state)
		navigateTo(`/admin/events`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add events Item</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add Events" />
			</div>
			<events-form @submitted="onSubmit" />
		</div>
	</div>
</template>

<style scoped></style>
