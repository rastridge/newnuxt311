<template>
	<div id="schedule">
		<Head>
			<Title>Buffalo Rugby Club Schedule and Results</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="Game Schedule and Results" />
			</div>

			<div class="topsectionitem">
				<select-season
					:startyear="startyear"
					:currentyear="season"
					class="mb-3"
					@submitted="onSubmit"
				/>

				<select-game-type
					:currenttype="gametype"
					class="mb-3"
					@submitted="onSubmitGameType"
				/>
			</div>

			<div class="my-simple-card-style w-full md:w-10">
				<DataView :value="filteredData">
					<template #list="slotProps">
						<div
							v-for="(item, index) in slotProps.items"
							:key="index"
							class="col-12"
						>
							<div
								class="flex flex-column md:flex-row justify-content-between align-items-center xl:align-items-center gap-2 mb-2 p-3 border-round-md shadow-4 bg-blue-700 text-white font-semibold"
							>
								<!-- left -->
								<div
									class="flex flex-row justify-content-center md:flex-column align-items-center md:align-items-start gap-3 border-soli w-full md:w-3"
								>
									<div class="flex align-items-end border-soli">
										<span
											class="text-sm md:text-md lg:text-lg font-bold text-white"
										>
											{{ $dayjs.unix(item.date_ut).format('ddd MMMM D YYYY')
											}}<br />
											{{ $dayjs.unix(item.date_ut).format('h:mm A') }}
											EDT
											<br />
										</span>
									</div>

									<div class="flex align-items-center border-soli">
										<span class="font-semibold"
											>{{ getGameLevelCode(item) }} Side
										</span>
									</div>

									<div class="flex align-items-center border-soli">
										<span class="font-semibold">{{ item.game_type }}</span>
									</div>
								</div>

								<!-- center stuff-->
								<div
									class="flex flex-column align-items-center gap-1 border-soli w-full md:w-6"
								>
									<div class="flex align-items-center border-soli">
										<Button
											:label="item.title"
											text
											class="cursor-pointer text-2xl md:text-3xl text-gray-300 shadow-4 font-bold"
											@click.prevent="showGame(item.game_id)"
										/>
									</div>
									<div class="flex align-items-center border-soli">
										<span class="text-2xl font-semibold">
											{{ getResultCode(item) }} &nbsp;&nbsp;&nbsp;
											{{ item.ptsFor }} - {{ item.ptsAgn }}</span
										>
									</div>
								</div>

								<!-- right aligned stuff -->
								<div
									class="flex flex-row justify-content-center md:flex-column align-items-center md:align-items-start gap-2 border-soli w-full md:w-3"
								>
									<div class="flex align-items-center gap-3 border-soli">
										<span class="text-sm md:text-md lg:text-lg font-bold"
											>@ {{ item.venue }}</span
										>
									</div>
									<div class="flex align-items-center border-soli">
										<span>
											{{ item.occasion }}
										</span>
									</div>
									<div class="flex align-items-center border-soli">
										<Button
											label="Show history"
											class="cursor-pointer font-semibold text-gray-300 shadow-4"
											text
											size="small"
											@click="showHistory(item.opponent_id)"
										/>
										<span class="text-sm text-700">
											{{ item.game_id }}
										</span>
									</div>
								</div>
							</div>
						</div>
					</template>
				</DataView>
				<roster-chart />
			</div>
		</div>

		<!-- Game Modal -->
		<Dialog
			v-model:visible="displayGameModal"
			:breakpoints="{ '900px': '75vw', '640px': '90vw' }"
			:style="{ width: '60vw' }"
		>
			<template #header>
				<div>
					<span class="text-lg font-semibold"
						>{{ info.opponent_name }} -
						{{
							$dayjs.unix(info.date_ut).format('MMMM DD, YYYY @ ddd h:mm A')
						}}</span
					>
					<h6 class="m-2 text-xl" />
				</div>
			</template>
			<div class="m-1 p-1 text-sm">
				<display-game-info :item="info" />
				<display-roster :players="players" />
			</div>
			<template #footer>
				<div>
					<Button
						label="Return"
						class="p-button-sm mt-2"
						autofocus
						@click="closeModal"
					/>
				</div>
			</template>
		</Dialog>

		<!-- 	<Dialog
			v-model:visible="displayGameModal"
			:breakpoints="{ '900px': '75vw', '640px': '90vw' }"
			:style="{ width: '60vw' }"
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
					},
				},
			}"
		>
			<template #header>
				<div>
					<span class="text-lg font-semibold"
						>{{ info.opponent_name }} -
						{{
							$dayjs.unix(info.date_ut).format('MMMM DD, YYYY @ ddd h:mm A')
						}}</span
					>
					<h6 class="m-2 text-xl"></h6>
				</div>
			</template>
			<div class="m-1 p-1 text-sm">
				<display-game-info :item="info" />
				<display-roster :players="players" />
			</div>
			<template #footer>
				<div>
					<Button
						label="Return"
						@click="closeModal"
						class="p-button-sm mt-2"
						autofocus
					/>
				</div>
			</template>
		</Dialog>
 -->
		<!-- History Modal -->
		<Dialog
			v-model:visible="displayHistoryModal"
			:breakpoints="{ '900px': '75vw', '640px': '90vw' }"
			:style="{ width: '60vw' }"
		>
			<template #header>
				<div>
					<span class="text-lg font-semibold ml-5">History</span>
				</div>
			</template>
			<div class="m-1 p-1 text-sm">
				<display-history :opponent_id="opponent_id" />
				<display-records :opponent_id="opponent_id" />
				<display-streaks :opponent_id="opponent_id" />
			</div>
			<template #footer>
				<div>
					<Button
						label="Close"
						class="p-button-sm mt-2"
						autofocus
						@click="closeHistoryModal"
					/>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	import { usePlacemarkStore } from '~/stores/placemarkStore'
	const { $dayjs } = useNuxtApp()
	const placemark = usePlacemarkStore()
	const { getGameLevelCode, getResultCode } = useGames()
	// Initialize year select
	//
	const startyear = 1966
	// set to season by year
	placemark.initSeason()
	const season = ref(placemark.getSeason)
	// getSeason games
	//
	const games = ref([])
	const getSeason = async (season) => {
		const url = `/game_player_stats/getseason/${season}`
		const { data, error } = await useFetch(url, {
			method: 'get',
		})
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not get data from ${url}`,
			})
		}

		// date and time from unix time
		// data.value.date_ut
		data.value.combined = $dayjs.unix(data.value.date_ut)
		return data.value
	}

	// initial games
	//
	games.value = await getSeason(season.value)

	// set gametype after drop down choice
	//
	const gametype = ref(1)
	const onSubmitGameType = (value) => {
		gametype.value = value
	}

	// get season from dropdown
	//
	const onSubmit = async (s) => {
		season.value = s
		games.value = await getSeason(s)
	}

	// filter by game type
	//
	const filteredData = computed(() => {
		return games.value.filter((d) => {
			if (gametype.value === 7) {
				return d.game_type_id === 7
			} else {
				return d.game_type_id !== 7
			}
		})
	})

	// game info modal
	//
	const info = ref(null)
	const players = ref(null)
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
		const { data } = await useFetch(url, {
			method: 'get',
		})

		info.value = data.value
	}
	const displayGameModal = ref(false)
	const openModal = () => {
		displayGameModal.value = true
	}
	const closeModal = () => {
		displayGameModal.value = false
	}
	const showGame = async (id) => {
		await getOne(id)
		await getPlayers(id)
		openModal()
	}
	//
	// history modal
	//
	const opponent_id = ref(null)
	const displayHistoryModal = ref(false)

	const openHistoryModal = () => {
		displayHistoryModal.value = true
	}
	const closeHistoryModal = () => {
		displayHistoryModal.value = false
	}
	const showHistory = (id) => {
		opponent_id.value = id
		openHistoryModal()
	}
</script>
