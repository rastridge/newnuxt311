<!-- <template>
	<div>
		<testvmodel title='hello there' @update="update" />
		message = {{ message }}
	</div>
</template>

<script setup>
const update = () => { }
const message = ref('dsfasdf')
</script>
 -->

<script setup>
const title = ref('cccccc');
</script>

<template>
	<br />

	<testvmodel v-model="title" />
	<br />
	in parent title = {{ title }}
</template>