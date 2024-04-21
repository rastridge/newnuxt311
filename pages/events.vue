<template>
	<div id="event">
		<Head>
			<Title>Buffalo Rugby Club Events</Title>
		</Head>
		<div class="center-content">
			<common-header title="Events" />
		</div>
		<div class="my-simple-card-style">
			<Card
				v-for="item in events"
				:key="item.id"
				class="flex justify-content-left"
			>
				<template #header>
					{{ $dayjs(item.event_dt).format('MMM D, YYYY') }}
				</template>
				<template #subtitle>
					<span class="text-xl text-white font-semibold">{{
						item.title
					}}</span></template
				>
				<template #content
					>{{ item.event_description }} LOCATION:
					{{ item.event_location }}</template
				>
			</Card>
		</div>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()

	//
	// Get current news
	//
	const { data: events } = await useFetch('/events/getallcurrent', {
		method: 'get',
	})
</script>
