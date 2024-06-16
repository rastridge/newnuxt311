<script setup>
const originaltitle = ref('from testpage')
const title = ref('originaltitle.value')

</script>

<template>


	<p>Go there Go there Go there Go there {{ title }}</p>
	<SocialShare network="facebook" :styled="true" :label="false"
		url="https://buffalorugby.org/archives/news/page/1067" />
</template>