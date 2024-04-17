<template>
	<div id="clubhouse">
		<Head>
			<Title>Buffalo Rugby Club Virtual Clubhouse</Title>
		</Head>
		<div class="text-center">
			<common-header title="Virtual Clubhouse" />
			<Button
				class="p-button-sm mb-3"
				label="Return to Main Room"
				@click="navigateTo(`/clubhouse`)"
			>
			</Button>
		</div>
		<div
			class="flex flex-row flex-wrap align-items-center justify-content-center pt-2 pb-2 gap-3"
			style="
				background: url('https://media.buffalorugby.org/_img/_backgrounds/wood_clubhouse.jpg');
			"
		>
			<div v-for="item in otherdata" :key="item.id" class="">
				<div
					class="w-25rem border-2"
					style="
						-webkit-box-shadow: 10px 9px 13px -5px rgba(0, 0, 0, 0.61);
						-moz-box-shadow: 10px 9px 13px -5px rgba(0, 0, 0, 0.61);
						box-shadow: 10px 9px 13px -5px rgba(0, 0, 0, 0.61);
					"
				>
					<img :src="item.clubhouse_filepath" class="w-25rem image-zoomable" />

					<div class="caption font-semibold">
						{{ item.clubhouse_description }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	useHead({
		title: 'Buffalo Rugby Clubhouse',
	})
	//
	// Get account id to edit
	//
	const route = useRoute()
	const room = ref(route.params.room)

	const otherdata = ref(null)

	const { data } = await useFetch(`/clubhouse/room/${room.value}`, {
		method: 'get',
	})
	otherdata.value = data.value

	// Find server code in folder Nuxt3-brc-media-api
</script>

<style scoped>
	.caption {
		background-image: url('https://media.buffalorugby.org/_img/_backgrounds/bronze.jpg');
		/* Center and scale the image nicely */
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		text-align: center;
		padding: 0.5em;
		-webkit-box-shadow: 10px 9px 13px -5px rgba(0, 0, 0, 0.61);
		-moz-box-shadow: 10px 9px 13px -5px rgba(0, 0, 0, 0.61);
		box-shadow: 10px 9px 13px -5px rgba(0, 0, 0, 0.61);
		font-size: small;
		font-weight: bold;
		color: black;
	}
</style>
