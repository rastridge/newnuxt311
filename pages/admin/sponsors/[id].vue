<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()

	//
	// Get sponsor id
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// sponsors form action
	//
	const onSubmit = async function (state) {
		alert.clear()
		await onSubmitEdit('sponsors', state)
		if (alert.message === null) {
			navigateTo(`/admin/sponsors`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Sponsor {{ id }}</Title>
		</Head>
		<display-admin-header title="Sponsor" />

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Edit sponsor" />
			</div>
			<sponsors-form :id="id" @submitted="onSubmit" />
		</div>
	</div>
</template>
