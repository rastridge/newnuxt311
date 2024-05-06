<script setup>

// const props = defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue'])

const modelValue = defineModel()
// emit('update:modelValue', "changed from ''")
modelValue.value = "xxxxxxx"
</script>

<template>
	in testmodel modelValue = {{ modelValue }}
	<!-- <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" /> -->
</template>