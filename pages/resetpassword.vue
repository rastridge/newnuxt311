<template>
	<div>
		<Head>
			<Title>Admin User Request Password Reset</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<Card style="width: 25em">
					<template #content>
						<div class="mb-5">
							<div class="md:text-xl font-semibold mb-3">
								Admin User Request Password Reset
							</div>
							<div class="text-left md:text-xl font-medium mb-3">
								In a few moments instructions to reset your password will be
								sent to you at the email address associated with this username
							</div>
						</div>

						<FormKit type="form" submit-label="Request" @submit="handleSubmit">
							<FormKit type="text" name="username" label="Admin Username">
							</FormKit>
							<display-cancelform :destination="'/loginpage'" /> </FormKit
					></template>
				</Card>
			</div>
		</div>
	</div>
</template>

<script setup>
	const handleSubmit = async function (state) {
		const username = state.username
		await useFetch('/users/resetrequest', {
			method: 'POST',
			body: { username },
		})
		navigateTo('/loginpage')
	}
</script>
