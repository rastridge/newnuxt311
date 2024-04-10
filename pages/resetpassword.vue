<template>
	<div>
		<Head>
			<Title>Admin User Request Password Reset</Title>
		</Head>
		<div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
			<div class="text-center mb-5">
				<div class="text-900 md:text-2xl font-medium mb-3">
					Admin User Request Password Reset
				</div>
				<div class="text-500 md:text-xl font-medium mb-3">
					In a few moments instructions to reset your password will be sent to
					you at the email address associated with this username
				</div>
			</div>

			<FormKit type="form" submit-label="Request" @submit="handleSubmit">
				<FormKit type="text" name="username" label="Username"> </FormKit>
				<display-cancelform :destination="'/loginpage'" />
			</FormKit>
		</div>
	</div>
</template>

<script setup>
	// initialize formkit state
	const username = ref('')

	// form actions
	//

	const handleSubmit = async function (state) {
		const username = state.username
		const { data, error } = await useFetch('/users/resetrequest', {
			method: 'POST',
			body: { username },
		})
		navigateTo('/loginpage')
	}
</script>
