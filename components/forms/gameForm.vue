<template>
	<div class="my-form-style">
		<FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			v-model="state"
			submit-label="Submit Game"
			@submit="submitForm(state)"
		>
			<!-- opponent input-->
			<div v-if="(reset_opponent && !addForm) || addForm">
				<Card style="width: 25em; margin-bottom: 1rem">
					<template #title> Find opponent</template>
					<template #content>
						<AutoComplete
							v-model="selectedOpponent"
							optionLabel="opponent_name"
							:suggestions="filteredOpponents"
							@complete="search_opponents"
							@item-select="setOpponent"
						/>
						<p class="m-2">
							If the opponent for this game can not be found in the existing
							opponents list, you must first create the opponent<br />
							<Button
								class="p-button-sm mt-1"
								label="Create Opponent"
								@click="navigateTo('/admin/opponents/add')"
							>
							</Button>
						</p>
					</template>
				</Card>
			</div>
			<div v-if="!addForm" class="block text-900 font-medium mb-2">
				<label class="mr-2" for="reset_opponent">Change opponent</label>
				<Checkbox id="reset_opponent" v-model="reset_opponent" :binary="true" />
			</div>
			<FormKit
				label="Opponent"
				name="opponent_name"
				type="text"
				disabled="true"
			/>

			<!-- referee input-->
			<FormKit label="Referee" name="referee" type="text" />

			<!-- venue input-->
			<FormKit label="Venue" name="venue" type="text" validation="required" />

			<!-- Date input-->
			<FormKit type="date" label="Date" name="date" validation="required" />

			<!-- Time input-->
			<FormKit type="time" label="Time" name="time" validation="required" />

			<!-- Game Type input-->
			<FormKit
				type="select"
				label="Game type"
				placeholder="Select game type"
				name="game_type_id"
				:options="gametypes"
				validation="required"
			/>

			<!-- Game Level input-->
			<FormKit
				type="select"
				label="Game level"
				placeholder="Select game level"
				name="game_level"
				:options="[
					{ label: 'A', value: 'A' },
					{ label: 'B', value: 'B' },
					{ label: 'C', value: 'C' },
					{ label: 'D', value: 'D' },
				]"
				validation="required"
			/>
			<!-- Comment input-->
			<FormKit label="Comment" name="comment" type="text" />
			<!-- occasion input-->
			<FormKit label="Occasion" name="occasion" type="text" />
			<!-- points for input-->
			<FormKit label="Pts For" name="ptsFor" type="text" />
			<!-- points against input-->
			<FormKit label="Pts against" name="ptsAgn" type="text" />
			<display-cancelform :destination="'/admin/game_player_stats'" />
		</FormKit>

		<p v-if="saving">
			<ProgressBar mode="indeterminate" style="height: 6px"></ProgressBar>
			Saving ...
		</p>
	</div>
	<!-- if add OR game current date is before game date -->
	<div
		v-if="
			!props.id || (props.id && $dayjs().isBefore($dayjs.unix(state.date_ut)))
		"
	>
		<!-- Select previous game for autofill -->
		<div class="my-form-style">
			<label for="reset">
				<div class="p-2">
					Do you want to select roster from a previous game? All current game
					info will be replaced.
					<p v-if="!state.date_ut" style="color: red; padding: 1rem">
						To do so you must first set a date for this game
					</p>
				</div>
			</label>
			<div v-if="state.date_ut">
				Check here <br />
				Uncheck to Cancel
				<input
					id="reset"
					v-model="reset"
					type="checkbox"
					@input="resetPlayers()"
				/>
				<p style="color: red; padding: 2rem">
					Selecting another roster will replace existing players on this roster!
				</p>
				<div v-if="reset">
					<FormKit
						type="select"
						label="Select another roster"
						v-model="previous_game_id"
						placeholder="Select another roster"
						:options="previousgames"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- ------------ players table ------------------------- -- -->
	<div class="xs:w-full md:w-8 lg:w-6 mx-auto mt-4 my-text-style">
		<table
			v-if="players"
			style="
				border-collapse: collapse;
				border-spacing: 0;
				white-space: nowrap;
				overflow-x: auto;
			"
		>
			<tr>
				<th>Pos</th>
				<th>Player</th>
				<th>Tries</th>
				<th>Assts</th>
				<th>Conv</th>
				<th>PenK</th>
				<th>DrpG</th>
				<th>Yello</th>
				<th>Red</th>
				<th>Replaced by</th>
			</tr>
			<tbody>
				<tr v-for="(item, index) in players" :key="item.position_id">
					<td>
						{{ players[index].position_id }}
					</td>
					<td>
						<AutoComplete
							v-model="selectedPlayers[index]"
							:pt="{
								input: {
									class:
										'w-6rem md:w-8rem lg:w-10rem my-text-style h-1rem md:h-2rem',
								},
							}"
							optionLabel="title"
							:suggestions="filteredNames"
							@complete="search"
						/>
					</td>
					<td>
						<input v-model="players[index].tries" size="1" type="text" />
					</td>
					<td>
						<input v-model="players[index].assists" size="1" type="text" />
					</td>
					<td>
						<input v-model="players[index].conv" size="1" type="text" />
					</td>
					<td>
						<input v-model="players[index].penk" size="1" type="text" />
					</td>
					<td>
						<input v-model="players[index].dgoal" size="1" type="text" />
					</td>
					<td>
						<input v-model="players[index].yellow" size="1" type="text" />
					</td>
					<td>
						<input v-model="players[index].red" size="1" type="text" />
					</td>
					<td>
						<AutoComplete
							v-model="selectedReplacements[index]"
							optionLabel="title"
							:pt="{
								input: {
									class:
										'w-6rem md:w-8rem lg:w-10rem text-xs md:text-sm h-1rem md:h-2rem',
								},
							}"
							:suggestions="filteredNames"
							@complete="search"
						/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- Confirm deletion -->
	<Dialog
		v-model:visible="showReplaceDialog"
		:style="{ width: '450px' }"
		header="Confirm replacement"
		:modal="true"
	>
		<div class="confirmation-content">
			<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
			<span class="text-red-600"
				>Are you sure you want to replace this roster?</span
			>
		</div>

		<template #footer>
			<Button
				label="No"
				icon="pi pi-times"
				class="p-button-text"
				@click="showReplaceDialog = false"
			/>
			<Button
				label="Yes"
				icon="pi pi-check"
				class="p-button-text"
				@click="confirmedReplace(previous_game_id)"
			/>
		</template>
	</Dialog>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const { $dayjs } = useNuxtApp()
	const saving = ref(false)

	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])
	//
	// Incoming
	//
	const props = defineProps({
		id: { type: String, default: '0' },
	})

	// Reactive variables
	const showReplaceDialog = ref(false)
	const gametypes = ref([])
	const players = ref([])
	const state = ref({})
	const reset = ref('')
	const reset_opponent = ref(false)
	const pending_players = ref('')

	const addForm = ref(props.id === 0)

	//
	// Player name autocomplete
	//
	const selectedPlayers = ref([])
	const selectedReplacements = ref([])
	const filteredNames = ref([])
	const suggestions = ref([])
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
	// Opponent name autocomplete
	//
	const suggestions_opponents = ref([])
	const filteredOpponents = ref([])
	const selectedOpponent = ref('')
	const setOpponent = () => {
		state.value.opponent_id = selectedOpponent.value.opponent_id
		state.value.opponent_name = selectedOpponent.value.opponent_name
	}
	const search_opponents = (event) => {
		if (!event.query.trim().length) {
			filteredOpponents.value = [...suggestions_opponents.value]
		} else {
			filteredOpponents.value = suggestions_opponents.value.filter(
				(suggestion) => {
					return (
						suggestion.opponent_name
							.toLowerCase()
							// .startsWith(event.query.toLowerCase())
							.includes(event.query.toLowerCase())
					)
				}
			)
		}
	}

	//
	// Get other options for form
	//
	// Game types
	const {
		data: gt,
		error: error3,
		pending: pending_gametypes,
	} = await useFetch(`/game_player_stats/getgametypes`, {
		method: 'get',
		headers: {
			authorization: auth.user.token,
		},
		// lazy: true,
	})
	// if (!pending_gametypes) {
	// convert for formkit
	let result = []
	gt.value.map((old) => {
		let n = {}
		n.label = old.game_type
		n.value = old.game_type_id
		result.push(n)
	})
	gametypes.value = result
	// }
	// player names suggestions
	const {
		data: players_sug,
		error: error4,
		pending: pending_suggestions,
	} = await useFetch(`/accounts/suggestions`, {
		method: 'get',
		headers: {
			authorization: auth.user.token,
		},
		// lazy: true,
	})
	suggestions.value = players_sug.value

	// opponent names suggestions
	//
	const { data: opps_sug, error: error5 } = await useFetch(
		`/opponents/suggestions`,
		{
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		}
	)
	suggestions_opponents.value = opps_sug.value

	//
	//
	// edit if there is an id
	//
	if (props.id !== '0') {
		//
		// Initialize Edit form game area
		//
		const {
			data: game,
			pending: pending_game,
			error,
		} = await useFetch(`/game_player_stats/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
			// lazy: true,
		})

		// if (!pending_game) {
		state.value = game.value
		// convert date and time from unix time for FormKit inputs
		// for a day when date / time fields are dropped from the DB
		state.value.date = $dayjs.unix(state.value.date_ut).format('YYYY-MM-DD')
		state.value.time = $dayjs.unix(state.value.date_ut).format('HH:mm')

		// needs to be carried over because its not used in the form
		state.value.opponent_id = game.value.opponent_id
		// }
		//
		// Initialize Edit form Players area
		//
		const {
			data: p,
			error: error2,
			pending: pending_players,
		} = await useFetch(`/game_player_stats/players/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
			// lazy: true,
		})
		players.value = p.value

		// if (!pending_players.value) {
		// Special for Primevue AutoComplete
		players.value.forEach((value, index) => {
			selectedPlayers.value.push({
				account_id: value.player_id ? value.player_id : '0',
				member_firstname: value.pfn ? value.pfn : '',
				member_lastname: value.pln ? value.pln : '',
				title: value.pname ? value.pname : '',
			})
			selectedReplacements.value.push({
				account_id: value.replaced_by,
				member_firstname: value.rfn,
				member_lastname: value.rln,
				title: value.rname ? value.rname : '',
			})
		})
	} else {
		// add
		//
		// initialize blank Add form
		//
		// game
		state.value.opponent_id = ''
		state.value.referee = ''
		state.value.venue = 'Delaware Park'
		state.value.comment = ''
		state.value.date_ut = $dayjs().unix()
		state.value.date = $dayjs().format('YYYY-MM-DD')
		state.value.time = $dayjs().format('13:00')
		state.value.occasion = ''
		state.value.ptsFor = ''
		state.value.ptsAgn = ''

		// players
		for (let i = 0; i < 23; i++) {
			players.value.push({
				position_id: i + 1,
				player_id: '',
				pname: '',
				pfn: '',
				pln: '',
				replaced_by: '0',
				rname: '',
				rfn: '',
				rln: '',
				tries: '0',
				assists: '0',
				conv: '0',
				penk: '0',
				dgoal: '0',
				yellow: '0',
				red: '0',
			})
			// for Primevue autocomplete
			selectedPlayers.value.push({
				account_id: '',
				title: '',
				member_firstname: '',
				member_lastname: '',
			})
			selectedReplacements.value.push({
				account_id: '',
				title: '',
				member_firstname: '',
				member_lastname: '',
			})
		}
	}

	//
	// Replace Players
	//
	const previousgames = ref([])
	const previous_game_id = ref(0)
	const getPreviousGames = async (date_ut) => {
		const {
			data,
			error: error6,
			pending: pending6,
		} = await useFetch(`/game_player_stats/getprevious/${date_ut}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		// convert for formkit select previous games
		let result = []
		data.value.map((old) => {
			let n = {}
			n.label =
				$dayjs.unix(old.date_ut).format('YYYY-MM-DD') +
				' - ' +
				old.opponent_name +
				' Game level ' +
				old.game_level

			n.value = old.game_id
			result.push(n)
		})
		previousgames.value = result
	}
	//
	// insert opponent
	//
	const resetOpponent = () => {
		c
	}

	//
	// insert players from previous game
	//
	const resetPlayers = () => {
		reset.value = !reset.value
		if (reset.value) {
			getPreviousGames(state.value.date_ut)
		}
	}

	const confirmedReplace = (newid) => {
		showReplaceDialog.value = false
		getReplacePlayers(newid)
	}

	watch(previous_game_id, (newid, oldid) => {
		showReplaceDialog.value = true
	})

	const getReplacePlayers = async (game_id) => {
		const {
			data: rp,
			error,
			pending,
		} = await useFetch(`/game_player_stats/players/${game_id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})

		// Needed to reset player stats
		const replacementPlayers = rp.value.map((item) => {
			const plr = {}
			plr.position_id = item.position_id
			plr.player_id = item.player_id
			plr.pname = item.pname
			plr.rname = ''
			plr.replaced_by = '0'
			plr.tries = '0'
			plr.assists = '0'
			plr.conv = '0'
			plr.penk = '0'
			plr.dgoal = '0'
			plr.yellow = '0'
			plr.red = '0'
			return plr
		})

		selectedPlayers.value = []
		selectedReplacements.value = []
		replacementPlayers.forEach((value, index) => {
			// adjustment for AutoCompletes
			selectedPlayers.value.push({
				account_id: value.player_id ? value.player_id : '0',
				member_firstname: value.pfn ? value.pfn : '',
				member_lastname: value.pln ? value.pln : '',
				title: value.pname ? value.pname : '',
			})
			selectedReplacements.value.push({
				account_id: value.replaced_by,
				member_firstname: value.rfn,
				member_lastname: value.rln,
				title: value.rname ? value.rname : '',
			})
		})
		players.value = replacementPlayers
	}

	//
	// form handlers
	//
	const submitForm = (state) => {
		selectedPlayers.value.forEach((value, index, array) => {
			players.value[index].player_id = value.account_id
			players.value[index].pfn = value.member_firstname
			players.value[index].pln = value.member_lastname
			players.value[index].pname = value.title
		})
		selectedReplacements.value.forEach((value, index, array) => {
			players.value[index].replaced_by = value.account_id
			players.value[index].rfn = value.member_firstname
			players.value[index].rln = value.member_lastname
			players.value[index].rname = value.title
		})
		state.players = players.value
		state.date_ut = $dayjs(state.date + ' ' + state.time).unix()
		saving.value = true

		emit('submitted', state)
	}
</script>
