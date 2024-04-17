<template>
	<div>
		<Head>
			<Title>Buffalo Rugby Club Player Statistics 15s</Title>
		</Head>
		<Common-header title="15s Players" />
		<div class="my-simple-card-style">
			<div class="my-datatable-wrapper-style">
				<DataTable
					v-model:filters="filters"
					:value="data"
					dataKey="name"
					:globalFilterFields="['member_type']"
					class="p-datatable-sm my-text-style"
					row-hover
					striped-rows
					filterDisplay="row"
					paginator
					:rows="20"
					:rowsPerPageOptions="[5, 10, 20, 50]"
					paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
					currentPageReportTemplate="{first} to {last} of {totalRecords}"
					selectionMode="single"
				>
					<template #empty> No players found. </template>
					<template #loading> Loading player data. Please wait. </template>

					<Column header="Name" field="name" :showFilterMenu="false">
						<template #body="{ data }">
							{{ data.name }}
						</template>
						<template #filter="{ filterModel, filterCallback }">
							<InputText
								v-model="filterModel.value"
								type="text"
								style="width: 8rem"
								class="p-column-filter"
								placeholder="Search by name"
								@input="filterCallback()"
							/>
						</template>
					</Column>
					<Column field="year" header="Joined" :showFilterMenu="false" sortable>
						<template #filter="{ filterModel, filterCallback }">
							<InputText
								v-model="filterModel.value"
								type="text"
								style="width: 6rem"
								class="p-column-filter"
								placeholder="Search by year"
								@input="filterCallback()"
							/>
						</template>
					</Column>

					<Column
						field="member_type"
						header="Member Type"
						:showFilterMenu="false"
					>
						<template #filter="{ filterModel, filterCallback }">
							<Dropdown
								v-model="filterModel.value"
								:options="member_types"
								placeholder="Search by member type"
								:showClear="true"
								@change="filterCallback()"
							>
							</Dropdown>
						</template>
					</Column>
					<Column field="games" header="Games" :showFilterMenu="false" sortable>
					</Column>
					<Column field="tries" header="Tries" :showFilterMenu="false" sortable>
					</Column>
					<Column
						field="maxtries"
						header="Most/g"
						:showFilterMenu="false"
						sortable
					>
					</Column>
					<Column field="tpg" header="Tries/g" :showFilterMenu="false" sortable>
					</Column>
					<Column field="conv" header="Convs" :showFilterMenu="false" sortable>
					</Column>
					<Column
						field="maxconv"
						header="Most/g"
						:showFilterMenu="false"
						sortable
					>
					</Column>
					<Column field="pk" header="PenKicks" :showFilterMenu="false" sortable>
					</Column>
					<Column
						field="maxpk"
						header="Most/g"
						:showFilterMenu="false"
						sortable
					>
					</Column>

					<Column
						field="yellow"
						header="Yellow"
						:showFilterMenu="false"
						sortable
					>
					</Column>
					<Column field="red" header="Red" :showFilterMenu="false" sortable>
					</Column>

					<Column field="pts" header="Pts" :showFilterMenu="false" sortable>
					</Column>
				</DataTable>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { FilterMatchMode } from 'primevue/api'

	//
	// Get current news
	//
	const { data } = await useFetch('/game_player_stats/getplayerstats/1', {
		// 1 = fifteens
		method: 'get',
	})

	//
	// filter value criteria
	//
	const filters = ref({
		name: { value: null, matchMode: FilterMatchMode.CONTAINS },
		year: { value: null, matchMode: FilterMatchMode.EQUALS },
		member_type: { value: null, matchMode: FilterMatchMode.EQUALS },
	})

	const member_types = ref([
		'Alumni',
		'Active',
		'Other',
		'Development',
		'Ad_Astra',
	])
</script>
