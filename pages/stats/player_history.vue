<template>
	<div id="player-history">
		<Head>
			<Title>Buffalo Rugby Club Player History</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<CommonHeader title="Player game history" />
			</div>
			<div class="topsectionitem">
				<Card class="h-3 mb-2">
					<template #title> Player name</template>
					<template #content>
						<AutoComplete
							v-model="selectedItem"
							optionLabel="title"
							:suggestions="filteredNames"
							@complete="search"
							@item-select="getHistory"
						/>
					</template>
				</Card>
			</div>
		</div>
		<div class="my-simple-card-style">
			<div class="my-datatable-wrapper-style">
				<DataTable
					:value="history"
					dataKey="account_id"
					v-model:filters="filters"
					:globalFilterFields="['opponent_name']"
					class="p-datatable-sm my-text-style"
					striped-rows
					filterDisplay="row"
					paginator
					:rows="20"
					:rowsPerPageOptions="[5, 10, 20, 50]"
					paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
					currentPageReportTemplate="{first} to {last} of {totalRecords}"
					selectionMode="single"
				>
					<template #empty> No members found. </template>
					<template #loading> Loading Membership data. Please wait. </template>
					<Column header="Date" field="date" :showFilterMenu="true">
						<template #body="{ data }">
							{{ $dayjs(data.date).format('MMM D YYYY') }}
						</template>
						<template #filter="{ filterModel, filterCallback }">
							<InputText
								v-model="filterModel.value"
								type="text"
								@input="filterCallback()"
								class="p-column-filter"
								style="width: 6rem"
								placeholder="Search by date"
							/>
						</template>
					</Column>
					<Column
						header="Opponent"
						field="opponent_name"
						:showFilterMenu="true"
					>
						<template #body="{ data }">
							<Button link @click="openGameModal(data.game_id)">
								{{ data.opponent_name }}
							</Button>
						</template>
						<template #filter="{ filterModel, filterCallback }">
							<InputText
								v-model="filterModel.value"
								type="text"
								@input="filterCallback()"
								class="p-column-filter"
								style="width: 8rem"
								placeholder="Search by opponent"
							/>
						</template>
					</Column>
					<Column header="Venue" field="venue" :showFilterMenu="true">
						<template #body="{ data }">
							{{ data.venue }}
						</template>
						<template #filter="{ filterModel, filterCallback }">
							<InputText
								v-model="filterModel.value"
								type="text"
								@input="filterCallback()"
								style="width: 6rem"
								class="p-column-filter"
								placeholder="Search by venue"
							/>
						</template>
					</Column>
					<Column header="Occasion" field="occasion" :showFilterMenu="true">
						<template #body="{ data }">
							{{ data.occasion }}
						</template>
					</Column>
					<Column header="Level" field="game_level" :showFilterMenu="true">
						<template #body="{ data }">
							{{ data.game_level }}
						</template>
					</Column>
					<Column header="Type" field="game_type" :showFilterMenu="true">
						<template #body="{ data }">
							{{ data.game_type }}
						</template>
					</Column>
				</DataTable>
			</div>
		</div>
		<!-- Modal -->
		<Dialog
			v-model:visible="displayModal"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:style="{ width: '90vw' }"
			class="p-datatable-sm my-text-style"
			:pt="{
				root: {
					style: {
						padding: '0',
						minWidth: '10rem',
						'border-radius': '20px',
					},
				},
				header: {
					style: {
						'background-color': '#CCC',
					},
				},
				content: {
					style: {
						padding: '1rem',
						'background-color': '#EEE',
					},
				},
				footer: {
					style: {
						'background-color': '#CCC',
						padding: '1rem',
					},
				},
			}"
		>
			><template #header>{{ game.opponent_name }}</template>
			<display-game-info :item="game" />
			<display-roster :players="players" />
			<template #footer>
				<div>
					<Button
						label="Return"
						@click="closeModal"
						class="p-button-sm"
						autofocus
					/>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	import { FilterMatchMode } from 'primevue/api'

	//
	// for datatable
	//
	const history = ref([])
	const filters = ref({
		opponent_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
		date: { value: null, matchMode: FilterMatchMode.CONTAINS },
		venue: { value: null, matchMode: FilterMatchMode.CONTAINS },
	})
	const { $dayjs } = useNuxtApp()

	//
	// stuff for modal
	//
	const game = ref({})
	const players = ref([])

	const displayModal = ref(false)
	const openModal = () => {
		displayModal.value = true
	}
	const closeModal = () => {
		displayModal.value = false
	}
	const openGameModal = async (id) => {
		await getOne(id) // get game info
		await getPlayers(id) // get game info for players
		openModal()
	}
	const getPlayers = async (game_id) => {
		const url = `/game_player_stats/players/${game_id}`
		const { data, error } = await useFetch(url, {
			method: 'get',
		})
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not get data from ${url}`,
			})
		} else {
			players.value = data.value
		}
	}
	const getOne = async (id) => {
		const url = `/game_player_stats/${id}`
		const { data, error } = await useFetch(url, {
			method: 'get',
		})
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not get data from ${url}`,
			})
		} else {
			game.value = data.value
		}
	}
	//
	// get stuff for autocomplete
	//
	const selectedItem = ref('')
	const filteredNames = ref([])
	const { data: suggestions } = await useFetch(`/accounts/suggestions`, {
		method: 'get',
	})
	const search = (event) => {
		if (!event.query.trim().length) {
			filteredNames.value = [...suggestions.value]
		} else {
			filteredNames.value = suggestions.value.filter((suggestion) => {
				return (
					suggestion.title
						.toLowerCase()
						// .startsWith(event.query.toLowerCase())
						.includes(event.query.toLowerCase())
				)
			})
		}
	}

	//
	// Get player game history
	//
	const getHistory = async () => {
		const { data, pending, error, refresh } = await useFetch(
			`/game_player_stats/getplayergames/${selectedItem.value.account_id}`,
			{
				method: 'get',
			}
		)
		history.value = data.value
	}
</script>
