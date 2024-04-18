<template>
	<div>
		<Head>
			<Title>Make Labels</Title>
		</Head>
		<!-- <div class="w-full h-30rem border-1"> -->
		<div v-if="labels && show">
			<div class="topsectioncenter">
				<div class="topsectionitem">
					<Button class="mb-2" @click="toggleLabels()"
						>Create Other Labels</Button
					>
				</div>
			</div>

			<object
				id="preview"
				:data="labels"
				type="application/pdf"
				width="800"
				height="680"
			>
				<p>
					This browser does not support inline PDFs. Try out another browser
					(Chrome and Firefox should work).
				</p>
			</object>
		</div>
		<div v-else>
			<div class="topsectioncenter">
				<div class="topsectionitem">
					<display-admin-header :title="app" />
					<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
				</div>
				<div class="topsectionitem">
					<Button
						class="mb-3 center"
						label="Cancel"
						@click="navigateTo('/admin/member_info')"
					>
					</Button>
				</div>
				<div class="topsectionitem">
					<div class="text-sm md:text-lg text-red-500">
						Members must be marked as a Mail Recipient for a label to be
						created.
					</div>
				</div>
				<div class="topsectionitem">
					<div class="text-sm md:text-lg">Select member type of labels.</div>
				</div>
				<div class="topsectionitem">
					<Dropdown
						v-model="member_type_id"
						:options="memberTypeOptions"
						optionLabel="label"
						optionValue="value"
						placeholder="Select a member type"
					/>
				</div>

				<div class="topsectionitem">
					<Button
						class="p-button-sm mb-2"
						label="Make 5160 address labels"
						@click="makeLabels('5160', member_type_id)"
					>
					</Button>
				</div>

				<div class="topsectionitem">
					<Button
						class="p-button-sm mb-2"
						label="Make 5164 address labels"
						@click="makeLabels('5164', member_type_id)"
					>
					</Button>
				</div>

				<div class="topsectionitem">
					<Button
						class="p-button-sm mb-2"
						label="Make 5160 return labels"
						@click="makeReturnLabels('5160')"
					>
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()

	const app = ref('member_info')
	const error = ref('')
	const member_type_id = ref(3)
	const show = ref(false)
	const { getMemberTypeOptions } = useMembertypes()

	//
	// select member type
	//
	const memberTypeOptions = await getMemberTypeOptions()

	// /////////////////////////
	// address labels
	// ////////////////////////
	const labels = ref(null)
	const makeLabels = async (labelType, member_type_id) => {
		const { data } = await useFetch('/member_info/makelabels', {
			method: 'POST',
			body: {
				labelType,
				member_type_id,
			},
			headers: {
				authorization: auth.user.token,
			},
		})
		const decoded = atob(data.value)
		const blob = new Blob([decoded], { type: 'application/pdf' })
		const url = URL.createObjectURL(blob)

		labels.value = url
		toggleLabels()
	}
	// /////////////////////////
	// rturn labels
	// ////////////////////////
	const makeReturnLabels = async () => {
		const { data } = await useFetch('/member_info/makereturnlabels', {
			method: 'POST',
			headers: {
				authorization: auth.user.token,
			},
		})

		const decoded = atob(data.value)
		const blob = new Blob([decoded], { type: 'application/pdf' })
		const url = URL.createObjectURL(blob)

		labels.value = url

		toggleLabels()
	}

	const toggleLabels = () => (show.value = !show.value)
</script>
