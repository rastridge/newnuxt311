<template>
	<div id="sponsorad">
		<div class="my-simple-card-style w-full">
			<div v-if="item">
				<a :href="item.ad_client_website" target="_blank">
					<img :src="item.ad_image_path" style="width: 100%" />
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	const route = useRoute()

	const item = ref(null)

	watch(
		() => route.fullPath,
		async () => {
			showRandomSponsor()
		}
	)

	onMounted(async () => {
		showRandomSponsor()
	})

	const showRandomSponsor = async () => {
		const getRandomInt = (min, max) => {
			min = Math.ceil(min)
			max = Math.floor(max)
			return Math.floor(Math.random() * (max - min + 1)) + min
		}

		const { data: adIds } = await useFetch('/sponsors/getids', {
			method: 'get',
		})

		const adIdIndex = await getRandomInt(0, adIds.value.length)

		item.value = getOne(adIds.value[adIdIndex].id)
	}

	const getOne = async (id) => {
		//
		// Get one sponsors data
		//
		const { data } = await useFetch(`/sponsors/${id}`, {
			method: 'get',
		})
		item.value = data.value
	}
</script>
