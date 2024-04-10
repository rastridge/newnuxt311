<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitAdd } = useSubmit()
	//
	// Get content item id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// content form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('contributions', form_state)
		navigateTo(`/admin/contributions`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Contribution</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add Contributions" />
			</div>
			<contributions-form @submitted="onSubmit" />
		</div>
	</div>
</template>
