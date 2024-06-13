<template>
	<div>

		<Head>
			<Title>Buffalo Rugby Club {{ news_data.news_title }}</Title>
		</Head>
		<Common-header :title="news_data.news_title" />
		<div class="my-simple-card-style">
			<div class="my-text-style border-round-xl md:shadow-6 m-1 p-2 md:m-2 md:p-3">
				<span v-html="news_data.news_article"></span>
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
const { data: news_data } = await useFetch(`/news/${news_id.value}`, {
	method: 'get',
})
</script>