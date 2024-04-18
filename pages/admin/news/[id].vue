<script setup>
	definePageMeta({
		middleware: ['auth'],
	})

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
		await onSubmitEdit('news', form_state)
		navigateTo(`/admin/news`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit News Item {{ id }}</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Edit News Item" />
			</div>
			<news-form :id="id" @submitted="onSubmit" />
		</div>
	</div>
</template>
