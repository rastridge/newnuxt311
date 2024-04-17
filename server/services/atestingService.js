const { doDBQueryTZ0 } = useQuery()

export const atestingService = {
	getAll,
	getOne,
	editOne,
	addOne,
}

async function getAll() {
	return 'It works'
}

async function getOne(id) {
	const sql =
		`SELECT
				*
			FROM
					atesting
			WHERE
				id = ` + id

	const results = await doDBQueryTZ0(sql)
	return results[0]
}

/* async function addOne() {
	const sql = `INSERT INTO atesting () value ()`

	const results = await doDBQueryTZ0(sql)
	return results
} */

async function addOne({ datetime_type }) {
	const sql = `INSERT INTO atesting SET
								datetime_type = ?`
	let inserts = []
	inserts.push(datetime_type)
	const results = await doDBQueryTZ0(sql, inserts)
	return results
}

async function editOne({ id, datetime_type }) {
	const sql = `UPDATE atesting SET
								datetime_type = ?
							WHERE event_id = ?`

	let inserts = []
	inserts.push(datetime_type, id)

	const results = await doDBQueryTZ0(sql, inserts)
	return results
}
