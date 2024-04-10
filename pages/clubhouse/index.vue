<template>
	<div id="clubhouse">
		<Head>
			<Title>Buffalo Rugby Club Virtual Clubhouse </Title>
		</Head>
		<div>
			<common-header title="Virtual Clubhouse" />
		</div>

		<div class="bg">
			<div class="flex flex-wrap align-self-start justify-content-center">
				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-8rem md:w-10rem p-2"
				>
					<nuxt-link :to="`/clubhouse/other/wof`">
						<div class="container">
							<a> <img :src="DOOR" class="w-full" /></a>
							<span class="centered text-sm md:text-lg">Wall of Fame</span>
						</div>
					</nuxt-link>
				</div>
				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-8rem md:w-10rem p-2"
				>
					<div>
						<nuxt-link :to="`/clubhouse/room/photo`">
							<div class="container">
								<a> <img :src="DOOR" class="w-full" /></a>
								<div class="centered text-sm md:text-lg">Team Photos Room</div>
							</div>
						</nuxt-link>
					</div>
				</div>

				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-8rem md:w-10rem p-2"
				>
					<nuxt-link :to="`/clubhouse/room/trophy`">
						<a>
							<div class="container">
								<img :src="DOOR" class="w-full" />
								<div class="centered text-sm md:text-lg">Trophy Room</div>
							</div></a
						>
					</nuxt-link>
				</div>

				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-8rem md:w-10rem p-2"
				>
					<nuxt-link :to="'/clubhouse/room/plaque'">
						<div class="container">
							<a> <img :src="DOOR" class="w-full" /></a>
							<div class="centered text-sm md:text-lg">Plaques Room</div>
						</div>
					</nuxt-link>
				</div>

				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-8rem md:w-10rem p-2"
				>
					<nuxt-link :to="'/clubhouse/room/jersey'">
						<div class="container">
							<a> <img :src="DOOR" class="w-full" /></a>
							<div class="centered text-sm md:text-lg">Jerseys Room</div>
						</div>
					</nuxt-link>
				</div>

				<div
					class="flex flex-column justify-content-center text-sm md:text-lg font-semibold text-white w-6rem md:w-8rem md:w-10rem p-2"
				>
					<nuxt-link :to="'/clubhouse/room/ball'">
						<div class="container">
							<a> <img :src="DOOR" class="w-full" /></a>
							<div class="centered text-sm md:text-lg">Ball Room</div>
						</div>
					</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const CONFIG = useRuntimeConfig()

	// const apiurl = `${CONFIG.public.MEDIA_URL}`
	// const imagesurl = `${CONFIG.public.IMAGES_URL}/imgs/wood-door.png`

	const DOOR = `${CONFIG.public.IMAGES_URL}/imgs/wood-door.png`
</script>

<style scoped>
	.bg {
		background-image: url('https://media.buffalorugby.org/_img/_backgrounds/wood_clubhouse.jpg');
		/* background-image: url(`${CONFIG.public.IMAGES_URL}/_img/_backgrounds/wood_clubhouse.jpg`); */
		/* Center and scale the image nicely */
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		padding: 2em;
		padding-bottom: 5em;
	}

	/* Container holding the image and the text */
	.container {
		position: relative;
		text-align: center;
		color: rgb(219, 215, 215);
	}
	/* Centered text */
	.centered {
		position: absolute;
		top: 40%;
		left: 55%;
		transform: translate(-60%, -45%);
	}
</style>
