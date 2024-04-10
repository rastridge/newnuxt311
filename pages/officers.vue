<template>
	<div id="officers">
		<Head>
			<Title>Buffalo Rugby Club Officers</Title>
		</Head>
		<div class="center-content">
			<common-header title="Officers" />
		</div>
		<!-- 		<div
			class="border-round-xl md:shadow-6 m-1 p-2 md:m-2 md:p-3 bg-blue-600 text-white text-sm md:text-lg"
		> -->
		<div class="my-simple-card-style">
			<div class="my-datatable-wrapper-style">
				<DataTable :value="officers" class="p-datatable-sm my-text-style">
					<Column field="title" header=""></Column>
					<Column field="office" header="Office 1"></Column>
					<Column field="office2" header="Office 2"></Column>
					<Column field="account_email" header="Email">
						<template #body="slotProps">
							<div style="width: 5rem">
								<expose-email :email="slotProps.data.account_email" />
							</div>
						</template>
					</Column>
				</DataTable>
			</div>
		</div>
	</div>
</template>

<script setup>
	//
	// Get current news
	//
	const {
		data: officers,
		pending,
		error,
		refresh,
	} = await useFetch('/accounts/getofficers', {
		method: 'get',
	})
</script>

<style scoped>
	p-datatable {
		border: solid 2px black;
	}
</style>
