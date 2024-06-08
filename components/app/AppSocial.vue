<template>
	<div class="">
		<ul class="flex lg:w-10 xl:w-8 mx-auto">
			<li>
				<Button link class="my-text-style text-white hover:text-blue-200" @click="redirectToFacebook">
					<i class="pi pi-facebook my-text-style" />
					<span>facebook 15s</span>
				</Button>
			</li>

			<li>
				<Button link class="my-text-style text-white hover:text-blue-200" @click="redirectToFacebook7">
					<i class="pi pi-facebook my-text-style" />
					<span>facebook 7s</span>
				</Button>
			</li>


			<li>
				<Button link class="my-text-style text-white hover:text-blue-200" @click="redirectToYoutube">
					<i class="pi pi-youtube my-text-style" />
					<span>youtube</span>
				</Button>
			</li>
			<li>
				<Button link class="my-text-style text-white hover:text-blue-200" @click="redirectToInstagram">
					<i class="pi pi-instagram my-text-style" />
					<span>instagram</span>
				</Button>
			</li>
			<li>
				<Button link class="my-text-style text-white hover:text-blue-200" @click="redirectToRegister">
					<i class="pi pi-user-plus my-text-style" />
					<span>Join Men</span>
				</Button>
			</li>
			<li>
				<Button link class="my-text-style text-white hover:text-blue-200" @click="redirectToFlagRegister">
					<i class="pi pi-user-plus my-text-style" />
					<span>Join Youth</span>
				</Button>
			</li>
		</ul>
	</div>
</template>

<script setup>
function redirectToFacebook(event) {
	window.open('https://www.facebook.com/BuffaloRugbyClub/', '_blank')
}
function redirectToFacebook7(event) {
	window.open('https://www.facebook.com/EastLakeErieHawaiians/', '_blank')
}
function redirectToTwitter(event) {
	window.open('https://twitter.com/BuffaloRFC', '_blank')
}
function redirectToYoutube(event) {
	window.open('https://youtube.com/buffalorugby', '_blank')
}
function redirectToInstagram(event) {
	window.open('https://instagram.com/buffalorugbyclub', '_blank')
}
function redirectToRegister(event) {
	navigateTo('/register')
}
function redirectToFlagRegister(event) {
	navigateTo('/registerflag')
}
</script>

<style scoped>
ul {
	list-style: none;
}

i {
	font-size: 0.7rem;
	margin-right: 0.2rem;
}
</style>
