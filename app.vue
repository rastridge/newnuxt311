<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="10" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  import { useMenuStore } from '~/stores/menuStore'
  const menuStore = useMenuStore()

  useHead({
    title: 'The Buffalo Rugby Club',
  })

  useSeoMeta({
    title: 'The Buffalo Rugby Club',
    url: 'localhost:3000/archives/news/html/1067',

    ogTitle: 'The Buffalo Rugby Club',
    description: 'Welcome to the Buffalo Rugby Club',
    ogDescription: 'News',
    ogUrl:
      'https://experimental--buffalorugbyorg.netlify.app//archives/news/html/1067',
    ogImage: 'https://experimental--buffalorugbyorg.netlify.app//bflo_blue.png',
  })

  /*   useSeoMeta({
      title: 'The Buffalo Rugby Club',
      ogUrl: 'https://buffalorugby.org/archives/news/page/1068',

      ogType: 'article',
      ogTitle: 'When Great Minds Don’t Think Alike',
      ogDescription: 'Buffalo Rugby Club News',
      ogImage: 'https://buffalorugby.org/bflo_blue.png',
    }) */
  //
  // get custom menu items
  await menuStore.initCustomMenuItems()

  // stay logged in?
  /* 	if (localStorage.getItem('auth')) {
      	auth.loginAuto()
      } */
</script>

<style lang="scss">
  @use '~/assets/sass/layout/layout';
</style>
