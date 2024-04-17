<template>
	<div>
		<Head>
			<Title>Admin Users List</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>
		</div>

		<render-list
			:data="users"
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
</template>

<script setup>
	import { usePlacemarkStore } from '~/stores/placemarkStore'
	definePageMeta({
		middleware: ['auth'],
	})
	const app = 'users'
	const placemark = usePlacemarkStore()

	const { getAll, deleteOne, changeStatusOne } = useFetchAll()

	//
	// Initialize values for Renderlist
	//
	const { getAccess } = useRenderListAccess()
	const page = ref(placemark.getPage)

	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all users
	//
	const { data: users } = await getAll('users')

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
