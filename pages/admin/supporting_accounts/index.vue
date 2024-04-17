<template>
	<div>
		<Head>
			<Title>{{ app }} Admin</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>
			<div v-if="pending" class="topsectionitem">Loading ...</div>
			<div class="topsectionitem">
				<p>Scroll down to manage supporting accounts</p>
			</div>
		</div>

		<!-- supportingaccounts[0] = {{ supportingaccounts[0] }} -->
		<div class="my-simple-card-style">
			<div class="my-datatable-wrapper-style">
				<DataTable
					v-model:expandedRows="expandedRows"
					:value="supportingaccounts"
					dataKey="supportingApp_id"
					v-model:filters="filters"
					:globalFilterFields="['supportingApp_name']"
					class="p-datatable-sm my-text-style"
					striped-rows
					filterDisplay="row"
					paginator
					:rows="20"
					:rowsPerPageOptions="[5, 10, 20, 50]"
					paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
					currentPageReportTemplate="{first} to {last} of {totalRecords}"
					selectionMode="single"
					@rowExpand="onRowExpand"
				>
					<template #empty> No supporting accts found. </template>
					<template #loading>
						Loading supporting accts data. Please wait.
					</template>

					<Column header="Expand" expander style="width: 5rem" />
					<Column
						header="Name"
						field="supportingApp_name"
						:showFilterMenu="false"
						style="width: 20rem"
					>
						<template #body="{ data }">
							{{ data.supportingApp_name }}
						</template>
						<template #filter="{ filterModel, filterCallback }">
							<InputText
								v-model="filterModel.value"
								type="text"
								@input="filterCallback()"
								class="p-column-filter"
								placeholder="Search by name"
							/>
						</template>
					</Column>
					<Column
						field="supportingApp_description"
						header="Description"
						:showFilterMenu="false"
						style="width: 20rem"
					>
						<template #body="{ data }">
							{{ data.supportingApp_description }}
						</template>
						<template #filter="{ filterModel, filterCallback }">
							<InputText
								v-model="filterModel.value"
								type="text"
								@input="filterCallback()"
								class="p-column-filter"
								placeholder="Search by description"
							/>
						</template>
					</Column>

					<template #expansion="slotProps">
						<div class="p-3">
							<table>
								<tr>
									<th>URL</th>
									<th>Owner</th>
									<th>Username</th>
									<th>Password</th>
								</tr>
								<tr>
									<td style="width: 30%">
										<nuxt-link :to="slotProps.data.supportingApp_url">{{
											slotProps.data.supportingApp_url
										}}</nuxt-link>
									</td>
									<td style="width: 20%">
										{{ slotProps.data.supportingApp_owner }}
									</td>
									<td style="width: 20%">
										{{ slotProps.data.supportingApp_username }}
									</td>
									<td style="width: 20%">
										{{ slotProps.data.supportingApp_password }}
									</td>
								</tr>
							</table>
						</div>
					</template>
				</DataTable>
			</div>
		</div>
		<div>
			<render-list
				:data="supportingaccounts"
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
	definePageMeta({
		middleware: ['auth'],
	})
	import { FilterMatchMode } from 'primevue/api'
	import { usePlacemarkStore } from '~/stores/placemarkStore'
	const placemark = usePlacemarkStore()

	//
	// Initialize values for Renderlist
	//
	const app = 'supporting_accounts'
	const page = ref(placemark.getPage)

	const { getAccess } = useRenderListAccess()
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	const { data: supportingaccounts, pending } = await getAll(app)

	const expandedRows = ref([])
	const onRowExpand = async (event) => {}
	//
	// filter value criteria
	//
	const filters = ref({
		supportingApp_name: {
			value: null,
			matchMode: FilterMatchMode.CONTAINS,
		},
		supportingApp_description: {
			value: null,
			matchMode: FilterMatchMode.CONTAINS,
		},
	})
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
