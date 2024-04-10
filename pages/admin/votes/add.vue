<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitAdd } = useSubmit()

	const onSubmit = async function (state) {
		await onSubmitAdd('votes', state)
		navigateTo(`/admin/votes`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add Vote</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add vote" />
			</div>
			<votes-form @submitted="onSubmit" />
		</div>
	</div>
</template>
