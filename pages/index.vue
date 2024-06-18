<template>
	<div class="pt-5">
		<Carousel :value="images" :numVisible="1" circular :autoplayInterval="6000">
			<template #item="slotProps">
				<div class="text-center">
					<img :src="slotProps.data.url" class="w-full" />
				</div>
			</template>
		</Carousel>
		<!-- 		<Card class="h-20rem flex justify-content-center">
			<template #content>
				<div class="w-full surface-500">
					<span class="font-bold text-lg">Club News</span>
					<Menu
						:model="items"
						class="w-20rem"
						style="background-color: transparent"
					/>
				</div>
			</template>
		</Card>
		<Card class="w-full h-20rem bg-white">
			<template #content>
				<span class="text-center font-bold text-lg"
					>Games - Latest and Past Schedule and Results</span
				>
			</template>
		</Card>
		<Card class="w-full h-20rem bg-white">
			<template #content>
				<span class="text-center font-bold text-lg"
					>Participate - Join the oldest and biggest - Compete at the highest
					level</span
				>
			</template>
		</Card> -->
	</div>
</template>

<script setup>
useSeoMeta({
	title: 'Buffalo Rugby Club News',
	ogTitle: 'Buffalo Rugby Club Website',
	description: 'Everything you want to know about the Buffalo Rugby Club',
	ogDescription: 'Everything you want to know about the Buffalo Rugby Club',
	ogImage: 'https://buffalorugby.org/bflo_blue.png',
	ogUrl: 'https://buffalorugby.org/'
})

import screen1 from '~/assets/imgs/carousel/2019_nyrc.jpg'
import screen2 from '~/assets/imgs/carousel/2021NYRCMike.png'
import screen3 from '~/assets/imgs/carousel/AST_1629.png'
import screen4 from '~/assets/imgs/carousel/AST_1945.png'
import screen5 from '~/assets/imgs/carousel/AST_6696.png'
import screen6 from '~/assets/imgs/carousel/madison.jpeg'
import screen7 from '~/assets/imgs/carousel/DSC_4148.png'
import screen8 from '~/assets/imgs/carousel/DSC_5371.png'
import screen9 from '~/assets/imgs/carousel/team.png'
import screen10 from '~/assets/imgs/carousel/Version 2.png'

const images = ref([
	{ id: 1, url: screen1 },
	{ id: 2, url: screen2 },
	{ id: 3, url: screen3 },
	{ id: 4, url: screen4 },
	{ id: 5, url: screen5 },
	{ id: 6, url: screen6 },
	{ id: 7, url: screen7 },
	{ id: 8, url: screen8 },
	{ id: 9, url: screen9 },
	{ id: 10, url: screen10 },
])
const items = ref([
	{ label: 'Latest', icon: 'pi pi-plus' },
	{ label: 'Events', icon: 'pi pi-plus' },
])
</script>