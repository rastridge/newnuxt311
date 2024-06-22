<script setup>
  /* useSeoMeta({
	title: 'Buffalo Rugby Club News',
	ogTitle: 'Buffalo Rugby Club Website',
	description: 'Everything you want to know about the Buffalo Rugby Club',
	ogDescription: 'Everything you want to know about the Buffalo Rugby Club',
	ogImage: 'https://buffalorugby.org/bflo_blue.png',
}) */

  // const originaltitle = ref('from testpage')
  // const title = ref('originaltitle.value')
  const url = ref(useRequestURL())
</script>

<template>
  <div>
    ur= {{ url }}
    <p>Go there Go there Go there Go there {{ title }}</p>
    <SocialShare
      network="facebook"
      :styled="true"
      :label="false"
      url="https://buffalorugby.org/archives/news/page/1067"
    />
  </div>
</template>
