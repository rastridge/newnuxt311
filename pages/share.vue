<script setup>
useSeoMeta({
	title: 'Buffalo  Rugby Club News',
	meta: [
		{
			hid: "description",
			name: "description",
			content:
				"testing News of the club",
		},
		{
			hid: 'author',
			name: 'author',
			content: 'BRC'
		},
		{
			hid: "keywords",
			name: "keywords",
			content: "buffalo rugby club"
		},
		//Open Graph
		{ hid: "og-type", property: "og:type", content: "website" },
		{
			hid: "og-title",
			property: "og:title",
			content: "Buffalo Rugby Club News",
		},
		{
			hid: "og-desc",
			property: "og:description",
			content:
				"testing News of the club",
		},
		{
			hid: "og-image",
			property: "og:image",
			content: "https://buffalorugby.org/bflo_blue.png",
		},
		{ hid: "og-url", property: "og:url", content: "https://buffalorugby.org/archives/news/page/1067" },
		{ hid: "t-type", name: "facebookcard", content: "summary_large_image" },
	]

})

const originaltitle = ref('from testpage')
const title = ref('originaltitle.value')

</script>

<template>


	<p>Go there Go there Go there Go there {{ title }}</p>
	<SocialShare network="facebook" :styled="true" :label="false"
		url="https://buffalorugby.org/archives/news/page/1067" />
</template>