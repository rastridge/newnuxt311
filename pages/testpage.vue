<script setup>
const originaltitle = ref('from testpage')
const title = ref('originaltitle.value')

</script>

<template>

	<div>
		<p>Go there Go there Go there Go there</p>
		<!-- <testvmodel :modelValue="title" @update:modelValue="$event => (title = $event) " /> -->
		<testvmodel v-model="title" />
		<br>
		in testpage originaltitle = {{ originaltitle }}
		<br>
		in testpage title = {{ title }}
		<br>
		<br>
	</div>
</template>