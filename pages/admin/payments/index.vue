<template>
	<div>
		<Head>
			<Title>{{ app }} Admin</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>
			<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		</div>
		<div>
			<render-list
				:data="payments"
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
	</div>
</template>

<script setup>
	import { usePlacemarkStore } from '~/stores/placemarkStore'
	definePageMeta({
		middleware: ['auth'],
	})

	const placemark = usePlacemarkStore()

	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	//
	// Initialize values for Renderlist
	//
	const { getAccess } = useRenderListAccess()
	const app = 'payments'
	const page = ref(placemark.getPage)

	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all payments
	//
	const { data: payments } = await getAll(app)
	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne(app, id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne(app, { id, status })
	}
</script>
