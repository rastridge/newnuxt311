<template>
	<div class="my-form-style w-full md:w-12 mb-3'">
		<FormKit
			type="form"
			:config="{ validationVisibility: 'live' }"
			submit-label="Submit"
			@submit="lookupByEmail"
		>
			<FormKit label="Look up by email" name="account_email" type="text" />
		</FormKit>
		<div v-show="!emailStatus" class="alert-danger w-full">
			<p>An account with that email does not exist</p>
		</div>
	</div>
</template>

<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const emailStatus = ref(true)

	const lookupByEmail = async (state) => {
		const { data, error } = await useFetch(
			`/accounts/email/${state.account_email}`,
			{
				method: 'get',
				headers: {
					authorization: auth.user.token,
				},
			}
		)

		if (data.value.length > 0) {
			navigateTo(`/admin/accounts/men/${data.value[0].id}`)
		} else {
			emailStatus.value = false
			setTimeout(() => {
				emailStatus.value = true
			}, 5000)
		}
		return
	}
</script>
