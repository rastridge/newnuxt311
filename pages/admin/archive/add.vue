<template>
	<div>
		<Head>
			<Title>Add archive Item</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add archive Item" />
			</div>
			<archive-form @submitted="onSubmit" />
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	})

	const { onSubmitAdd } = useSubmit()

	//
	// archives form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('archive', form_state)
		navigateTo(`/admin/archive`)
	}
</script>
