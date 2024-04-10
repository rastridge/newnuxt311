<template>
	<p
		v-if="alert.message"
		class="w-full"
		:class="{
			'alert-danger': alert.type === 'alert-danger',
			'alert-success': alert.type === 'alert-success',
			'alert-info': alert.type === 'alert-info',
		}"
	>
		{{ alert.message }}
	</p>
</template>

<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
</script>

<style>
	.alert-danger {
		margin-right: auto;
		padding: 0.25rem;
		background-color: white;
		color: red;
		width: 25%;
		text-align: center;
		border: 1px solid red;
		border: none;
		border-radius: 5px;
	}
	.alert-success {
		margin-right: auto;
		padding: 0.25rem;
		background-color: white;
		color: yellow;
		width: 25%;
		text-align: center;
		border: 1px solid yellow;
		border: none;
		border-radius: 5px;
	}
	.alert-info {
		padding: 0.5rem;
		background-color: rgb(221, 221, 221);
		color: green;
		width: 100%;
		text-align: center;
		border: 1px solid green;
		border: none;
		border-radius: 5px;
	}
</style>
