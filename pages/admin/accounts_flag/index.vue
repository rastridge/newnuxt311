<template>
	<div>
		<Head>
			<Title>Flag Accounts List</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>

			<div class="topsectionitem">
				<p class="my-header-style">Member type</p>
				<Dropdown
					v-model="member_type_id"
					class="mb-2"
					:options="memberTypeOptions"
					optionLabel="label"
					optionValue="value"
					placeholder="Select a member type"
				/>
			</div>
		</div>

		<div>
			<render-list
				:data="filteredData"
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
		<p class="my-header-style">Current Info</p>

		<div class="my-simple-card-style">
			<div class="my-datatable-wrapper-style">
				<DataTable
					:value="filteredData"
					class="p-datatable-sm my-text-style"
					ref="dt"
					scrollable
					scrollHeight="600px"
					dataKey="account_id"
					:loading="loading"
					paginator
					:rows="10"
					:rowsPerPageOptions="[5, 10, 20, 50]"
					paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
				>
					<template #empty> No members found </template>
					<template #loading> Loading data. Please wait. </template>
					<template #header>
						<div style="text-align: left">
							<Button
								icon="pi pi-external-link"
								label="Export to CSV"
								@click="exportCSV($event)"
							/>
						</div>
					</template>
					<Column
						field="modified_dt"
						header="Last modified"
						style="white-space: nowrap"
					>
						<template #body="slotProps">
							<div>
								{{ $dayjs(slotProps.data.modified_dt).format('ll') }}
							</div>
						</template>
					</Column>

					<Column
						field="title"
						header="Name"
						frozen
						style="white-space: nowrap"
					>
					</Column>

					<Column field="account_addr_phone" header="Phone"> </Column>
					<Column field="address" header="Address">
						<template #body="slotProps">
							<div>
								{{
									slotProps.data.account_addr_street +
									', ' +
									slotProps.data.account_addr_postal
								}}
							</div>
						</template>
					</Column>

					<Column field="mail_recipient" header="Text recip?">
						<template #body="slotProps">
							<div>
								{{ slotProps.data.sms_recipient ? 'Y' : 'N' }}
							</div>
						</template>
					</Column>

					<Column field="account_email" header="Email"> </Column>

					<Column field="newsletter_recipient" header="Email Recip">
						<template #body="slotProps">
							<div>
								{{ slotProps.data.newsletter_recipient ? 'Y' : 'N' }}
							</div>
						</template>
					</Column>

					<Column field="account_email_opening" header="Last email opening">
						<template #body="slotProps">
							<div>
								{{ $dayjs(slotProps.data.account_email_opening).format('ll') }}
							</div>
						</template>
					</Column>
				</DataTable>
			</div>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { usePlacemarkStore } from '~/stores/placemarkStore'
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const placemark = usePlacemarkStore()
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()

	//
	// initial testing values
	//
	const member_type_id = ref(placemark.getMemberTypeId)
	const page = ref(placemark.getPage)

	// const member_type_id = ref(placemark.getMemberTypeId)

	//
	// Initialize values for Renderlist
	//
	const { getAccess } = useRenderListAccess()
	const app = 'accounts_flag'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all accounts
	//
	const { data: accounts, pending } = await getAll(app)

	//
	// Filter members
	//
	const filteredData = computed(() => {
		let temp = []
		// by member type
		temp = accounts.value.filter(function (d) {
			return (
				d.member_type_id === member_type_id.value ||
				d.member_type2_id === member_type_id.value
			)
		})
		return temp
	})

	watch(member_type_id, (newid) => {
		placemark.setMemberTypeId(newid)
		placemark.setPage(0)
		page.value = 0
	})

	//
	// Get membertype opyions
	//

	const memberTypeOptions = [
		{ label: 'Active', value: 11 },
		{ label: 'Alumni', value: 15 },
		{ label: 'Pending', value: 12 },
	]

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
