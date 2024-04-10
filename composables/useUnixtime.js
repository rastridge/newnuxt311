export default function useUnixtime() {
	const convertToUnixtime = async (dt) => {
		const ut = $dayjs.unix(dt)
		return ut
	}
	const convertToDatetime = async (ut) => {
		// add 10 years to unixtimestamp
		// convert unixt to datetime and subtract 10 years from datetime
		const dt = $dayjs($dayjs.unix($dayjs.unix(ut).add(10, 'years')))
			.subtract(10, 'year')
			.format()
		return dt
	}

	return { convertToUnixtime, convertToDatetime }
}
