<template>
	<div class="flex justify-content-center" style="color: rgb(210, 0, 0)">
		<div class="flex align-items-center justify-content-center">
			<span
				style="letter-spacing: 0.1em; font-family: sans-serif"
				class="text-5xl md:text-7xl lg:text-7xl xl:text-8xl uppercase font-bold font-itali"
				>Buffalo</span
			>
		</div>
		<div class="flex align-items-center justify-content-center">
			<img :src="bfloblue" class="w-6rem md:w-10rem lg:w-12rem xl:w-16rem" />
		</div>
		<div class="flex align-items-center justify-content-center">
			<span
				style="letter-spacing: 0.1em; font-family: sans-serif"
				class="text-5xl md:text-7xl lg:text-7xl xl:text-8xl uppercase font-bold"
				>Rugby</span
			>
		</div>
	</div>
	<p class="text-center text-sm md:text-lg lg:text-xl text-white">
		Home Field Delaware Park | Meet up KO's Bar and Grill
	</p>
</template>

<script setup>
	import bfloblue from '~/assets/imgs/bflo_blue.png'
</script>
