<template>
	<div>
		<Head>
			<Title>{{ app }} List</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>
			<div class="topsectionitem w-40rem">
				<div
					class="text-left my-text-style border-round-md md:border-round-lg shadow-6 mb-3 m-2 p-4"
				>
					<h6 class="font-semibold">For each new voting round</h6>
					<p>1. Change status of old votes to inactive</p>
					<p>2. Create new voting questions</p>
					<p>
						3. Send newsletter to voters including this message: "Go to
						https://buffalorugby.org/admin/votes/start to begin voting"
					</p>
				</div>
			</div>
		</div>

		<div>
			<render-list
				:data="votes"
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

	//
	// Initialize values for Renderlist
	//
	const app = 'votes'
	const page = ref(placemark.getPage)

	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const { data: votes } = await getAll(app)

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
