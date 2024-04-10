<template>
	<div class="historystreaks">
		<p class="my-text-style mt-1">Streaks</p>
		<table class="nowrap">
			<tr>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
			<tr v-for="item in historystreaks" :key="item.StartDate">
				<td>{{ item.result }}</td>
				<td>{{ item.Games }}</td>
				<td>
					{{ $dayjs.unix(item.StartDate).format('MMM D YYYY') }} ->
					{{ $dayjs.unix(item.EndDate).format('MMM D YYYY') }}
				</td>
			</tr>
		</table>
	</div>
</template>

<script setup>
	const historystreaks = ref({})
	const props = defineProps({
		opponent_id: { type: Number, required: true },
	})
	const url = `/game_player_stats/streaks/${props.opponent_id}`
	const { data, error } = await useFetch(url, {
		method: 'get',
	})
	if (error.value) {
		throw createError({
			...error.value,
			statusMessage: `Could not get data from ${url}`,
		})
	} else {
		historystreaks.value = data.value
	}
</script>
