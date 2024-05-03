<!-- <template>
	<div>
		in testvmodel localtitle = {{ localtitle }}
	</div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
	title: { type: String, required: true },
})
const emit = defineEmits(['update:title'])

const localtitle = useVModel(props, 'title', emit)
</script>
 -->

<script setup>

const text = 'ffffffaaaa'
const props = defineProps({
	modelValue: String,
})
const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit)
console.log(data)

emit('update:modelValue', text)

</script>

<template>
	in child component emit text = {{ text }}
</template>
