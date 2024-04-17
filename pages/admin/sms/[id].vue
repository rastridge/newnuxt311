<script setup>
	import Swal from 'sweetalert2'
	definePageMeta({
		middleware: ['auth'],
	})

	const { editSMS } = useSMS()

	//
	// Get SMS id
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// SMS form action
	//
	const onSubmit = async function (state) {
		Swal.fire({
			title: 'What to do?',
			showDenyButton: true,
			showCancelButton: true,
			showConfirmButton: true,
			confirmButtonText: `Send now`,
			denyButtonText: `Send later`,
		}).then((result) => {
			if (result.isConfirmed) {
				// composable
				editSMS(state, 'sendNow')
				Swal.fire('Saved and Sent', '', 'success')
			} else if (result.isDenied) {
				editSMS(state, 'sendLater')
				Swal.fire('Saved', '', 'success')
			} else if (result.isDismissed) {
				// this.submitStatus = ''
			}
		})
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit SMS {{ id }}</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header title="Edit SMS" />
			</div>
			<sms-form :id="id" @submitted="onSubmit" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import 'sweetalert2/src/sweetalert2.scss';
</style>
