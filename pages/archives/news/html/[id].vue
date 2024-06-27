<template>
  <p>{{ news_data.news_article }}</p>
</template>

<script setup>
  setPageLayout('')
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
