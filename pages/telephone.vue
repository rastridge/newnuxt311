<template>
	phonenumber = {{ phonenumber }}
	<input-telephone
		:tnumber="phonenumber"
		@update="(t) => (phonenumber = t.value)"
	/>
</template>

<script setup>
	const phonenumber = ref(null)
</script>
