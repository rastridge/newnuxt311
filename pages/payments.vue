<template>
	<div id="payments">
		<Head>
			<Title>Buffalo Rugby Club Payments</Title>
		</Head>
		<div class="center-content">
			<common-header title="Payments" />
		</div>

		<div
			class="my-simple-card-style flex flex-column md:flex-row flex-wrap align-items-center md:align-items-start justify-content-center"
		>
			<Card
				v-for="item in payments"
				:key="item.id"
				style="width: 320px"
				class="flex justify-content-center"
			>
				<!-- <template #header> {{ item.title }}</template> -->
				<template #title>
					<span>{{ item.title }}</span></template
				>
				<template #content>
					<span v-html="item.payment_paypal_button"></span
				></template>
			</Card>
		</div>
	</div>
</template>

<script setup>
	//
	// Get current news
	//
	const { data: payments } = await useFetch('/payments/getallcurrent', {
		method: 'get',
	})
</script>
