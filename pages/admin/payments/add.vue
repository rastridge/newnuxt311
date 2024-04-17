<script setup>
	definePageMeta({
		middleware: ['auth'],
	})

	const { onSubmitAdd } = useSubmit()

	//
	// payments form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('payments', form_state)
		navigateTo(`/admin/payments`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add payment</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add payment" />
			</div>
			<payments-form @submitted="onSubmit" />
		</div>
	</div>
</template>
