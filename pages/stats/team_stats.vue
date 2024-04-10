<template>
	<div id="team_stats">
		<Head>
			<Title>Buffalo Rugby Club Team Record</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="Team Record" />
			</div>
			<div class="topsectionitem">
				<p class="my-header-style">All Time</p>
				<select-game-type
					:currenttype="gametype"
					@submitted="onSubmitGameType"
				/>
			</div>
			<div v-if="!record || !total" class="topsectionitem">Loading ...</div>
		</div>
		<div class="my-simple-card-style">
			<div v-if="total" style="overflow-x: auto">
				<table class="nowrap">
					<thead>
						<tr>
							<th class="text-center">Games</th>
							<th class="text-center">Wins</th>
							<th class="text-center">Losses</th>
							<th class="text-center">Ties</th>
							<th class="text-center">Unknown</th>
							<th class="text-center">Win%</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="text-center">{{ total.game_count }}</td>
							<td class="text-center">{{ total.wins }}</td>
							<td class="text-center">{{ total.losses }}</td>
							<td class="text-center">{{ total.ties }}</td>
							<td class="text-center">{{ total.unknown }}</td>
							<td class="text-center">
								{{
									(
										(total.wins / (total.game_count - total.unknown)) *
										100
									).toFixed(0)
								}}
								%
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="my-simple-card-style">
				<div class="my-datatable-wrapper-style">
					<DataTable
						:value="record"
						class="p-datatable-sm my-text-style"
						rowHover
					>
						<Column field="season" header="Season">
							<template #body="slotProps">
								{{ slotProps.data.season }}
							</template>
						</Column>
						<Column field="game_count" header="Games"></Column>
						<Column field="wins" header="Wins"></Column>
						<Column field="losses" header="Losses"></Column>
						<Column field="ties" header="Ties"></Column>
						<Column field="unknown" header="Unknown"></Column>
						<Column header="Win%">
							<template #body="slotProps">
								{{
									(
										(slotProps.data.wins /
											(slotProps.data.game_count - slotProps.data.unknown)) *
										100
									).toFixed(0)
								}}
								%
							</template></Column
						>
					</DataTable>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	//
	// get initial 15s data
	//
	const gametype = ref(1)
	const record = ref([])
	const total = ref([])

	const getRecord = async (gt) => {
		const url = `/game_player_stats/getteamstats/${gt}`
		const { data, pending, error } = await useFetch(url, {
			method: 'get',
		})
		return data.value
	}

	const getTotals = async (gt) => {
		const url = `/game_player_stats/getteamstatstotal/${gt}`
		const { data, error: error2 } = await useFetch(url, {
			method: 'get',
		})
		return data.value
	}

	record.value = await getRecord(gametype.value)
	total.value = await getTotals(gametype.value)

	//
	// get new data on change of gametype
	//
	const onSubmitGameType = async (value) => {
		record.value = await getRecord(value)
		total.value = await getTotals(value)
	}
</script>

<style scoped>
	table {
		width: 100%;
		border-collapse: collapse;
		border: 1px solid;
		padding: 1rem;
		background-color: white;
	}

	th,
	td {
		text-align: center;
		padding: 0.5rem;
	}
</style>
