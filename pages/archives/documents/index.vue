<template>
	<div id="documents">
		<Head>
			<Title>Buffalo Rugby Club Document Archive </Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<common-header title="Document Archive" />
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
		<div class="my-simple-card-style">
			<div v-if="archives" class="surface-400 p-2 border-round-lg border-1">
				<ul class="list-none text-sm md:text-lg">
					<li
						v-for="itm in filteredData"
						:key="itm.id"
						class="cursor-pointer text-600 bg-white border-round-lg p-3 m-2"
					>
						<a :href="itm.archive_filepath" target="blank">
							<span class="text-sm md:text-lg text-600">
								{{ $dayjs(itm.archive_date).format('YYYY MMMM') }}
							</span>
							-
							<span class="text-sm md:text-lg text-600 font-semibold">
								{{ itm.archive_title }}
							</span>
							<br />
							<span
								class="text-xs md:text-sm text-600 cursor-pointer text-xs md:text-sm text-600"
							>
								{{ itm.archive_description }}
							</span>
							<span class="text-xs md:text-sm text-blue-600 cursor-pointer">
								- Open</span
							>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()

	// initial values
	const year = ref(parseInt($dayjs().format('YYYY')))
	const startyear = 1966

	const filteredData = computed(() => {
		return archives.value.filter((d) => {
			return parseInt($dayjs(d.dt).format('YYYY')) === year.value
		})
	})
	const onSubmit = (value) => {
		year.value = value
	}

	//
	// Get current archives
	//
	const {
		data: archives,
		pending,
		error,
		refresh,
	} = await useFetch('/archive/getallcurrent', {
		method: 'get',
	})
</script>
