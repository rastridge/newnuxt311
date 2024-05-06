<!-- <script setup>
</script>

<template>

	<testvmodel v-model:title="dfdsfasdf" />
	<br />
	in parent title = {{ title }}
</template> -->
<script setup>
const originaltitle = ref('from testpage')

const title = ref('originaltitle.value')
</script>

<template>
	<!-- <testvmodel :modelValue="title" @update:modelValue="$event => (title = $event) " /> -->
	<testvmodel v-model="title" />
	<br>
	in testpage originaltitle = {{ originaltitle }}
	<br>
	in testpage title = {{ title }}
	<br>

	<!-- in testpage modelValue = {{ modelValue }} -->
</template>