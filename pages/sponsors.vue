<template>
	<div id="sponsors">
		<Head>
			<Title>Buffalo Rugby Club Sponsors</Title>
		</Head>
		<div class="center-content">
			<common-header title="Sponsors" />
		</div>
		<div class="my-simple-card-style">
			<Card v-for="item in sponsors" :key="item.id" class="my-card-style">
				<template #header>
					<span class="text-xl">{{ item.ad_client_name }}</span></template
				>
				<template #subtitle>
					<div class="flex flex-row flex-wrap">
						<div class="flex align-items-center justify-content-center w-10rem">
							<span class="text-white">{{ item.ad_client_contact }}</span>
						</div>
						<div class="flex align-items-center justify-content-center w-20rem">
							<span class="text-white"
								><expose-email :email="item.ad_client_email"
							/></span>
						</div>
					</div>
				</template>
				<template #content>
					<img :src="item.ad_image_path" class="responsive" />
				</template>
			</Card>
		</div>
	</div>
</template>

<script setup>
	//
	// Get current sponsors
	//
	const {
		data: sponsors,
		pending,
		error,
		refresh,
	} = await useFetch('/sponsors/getallcurrent', {
		method: 'get',
	})
</script>

<style scoped>
	.responsive {
		width: 100%;
		height: auto;
	}
</style>
