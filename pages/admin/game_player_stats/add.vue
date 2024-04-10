<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitAdd } = useSubmit()

	//
	// Content form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('game_player_stats', form_state)
		navigateTo(`/admin/game_player_stats`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Game</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Add Game" />
			</div>
			<game-form @submitted="onSubmit" />
		</div>
	</div>
</template>
