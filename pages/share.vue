<script setup>
  // const originaltitle = ref('from testpage')
  // const title = ref('originaltitle.value')
  const url = ref(useRequestURL())
</script>

<template>
  <div>
    ur= {{ url }}
    <p>Go there Go there Go there Go there {{ title }}</p>
    <SocialShare
      network="facebook"
      :styled="true"
      :label="false"
      url="https://buffalorugby.org/"
    />
    <!-- url="https://buffalorugby.org/archives/news/page/1067" -->
  </div>
</template>
