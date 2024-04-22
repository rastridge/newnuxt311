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
				<!-- 				<template #header>
					<span class="md:text-xl font-semibold">{{
						$dayjs(item.event_dt).format('MMM D, YYYY')
					}}</span>
				</template>
				<template #subtitle>
					<span class="md:text-xl font-semibold">{{
						item.title
					}}</span></template
				> -->
				<template #content>
					<p class="md:text-xl font-semibold">
						{{ $dayjs(item.event_dt).format('MMM D, YYYY') }}
					</p>
					<p class="md:text-xl font-semibold">{{ item.title }}</p>

					<p class="md:text-lg">
						{{ item.event_description }} LOCATION: {{ item.event_location }}
					</p></template
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
