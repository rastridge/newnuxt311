<script setup>
	definePageMeta({
		middleware: ['auth'],
	})

	const { onSubmitAdd } = useSubmit()

	//
	// News form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('news', form_state)
		navigateTo(`/admin/news`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add News Item</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add News Item" />
			</div>
			<news-form @submitted="onSubmit" />
		</div>
	</div>
</template>

<style scoped></style>
