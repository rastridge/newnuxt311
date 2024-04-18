<template>
	<div>
		<Head>
			<Title>{{ app }} List</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>
			<div class="topsectionitem">
				<Card>
					<template #content>
						<div class="my-text-style text-left">
							<p class="font-semibold">For each new voting round</p>
							<p>1. Change status of old votes to inactive</p>
							<p>2. Create new voting questions</p>
							<p>
								3. Send newsletter to voters including this message: "Go to
								https://buffalorugby.org/admin/votes/start to begin voting"
							</p>
						</div>
					</template>
				</Card>
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
