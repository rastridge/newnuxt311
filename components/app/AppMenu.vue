<template>
	<div class="w-10 lg:w-11 xl:w-9 mx-auto">
		<Menubar :model="menu_items">
			<template #start>
				<img alt="logo" src="~/assets/imgs/bflo_blue.png" height="40" />
			</template>
			<template #item="{ item, props, hasSubmenu }">
				<nuxt-link :to="item.route">
					<span class="ml-2 text-700 text-sm md:text-base lg:text-lg">{{
						item.label
					}}</span>

					<span v-if="!hasSubmenu" class="mr-2 ml-2" />

					<span
						v-if="hasSubmenu"
						class="pi pi-fw pi-angle-down ml-1 mr-2 md:mr-4 lg:mr-6"
					/>
				</nuxt-link>
			</template>
		</Menubar>
	</div>
</template>

<script setup>
	const navigation = useNavigationMenu()
	const menu_items = navigation.navigationMenu()
</script>

ml-2 md:ml-2 lg:ml-6
