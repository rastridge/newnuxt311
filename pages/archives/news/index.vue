<template>
	<div id="archive-news">
		<Head>
			<Title>Buffalo Rugby Club News Archive </Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="News Archive" />
			</div>

			<div class="topsectionitem">
				<select-year
					:startyear="startyear"
					:currentyear="year"
					class="mb-3"
					@submitted="onSubmit"
				/>
			</div>
		</div>
		<div class="my-simple-card-style">
			<div>
				<ul class="list-none my-text-style">
					<li
						v-for="itm in year_data"
						:key="itm.id"
						class="cursor-pointer text-500 bg-white border-1 border-round-lg p-3 m-2"
					>
						<a href="#" @click="openModal(itm)">
							<span class="text-900 font-italic">{{
								$dayjs(itm.news_event_dt).format('MMM D, YYYY')
							}}</span>
							-
							<span class="text-900">{{ itm.title }}</span>
							<span class="text-xs md:text-sm text-blue-600 cursor-pointer">
								- Open</span
							>
						</a>
					</li>
				</ul>
			</div>
		</div>

		<!-- Modal -->
		<Dialog
			v-model:visible="displayModal"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
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
						padding: '1rem',
					},
				},
			}"
		>
			<template #header>
				<div class="font-semibold text-md lg:text-lg">
					{{ $dayjs(selectedItem.news_event_dt).format('MMM D, YYYY') }} -
					{{ selectedItem.news_title }}
				</div></template
			>
			<div class="text-sm" v-html="selectedItem.news_article"></div>

			<template #footer>
				<div>
					<Button
						label="Return"
						class="p-button-sm"
						autofocus
						@click="closeModal"
					/>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	//
	// Filter by year
	//
	const { $dayjs } = useNuxtApp()
	const year = ref(parseInt($dayjs().format('YYYY')))
	const startyear = 2004

	const onSubmit = (value) => {
		year.value = value
	}

	//
	// get year data for list
	//
	const year_data = ref([])

	const getYearOfNews = async (year) => {
		const { data } = await useFetch(`/news/year/${year}`, {
			method: 'get',
		})
		year_data.value = data.value
	}
	// getYearOfNewsletters(year.value)
	// get newsletters when  year changes
	watchEffect(() => getYearOfNews(year.value))

	//
	// Dialog initialization - display news item
	//
	const selectedItem = ref({})
	const displayModal = ref(false)
	const openModal = async (item) => {
		await getOne(item.id)

		displayModal.value = true
	}
	const closeModal = () => {
		displayModal.value = false
	}
	//
	// Get news
	//
	const getOne = async (id) => {
		const { data } = await useFetch(`/news/${id}`, {
			method: 'get',
		})
		selectedItem.value = data.value
	}
</script>
