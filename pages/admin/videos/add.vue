<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitAdd } = useSubmit()

	const onSubmit = async function (state) {
		await onSubmitAdd('videos', state)
		navigateTo(`/admin/videos`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add Video</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add Video" />
			</div>
			<videos-form @submitted="onSubmit" />
		</div>
	</div>
</template>
