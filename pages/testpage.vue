<script setup>
const originaltitle = ref('from testpage')

const title = ref('originaltitle.value')
</script>

<template>
	<p>Hello there</p>
	<!-- <testvmodel :modelValue="title" @update:modelValue="$event => (title = $event) " /> -->
	<testvmodel v-model="title" />
	<br>
	in testpage originaltitle = {{ originaltitle }}
	<br>
	in testpage title = {{ title }}
	<br>
	<br>

	<!-- in testpage modelValue = {{ modelValue }} -->
</template>