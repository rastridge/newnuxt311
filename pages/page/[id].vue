<template>
	<div>
		<Head>
			<Title>Buffalo Rugby Club {{ content_data.content_name }}</Title>
		</Head>
		<Common-header :title="content_data.content_name" />
		<div class="my-simple-card-style">
			<div
				class="my-text-style border-round-xl md:shadow-6 m-1 p-2 md:m-2 md:p-3 bg-blue-600 text-white"
			>
				<span v-html="content_data.content_body"></span>
			</div>
		</div>
	</div>
</template>

<script setup>
	//
	// Get content id parameter
	//
	const route = useRoute()
	const content_id = ref(route.params.id)
	//
	// Get custom page content
	//
	const {
		data: content_data,
		pending,
		error,
		refresh,
	} = await useFetch(`/content/${content_id.value}`, {
		initialCache: false,
		method: 'get',
	})
	//
	// make any images expand to width of container
	// should i do this when saving to db instead ?
	//
	/* 	content_data.value.content_body = content_data.value.content_body.replace(
		/\<img/g,
		'<img width="100%"'
	) */
</script>
