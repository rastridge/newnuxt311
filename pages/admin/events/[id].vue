<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()

	//
	// Get news item id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// News form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitEdit('events', form_state)
		navigateTo(`/admin/events`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit event{{ id }}</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Edit Events" />
			</div>
			<events-form :id="id" @submitted="onSubmit" />
		</div>
	</div>
</template>
