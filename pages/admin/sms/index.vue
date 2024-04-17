<template>
	<div>
		<Head>
			<Title>{{ app }} admin</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>
			<div v-if="pending" class="topsectionitem">Loading ...</div>
		</div>
		<div>
			<render-list
				:data="sms_data"
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
	const { getAccess } = useRenderListAccess()
	const app = 'sms'
	const page = ref(placemark.getPage)

	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all sms
	//
	const { data: sms_data, pending } = await getAll('sms')

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
