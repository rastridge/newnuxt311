<template>
	<div class="start">
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<div
					class="w-12 text-left my-text-style border-round-md md:border-round-lg shadow-6 mb-3 m-2 p-4"
				>
					<p>
						To vote, please enter your Buffalo Rugby Membership email address
						below. You will receive an email shortly with further instructions
					</p>
					<div class="topsectionitem">
						<p>
							If you do not receive the email within 10 minutes email
							<a href="mailto:secretary@buffalorugby.org"
								>secretary@buffalorugby.org</a
							>
							for help
						</p>
					</div>
				</div>
			</div>
			<div class="topsectionitem m-2">
				<FormKit
					type="form"
					:config="{ validationVisibility: 'live' }"
					submit-label="Send me the email"
					@submit="handleSubmit"
				>
					<FormKit
						type="email"
						name="email"
						label="Enter your BRC email address"
						validation="required | email"
					>
					</FormKit>
				</FormKit>
				<!-- </FormKit> -->
			</div>
		</div>
	</div>
</template>

<script setup>
	const handleSubmit = (state) => {
		const email = state.email
		useFetch('/votes/sendballot', {
			method: 'POST',
			body: { email },
		})
		navigateTo('/admin/votes/confirm')
	}
</script>
