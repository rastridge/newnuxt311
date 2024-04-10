<template>
	<div>
		<Head>
			<Title>Stats Admin</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>

			<div>
				<!--Select season -->
				<div class="topsectionitem">
					<select-season
						:startyear="startyear"
						:currentyear="season"
						@submitted="onSubmit"
						class="mb-3"
					/>

					<select-game-type
						:currenttype="gametype"
						@submitted="onSubmitGameType"
					/>
				</div>
			</div>
			<div>
				<render-list
					:data="filteredData"
					:page="page"
					:app="app"
					:statusable="statusable"
					:editable="editable"
					:deleteable="deleteable"
					:addable="addable"
					:viewable="viewable"
					@changeStatus="changeStatus"
					@deleteItem="deleteItem"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	})

	import { usePlacemarkStore } from '~/stores/placemarkStore'
	const placemark = usePlacemarkStore()

	// initialize renderlist
	//
	const { getAccess } = useRenderListAccess()
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const app = 'game_player_stats'
	const page = ref(placemark.getPage)

	// Initialize year select
	//
	const startyear = 1966
	const season = ref(placemark.getSeason)

	// select Game type
	//
	const gametype = ref(placemark.getGameTypeId)

	const filteredData = computed(() => {
		return stats.value.filter((d) => {
			if (gametype.value === 7) {
				return d.game_type_id === 7
			} else {
				return d.game_type_id !== 7
			}
		})
	})

	// Save current after changes
	watch(gametype, (newgametype) => {
		placemark.setGameTypeId(newgametype)
		placemark.setPage(0)
		page.value = 0
	})

	//
	// get season data
	//
	const stats = ref([])
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
		} else {
			// date and time from unix time
			data.value.dt = '0000'
			stats.value = data.value
		}
	}

	// get current season on initial load
	//
	await getSeason(season.value)

	//
	// set season after drop down choice
	//
	const onSubmit = async function (season) {
		placemark.setSeason(season)
		placemark.setPage(0)
		page.value = 0
		await getSeason(season)
	}

	// set gametype after drop down choice
	//
	const onSubmitGameType = async function (value) {
		gametype.value = value
		placemark.setGameTypeId(gametype.value)
	}

	// Renderlist actions
	//
	const { deleteOne, changeStatusOne } = useFetchAll()

	const deleteItem = async (id) => {
		await deleteOne(app, id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne(app, { id, status })
	}
</script>
