<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitEdit } = useSubmit()

	//
	// Get video id
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// Votes form action
	//
	const onSubmit = async function (state) {
		await onSubmitEdit('votes', state)
		navigateTo(`/admin/votes`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Votes {{ id }}</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Edit Votes" />
			</div>
			<votes-form :id="id" @submitted="onSubmit" />
		</div>
	</div>
</template>
