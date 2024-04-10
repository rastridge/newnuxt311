<template>
	<div>
		<Head>
			<Title>Opponents List</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>
			<div v-if="pending" class="topsectionitem">Loading ...</div>
		</div>
		<div>
			<render-list
				:data="opponents_data"
				:page="page"
				:app="app"
				:statusable="statusable"
				:editable="editable"
				:deleteable="deleteable"
				:addable="addable"
				:viewable="viewable"
				@changeStatus="changeStatus"
				@deleteItem="deleteItem"
			/>
		</div>
		<Dialog
			v-model:visible="visible"
			modal
			header="Can't do that"
			:style="{ width: '25rem' }"
		>
			<span class="p-text-secondary block mb-5">{{ message }}</span>

			<template #footer>
				<Button label="Continue" outlined @click="visible = false" autofocus />
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { usePlacemarkStore } from '~/stores/placemarkStore'
	const placemark = usePlacemarkStore()

	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	const { getAccess } = useRenderListAccess()

	//
	// Initialize values for Renderlist
	//
	const app = 'opponents'
	const page = ref(placemark.getPage)

	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const { data: opponents_data, pending } = await getAll(app)

	//
	// Renderlist actions
	//
	const visible = ref(false)
	const message = ref('')
	const deleteItem = async (id) => {
		const msg = await deleteOne(app, id)
		if (msg.value) {
			message.value = msg.value
			visible.value = true
		}
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne(app, { id, status })
	}
</script>
