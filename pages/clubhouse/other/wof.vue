<template>
	<div id="clubhouse">
		<Head>
			<Title>Buffalo Rugby Club Wall of Fame </Title>
		</Head>
		<div class="text-center">
			<common-header title="Virtual Clubhouse Wall of Fame" />
			<Button
				class="p-button-sm m-2"
				label="Return to Main Room"
				@click="navigateTo(`/clubhouse`)"
			>
			</Button>
		</div>
		<div
			class="flex flex-row flex-wrap align-items-center justify-content-center gap-3 p-4"
			style="
				background: url('https://media.buffalorugby.org/_img/_backgrounds/wood_clubhouse.jpg');
			"
		>
			<div
				v-for="item in wofdata"
				:key="item.id"
				class="text-center w-10rem h-10rem shadow-6 surface-400 border-2"
			>
				<div class="m-1 mt-2 text-lg font-semibold">
					<span>{{ item.member_wall_of_fame_year }}</span>
				</div>
				<img class="m-1" :src="item.member_pic_path" />
				<div class="m-1">{{ item.name }}</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	useHead({
		title: 'Buffalo Rugby Clubhouse',
	})
	const CONFIG = useRuntimeConfig()

	const wofdata = ref(null)

	const { data, pending, error, refresh } = await useFetch(`/accounts/getwof`, {
		method: 'get',
	})
	wofdata.value = data.value
</script>

<style scoped>
	.bg {
		background-image: url('/_img/_backgrounds/wood_clubhouse.jpg');
		/* Center and scale the image nicely */
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		padding: 2em;
	}
</style>
