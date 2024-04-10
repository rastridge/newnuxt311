const CONFIG = useRuntimeConfig()
const { doDBQueryBuffalorugby } = useQuery()

export const clubhouseService = {
	getAll,
	getAllCurrent,
	getOne,
	getRoom,
	addOne,
	editOne,
	deleteOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
									clubhouse_id,
									clubhouse_id as id,
									clubhouse_title,
									clubhouse_title as title,
									clubhouse_date,
									clubhouse_description,
									clubhouse_filepath,
									clubhouse_category,									
									clubhouse_owner,									
									status,
									deleted,
									deleted_dt,
									created_dt,
									modified_dt as dt
                FROM
									inbrc_clubhouse
                WHERE
									deleted = 0
                ORDER BY dt DESC`

	const clubhouse = await doDBQueryBuffalorugby(sql)

	return clubhouse
}

async function getAllCurrent() {
	const sql = `SELECT
										clubhouse_id,
										clubhouse_id as id,
										clubhouse_title,
										clubhouse_title as title,
                    clubhouse_date,
                    clubhouse_description,
										clubhouse_filepath,
										clubhouse_category,
										clubhouse_owner,									
										status,
										deleted,
										deleted_dt,
										created_dt,
										modified_dt as dt
                FROM
                    inbrc_clubhouse
                WHERE
                    deleted = 0
                    AND
                    status = 1
                ORDER BY dt DESC`
	const clubhouse = await doDBQueryBuffalorugby(sql)
	return clubhouse
}

async function getOne(id) {
	const sql =
		`SELECT 
				clubhouse_id,
				clubhouse_id as id,
				clubhouse_title,
				clubhouse_title as title,
				clubhouse_date,
				clubhouse_description,
				clubhouse_filepath,
				clubhouse_owner,									
				clubhouse_category
			FROM inbrc_clubhouse
			WHERE clubhouse_id = ` + id

	const clubhouse = await doDBQueryBuffalorugby(sql)
	return clubhouse[0]
}

async function getRoom(room) {
	const sql = `SELECT 
									clubhouse_id,
									clubhouse_id as room,
									clubhouse_title,
									clubhouse_title as title,
									clubhouse_date,
									clubhouse_description,
									clubhouse_filepath,
									clubhouse_owner,								
									clubhouse_category
								FROM 
									inbrc_clubhouse
								WHERE
									status = 1
									AND
									deleted = 0
									AND
									clubhouse_category = "${room}"
								ORDER BY
									clubhouse_date ASC`

	const rm = await doDBQueryBuffalorugby(sql)
	return rm
}

async function addOne({
	clubhouse_title,
	clubhouse_date,
	clubhouse_description,
	clubhouse_filepath,
	clubhouse_category,
	clubhouse_owner,
}) {
	const sql = `INSERT INTO inbrc_clubhouse SET
								clubhouse_title = ?,
								clubhouse_date = ?,
								clubhouse_description = ?,
								clubhouse_filepath = ?,
								clubhouse_category = ?,
								clubhouse_owner = ?,									
								created_dt = NOW(),
								modified_dt= NOW()`
	let inserts = []
	inserts.push(
		clubhouse_title,
		clubhouse_date,
		clubhouse_description,
		clubhouse_filepath,
		clubhouse_category,
		clubhouse_owner
	)
	const clubhouse = await doDBQueryBuffalorugby(sql, inserts)
	return clubhouse
}

async function editOne({
	id,
	clubhouse_title,
	clubhouse_date,
	clubhouse_description,
	clubhouse_filepath,
	clubhouse_category,
	clubhouse_owner,
}) {
	const sql = `UPDATE inbrc_clubhouse SET
								clubhouse_title = ?,
								clubhouse_date = ?,
								clubhouse_description = ?,
								clubhouse_filepath = ?,
								clubhouse_category = ?,
								clubhouse_owner = ?,									
								modified_dt= NOW()
							WHERE clubhouse_id = ?`
	let inserts = []
	inserts.push(
		clubhouse_title,
		clubhouse_date,
		clubhouse_description,
		clubhouse_filepath,
		clubhouse_category,
		clubhouse_owner,
		id
	)
	const clubhouse = await doDBQueryBuffalorugby(sql, inserts)
	return clubhouse
}

async function deleteOne(id) {
	const sql = `UPDATE inbrc_clubhouse SET deleted = 1, deleted_dt = NOW() WHERE clubhouse_id = ${id}`
	const clubhouse = await doDBQueryBuffalorugby(sql)
	return clubhouse
}

async function changeStatus({ id, status }) {
	const sql = `UPDATE inbrc_clubhouse SET status = ${status} WHERE clubhouse_id = ${id}`
	const clubhouse = await doDBQueryBuffalorugby(sql)
	return clubhouse
}
