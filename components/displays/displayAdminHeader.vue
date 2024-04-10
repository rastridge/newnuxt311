<template>
	<div class="my-header-style">
		{{ title.charAt(0).toUpperCase() + title.slice(1) }}
		<display-user-loggedin />
	</div>
</template>

<script>
	export default {
		props: {
			title: { type: String, default: '', required: true },
		},
	}
</script>
