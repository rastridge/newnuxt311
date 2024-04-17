<template>
	<div>
		<Head>
			<Title>Buffalo Rugby Club {{ news_data.newsletter_subject }}</Title>
		</Head>
		<Common-header :title="news_data.newsletter_subject" />
		<div class="my-simple-card-style">
			<div
				class="my-text-style border-round-xl md:shadow-6 m-1 p-2 md:m-2 md:p-3 bg-blue-600 text-white"
			>
				<span v-html="news_data.newsletter_body_html"></span>
			</div>
		</div>
	</div>
</template>

<script setup>
	//
	// Get content id parameter
	//
	const route = useRoute()
	const news_id = ref(route.params.id)
	//
	// Get custom page content
	//
	const { data: news_data } = await useFetch(`/newsletters/${news_id.value}`, {
		method: 'get',
	})
</script>
