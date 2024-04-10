<template>
	<div class="w-10 lg:w-11 xl:w-9 mx-auto">
		<Menubar :model="menu_items">
			<template #start>
				<img alt="logo" src="~/assets/imgs/bflo_blue.png" height="40" />
			</template>
			<template #item="{ item, props, hasSubmenu }">
				<nuxt-link
					:to="item.route"
					class="text-800 hover:text-500 text-sm md:text-base md:text-lg"
				>
					<span class="ml-4"></span>
					<span :class="item.icon"></span>
					<span class="ml-2">{{ item.label }}</span>
					<span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
				</nuxt-link>
			</template>
		</Menubar>
	</div>
</template>

<script setup>
	const navigation = useNavigationMenu()
	const menu_items = navigation.navigationMenu()
</script>
