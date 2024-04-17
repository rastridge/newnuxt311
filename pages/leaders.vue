<template>
	<div id="leaders">
		<Head>
			<Title>Buffalo Rugby Club Leaders</Title>
		</Head>
		<div class="center-content">
			<common-header title="Club Leaders" />
		</div>
		<div class="my-simple-card-style">
			<div class="my-datatable-wrapper-style">
				<DataTable
					:value="leaders"
					class="p-datatable-sm my-text-style"
					striped-rows
					tableStyle="min-width: 50rem"
					paginator
					:rows="20"
				>
					<Column field="title" header=""></Column>
					<Column field="president" header="President"></Column>
					<Column field="vice_president" header="Vice Pres"></Column>
					<Column field="secretary" header="Secretary"> </Column>
					<Column field="match_secretary" header="Match Sec"> </Column>
					<Column field="treasurer" header="Treasurer"> </Column>
					<Column field="social_chairman" header="Social Chair"> </Column>
					<Column field="fall_captain" header="Captain Fall"> </Column>
					<Column field="spring_captain" header="Captain Spring"> </Column>
					<Column field="coach" header="Coach"> </Column>
					<Column field="assistant_coach" header="Asst Coach"> </Column>
					<Column field="chair_bod" header="Chair BOD"> </Column>
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
		data: leaders,
		pending,
		error,
		refresh,
	} = await useFetch('/leaders/getallcurrent', {
		method: 'get',
	})
</script>
