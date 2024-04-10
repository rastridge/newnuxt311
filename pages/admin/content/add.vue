<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitAdd } = useSubmit()

	//
	// Content form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('content', form_state)
		navigateTo(`/admin/content`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Custom page</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add custom page" />
			</div>
			<content-form @submitted="onSubmit" />
		</div>
	</div>
</template>
