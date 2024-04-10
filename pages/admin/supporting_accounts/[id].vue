<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitEdit } = useSubmit()

	//
	// Get sponsor id
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// leaders form action
	//
	const onSubmit = async function (state) {
		await onSubmitEdit('supporting_accounts', state)
		navigateTo(`/admin/supporting_accounts`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Supporting Accounts {{ id }}</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Edit Supporting Accounts" />
			</div>
			<supportingaccounts-form :id="id" @submitted="onSubmit" />
		</div>
	</div>
</template>
