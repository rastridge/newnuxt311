<template>
	<div>
		<Head>
			<Title>Newsletters List</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>

			<div class="topsectionitem">
				<select-year
					:startyear="startyear"
					:currentyear="year"
					@submitted="onSubmit"
					class="mb-3"
				/>
			</div>
		</div>
		<div>
			<render-list
				:data="year_data"
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
	import { usePlacemarkStore } from '~/stores/placemarkStore'
	const placemark = usePlacemarkStore()
	const { deleteOne, changeStatusOne } = useFetchAll()
	//
	// Initialize values for Renderlist and Select Year
	//
	const { getAccess } = useRenderListAccess()
	const app = 'newsletters'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	const year = ref(placemark.getYear)
	const startyear = ref(2004)
	const year_data = ref([])
	const page = ref(placemark.getPage)
	//
	// Select year action
	//
	const onSubmit = function (value) {
		year.value = value
		// new year - set page to zero
		placemark.setPage(0)
		page.value = 0
		placemark.setYear(value)
	}

	//
	// Get a year
	//
	const getYearOfNewsletters = async (year) => {
		const { data, pending, error, refresh } = await useFetch(
			`/newsletters/year/${year}`,
			{
				method: 'get',
			}
		)
		year_data.value = data.value
	}

	// on mount
	// getYearOfNewsletters(year.value)

	watchEffect(() => {
		getYearOfNewsletters(year.value)
		// alert('IN watchEffect')
		// placemark.setPage(0)
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
