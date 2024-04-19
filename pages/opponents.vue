<template>
	<div>
		<Head>
			<Title>Buffalo Rugby Club Opponents</Title>
		</Head>
		<Common-header title="Opponents" />
		<div class="my-simple-card-style">
			<div class="my-datatable-wrapper-style">
				<DataTable
					v-model:expandedRows="expandedRows"
					v-model:filters="filters"
					:value="opponents"
					dataKey="opponent_id"
					:globalFilterFields="['opponent_type']"
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
					<template #empty> No opponents found. </template>
					<template #loading> Loading opponents data. Please wait. </template>

					<Column header="Expand" expander style="width: 5rem" />
					<Column
						header="Name"
						field="opponent_name"
						:showFilterMenu="false"
						style="width: 20rem"
					>
						<template #body="{ data }">
							{{ data.opponent_name }}
						</template>
						<template #filter="{ filterModel, filterCallback }">
							<InputText
								v-model="filterModel.value"
								type="text"
								class="p-column-filter"
								placeholder="Search by name"
								@input="filterCallback()"
							/>
						</template>
					</Column>
					<Column
						field="opponent_location"
						header="Location"
						:showFilterMenu="false"
						sortable
						style="width: 20rem"
					>
						<template #filter="{ filterModel, filterCallback }">
							<InputText
								v-model="filterModel.value"
								type="text"
								class="p-column-filter"
								placeholder="Search by location"
								@input="filterCallback()"
							/>
						</template>
					</Column>
					<Column
						field="opponent_type"
						header="Opponent Type"
						:showFilterMenu="false"
					>
						<template #filter="{ filterModel, filterCallback }">
							<Dropdown
								v-model="filterModel.value"
								:options="opponent_types"
								:showClear="true"
								style="width: 10rem"
								:pt="{
									root: { class: 'w-full md:w-20rem' },
									item: { class: 'text-sm md:text-lg  font-semibold' },
									input: { class: 'text-sm md:text-lg  font-semibold' },
								}"
								@change="filterCallback()"
							>
							</Dropdown>
						</template>
					</Column>

					<template #expansion="slotProps">
						<div class="p-3">
							<display-history :opponent_id="slotProps.data.opponent_id" />
							<display-records :opponent_id="slotProps.data.opponent_id" />
							<display-streaks :opponent_id="slotProps.data.opponent_id" />
						</div>
					</template>
				</DataTable>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { FilterMatchMode } from 'primevue/api'
	const expandedRows = ref([])
	//
	// Get opponents
	//
	const { data: opponents } = await useFetch('/opponents/getallcurrent', {
		method: 'get',
	})

	const onRowExpand = async (event) => {}
	//
	// filter value criteria
	//
	const filters = ref({
		opponent_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
		opponent_type: { value: null, matchMode: FilterMatchMode.EQUALS },
		opponent_location: { value: null, matchMode: FilterMatchMode.CONTAINS },
	})

	const opponent_types = ref(['men', 'college', 'oldboys'])
</script>
