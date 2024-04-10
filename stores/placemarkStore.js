export const usePlacemarkStore = defineStore('placemark', {
	state: () => ({
		page: 0,
		alpha: '1',
		year: 0,
		season: 0,
		membertypeid: 2,
		gametypeid: 1,
	}),

	getters: {
		getPage: (state) => state.page,
		getAlpha: (state) => state.alpha,
		getMemberTypeId: (state) => state.membertypeid,
		getGameTypeId: (state) => state.gametypeid,
		getYear: (state) => state.year,
		getSeason: (state) => state.season,
	},

	actions: {
		initYear() {
			const { $dayjs } = useNuxtApp()
			this.year = parseInt($dayjs().format('YYYY'))
		},
		initSeason() {
			const { $dayjs } = useNuxtApp()
			const { SEASON_DIVIDE_DATE } = useRuntimeConfig()

			this.season =
				$dayjs().format() <
				$dayjs($dayjs().format('YYYY') + SEASON_DIVIDE_DATE).format()
					? parseInt($dayjs().format('YYYY')) - 1
					: parseInt($dayjs().format('YYYY'))
		},
		setPage(p) {
			this.page = p
		},
		setAlpha(a) {
			this.alpha = a
		},
		setYear(y) {
			this.year = y
		},
		setSeason(s) {
			this.season = s
		},
		setMemberTypeId(id) {
			this.membertypeid = id
		},
		setGameTypeId(id) {
			this.gametypeid = id
		},
	},
})
