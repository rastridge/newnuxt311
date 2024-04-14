<template>
	<div>
		<Head>
			<Title>Member Info Admin</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<display-admin-header :title="app" />
			</div>

			<!-- make labels -->
			<div class="topsectionitem">
				<Card>
					<template #content>
						<Button class="mb-3" @click="makeLabels"> Make labels </Button>
					</template>
				</Card>
			</div>

			<div class="topsectionitem">
				<Card>
					<template #content>
						<p class="my-subheader-style">Members Info</p>

						<FormKit
							type="select"
							label="Select member type"
							placeholder="Select member type"
							v-model="member_type_id"
							:options="memberTypeOptions"
							validation="required"
						/>
						<table class="my-text-style">
							<tr>
								<th>Filter by</th>
								<th>Yes</th>
								<th>No</th>
								<th>NA</th>
							</tr>
							<tr>
								<td class="text-right">Good Email</td>
								<td>
									<input type="radio" v-model="email" value="1" />
								</td>
								<td>
									<input type="radio" v-model="email" value="0" />
								</td>
								<td>
									<input type="radio" v-model="email" value="2" />
								</td>
							</tr>

							<tr>
								<td class="text-right">Marked for emailing</td>
								<td>
									<input type="radio" v-model="marked_for_email" value="1" />
								</td>
								<td>
									<input type="radio" v-model="marked_for_email" value="0" />
								</td>
								<td>
									<input type="radio" v-model="marked_for_email" value="2" />
								</td>
							</tr>

							<tr>
								<td class="text-right">Email Opened in last 90 days</td>
								<td>
									<!-- Yes -->
									<input type="radio" v-model="email_opened" value="1" />
								</td>
								<td>
									<!-- No  -->
									<input type="radio" v-model="email_opened" value="0" />
								</td>
								<td>
									<!-- Does not apply  -->
									<input type="radio" v-model="email_opened" value="2" />
								</td>
							</tr>

							<tr>
								<td class="text-right">Good Address</td>
								<td>
									<input type="radio" v-model="address" value="1" />
								</td>
								<td>
									<input type="radio" v-model="address" value="0" />
								</td>
								<td>
									<input type="radio" v-model="address" value="2" />
								</td>
							</tr>
							<tr>
								<td class="text-right">Marked for mailing (calendar)</td>
								<td>
									<input type="radio" v-model="marked_for_mail" value="1" />
								</td>
								<td>
									<input type="radio" v-model="marked_for_mail" value="0" />
								</td>
								<td>
									<input type="radio" v-model="marked_for_mail" value="2" />
								</td>
							</tr>

							<tr>
								<td class="text-right">Donated</td>
								<td>
									<input type="radio" v-model="donated" value="1" />
								</td>
								<td>
									<input type="radio" v-model="donated" value="0" />
								</td>
								<td>
									<input type="radio" v-model="donated" value="2" />
								</td>
							</tr>
						</table>
						<p class="my-subheader-style">Selected records count {{ rows }}</p>
					</template>
				</Card>
			</div>
		</div>
		<div class="renderlist-enclosure">
			<DataTable
				:value="filteredData"
				class="p-datatable-sm renderlist-enclosure my-text-style"
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
							{{ $dayjs(slotProps.data.modified_dt).format('YYYY MMM D') }}
						</div>
					</template>
				</Column>

				<Column field="name" header="Name" frozen style="white-space: nowrap">
				</Column>

				<Column field="account_addr_phone" header="Phone"> </Column>
				<Column field="address" header="Address"> </Column>

				<Column field="mail_recipient" header="US Mail Recip">
					<template #body="slotProps">
						<div>
							{{ slotProps.data.mail_recipient ? 'Y' : 'N' }}
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
							{{
								$dayjs(slotProps.data.account_email_opening).format(
									'YYYY MMM D'
								)
							}}
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	import { usePlacemarkStore } from '~/stores/placemarkStore'
	const placemark = usePlacemarkStore()

	const { $dayjs } = useNuxtApp()

	const { getAll } = useFetchAll()
	const { getMemberTypeOptions } = useMembertypes()
	const memberTypeOptions = await getMemberTypeOptions()

	const app = ref('member_info')
	const info = ref([])

	const email = ref('2')
	const marked_for_email = ref('2')
	const address = ref('2')
	const email_opened = ref('2')
	const donated = ref('2')
	const marked_for_mail = ref('2')
	const member_type_id = ref('3')

	const loading = ref(false)

	const dt = ref()
	const exportCSV = () => {
		dt.value.exportCSV()
	}

	const rows = computed(() => {
		return filteredData.value.length
	})

	const { data } = await getAll(app.value)
	info.value = data.value

	const filteredData = computed(() => {
		let temp = info.value

		temp = temp.filter(
			(d) =>
				d.member_type_id == member_type_id.value ||
				d.member_type2_id == member_type_id.value
		)

		/* **********  yes email ************* */
		if (email.value !== '2') {
			if (email.value == '1') {
				temp = temp.filter((d) => yesEmail(d.account_email))
			} else if (email.value == '0') {
				temp = temp.filter((d) => noEmail(d.account_email))
			}
		}
		/* **********  marked_for_email ************* */

		if (marked_for_email.value !== '2') {
			if (marked_for_email.value == '1') {
				temp = temp.filter((d) => (d.newsletter_recipient ? true : false))
			} else if (marked_for_email.value == '0') {
				temp = temp.filter((d) => (!d.newsletter_recipient ? true : false))
			}
		}
		/* **********  yes address ************* */
		if (address.value !== '2') {
			if (address.value == '1') {
				temp = temp.filter((d) => yesAddress(d.account_addr_street))
			} else if (address.value == '0') {
				temp = temp.filter((d) => noAddress(d.account_addr_street))
			}
		}

		/* **********  marked_for_Mail ************* */
		if (marked_for_mail.value !== '2') {
			// value from filter choices
			if (marked_for_mail.value == '1') {
				temp = temp.filter((d) => (d.mail_recipient ? true : false))
			} else if (marked_for_mail.value == '0') {
				temp = temp.filter((d) => (!d.mail_recipient ? true : false))
			}
		}

		/* **********  email_opened ************* */
		if (email_opened.value !== '2') {
			if (email_opened.value == '1') {
				temp = temp.filter((d) => yesEmailOpenedLately(d.account_email_opening))
			} else if (email_opened.value == '0') {
				temp = temp.filter((d) => noEmailOpenedLately(d.account_email_opening))
			}
		}

		/* **********  donated ************* */
		if (donated.value !== '2') {
			if (donated.value == '1') {
				temp = temp.filter((d) => (d.donation_cnt ? true : false))
			} else if (donated.value == '0') {
				temp = temp.filter((d) => (!d.donation_cnt ? true : false))
			}
		}

		return temp
	})

	const makeLabels = () => {
		navigateTo('/admin/member_info/makelabels')
	}
	const memberType = (member_type_id, member_type2_id) => {
		let match = false
		if (member_type_id.value == '4') {
			match =
				member_type2_id == member_type_id.value ||
				member_type_id == member_type_id.value
		} else {
			match = member_type_id == member_type_id.value
		}
		return match
	}
	const yesEmail = (account_email) => {
		return !(
			/\bnon/i.test(account_email) ||
			/\non./i.test(account_email) ||
			/\bbad/i.test(account_email) ||
			/\bunsub/i.test(account_email) ||
			/local/i.test(account_email) ||
			!/[@]/i.test(account_email) ||
			account_email === ''
		)
	}
	const noEmail = (account_email) => {
		return (
			/\bnon/i.test(account_email) ||
			/\non./i.test(account_email) ||
			/\bbad/i.test(account_email) ||
			/\bunsub/i.test(account_email) ||
			/local/i.test(account_email) ||
			!/[@]/i.test(account_email) ||
			account_email === ''
		)
	}
	const yesAddress = (account_addr_street) => {
		return !(/\bbad/i.test(account_addr_street) || account_addr_street === '')
	}
	const noAddress = (account_addr_street) => {
		return /\bbad/i.test(account_addr_street) || account_addr_street === ''
	}

	const yesEmailOpenedLately = (account_email_opening) => {
		const days = $dayjs().diff($dayjs(account_email_opening), 'days')
		return days < 90
	}
	const noEmailOpenedLately = (account_email_opening) => {
		const days = $dayjs().diff($dayjs(account_email_opening), 'days')
		return days >= 90
	}
</script>
