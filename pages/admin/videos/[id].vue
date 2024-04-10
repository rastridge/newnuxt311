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
	// Videos form action
	//
	const onSubmit = async function (state) {
		await onSubmitEdit('videos', state)
		navigateTo(`/admin/videos`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Video {{ id }}</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Edit Video" />
			</div>
			<videos-form :id="id" @submitted="onSubmit" />
		</div>
	</div>
</template>
