<template>
	<div id="videos">
		<Head>
			<Title>Buffalo Rugby Club Videos </Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="Videos Archive" />
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
		<div v-if="videos.length" class="my-simple-card-style">
			<ul class="list-none my-text-style">
				<li
					v-for="itm in filteredData"
					:key="itm.video_id"
					class="cursor-pointer bg-white border-round-lg border-1 p-3 m-2"
					href="#"
					@click.prevent="selectItem(itm)"
				>
					<span class="font-italic">
						{{ $dayjs(itm.dt).format('YYYY MMM') }}
					</span>
					-
					<span class="font-semibold">
						{{ itm.video_title }}
					</span>
					-
					<span class="text-lg">
						{{ itm.video_synop }}
					</span>
					<span class="text-xs md:text-sm text-blue-600 cursor-pointer">
						- Open</span
					>
				</li>
			</ul>
		</div>
		<!-- Modal -->
		<Dialog
			v-model:visible="displayModal"
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
						padding: '1rem',
					},
				},
			}"
		>
			<template #header>
				<div>
					<h4>{{ item.video_title }}</h4>
				</div></template
			>
			<div>
				<!-- <div class="embed-responsive embed-responsive-16by9"> -->
				<iframe
					width="560"
					height="315"
					:src="video_url"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
				<!-- </div> -->
			</div>
			<template #footer>
				<div>
					<Button
						class="p-button-sm"
						autofocus
						label="Return"
						@click="closeModal"
					/>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	import { getIdFromURL } from 'vue-youtube-embed'
	const { $dayjs } = useNuxtApp()

	// initial values
	const year = ref(parseInt($dayjs().format('YYYY')))
	const startyear = 1985

	const filteredData = computed(() => {
		return videos.value.filter((d) => {
			return parseInt($dayjs(d.dt).format('YYYY')) === year.value
		})
	})
	const onSubmit = (value) => {
		year.value = value
	}

	const item = ref({})
	const video_url = ref('')
	//
	// Get current videos
	//
	const { data: videos } = await useFetch('/videos/getallcurrent', {
		method: 'get',
	})

	const selectItem = (item) => getOne(item.id)

	const getOne = async (id) => {
		const { data } = await useFetch('/videos/' + id, {
			method: 'get',
		})

		item.value = data.value
		if (item.value.video_url.includes('yout')) {
			video_url.value =
				'https://www.youtube.com/embed/' + getIdFromURL(item.value.video_url)
			openModal()
		} else {
			const url = item.value.video_url
			window.open(url)
		}
	}

	//
	// video modal
	//
	const displayModal = ref(false)
	const openModal = () => {
		displayModal.value = true
	}
	const closeModal = () => {
		displayModal.value = false
	}
</script>
