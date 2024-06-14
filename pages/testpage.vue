<script setup>
const originaltitle = ref('from testpage')
const title = ref('originaltitle.value')

const share = function () {
	FB.ui({
		display: 'popup',
		method: 'share',
		href: 'https://buffalorugby.org/archives/news/page/1067',
	}, function (response) { });
}

</script>

<template>

	<div id="fb-root"></div>

	<p>Go there Go there Go there Go there</p>
	<!-- <testvmodel :modelValue="title" @update:modelValue="$event => (title = $event) " /> -->
	<testvmodel v-model="title" />
	<br>
	in testpage originaltitle = {{ originaltitle }}
	<br>
	in testpage title = {{ title }}
	<br>
	<br>

	<Button id="shareBtn" class="p-button-sm mb-1" label="Share Dialog" @click="share()"></Button>


	<!-- 	<div class="fb-share-button" data-href="https://buffalorugby.org/archives/news/page/1067" data-layout="" data-size="">
		<a target="_blank"
			href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fbuffalorugby.org%2Farchives%2Fnews%2Fpage%2F1067&amp;src=sdkpreparse"
			class="fb-xfbml-parse-ignore">Share</a>
	</div>

	<iframe
		src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fbuffalorugby.org%2Farchives%2Fnews%2Fpage%2F1067&layout&size&width=77&height=20&appId"
		width="77" height="20" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true"
		allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
 -->
</template>