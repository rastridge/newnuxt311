const CONFIG = useRuntimeConfig()
const { doDBQueryDatestring } = useQuery()

export const archivesService = {
	getAll,
	getAllCurrent,
	getOne,
	addOne,
	editOne,
	deleteOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
									archive_id,
									archive_id as id,
									archive_title,
									archive_title as title,
									archive_date,
									archive_date as dt,
									archive_description,
									archive_filepath,
									archive_category,									
									status,
									deleted,
									deleted_dt,
									created_dt,
									modified_dt
                FROM
									inbrc_archive
                WHERE
									deleted = 0
                ORDER BY dt DESC`

	const archive = await doDBQueryDatestring(sql)

	return archive
}

async function getAllCurrent() {
	const sql = `SELECT
										archive_id,
										archive_id as id,
										archive_title,
										archive_title as title,
                    archive_date,
                    archive_date as dt,
                    archive_description,
										archive_filepath,
										archive_category,
										status,
										deleted,
										deleted_dt,
										created_dt,
										modified_dt
                FROM
                    inbrc_archive
                WHERE
                    deleted = 0
                    AND
                    status = 1
                ORDER BY dt DESC`
	const archive = await doDBQueryDatestring(sql)
	return archive
}

async function getOne(id) {
	const sql =
		`select 
				archive_id,
				archive_id as id,
				archive_title,
				archive_title as title,
				archive_date,
				archive_description,
				archive_filepath,
				archive_category
		from inbrc_archive
		where archive_id = ` + id

	const archive = await doDBQueryDatestring(sql)
	return archive[0]
}

async function addOne({
	archive_title,
	archive_date,
	archive_description,
	archive_filepath,
	archive_category,
}) {
	const sql = `INSERT INTO inbrc_archive SET
								archive_title = ?,
								archive_date = ?,
								archive_description = ?,
								archive_filepath = ?,
								archive_category = ?,
								created_dt = NOW(),
								modified_dt= NOW()`
	let inserts = []
	inserts.push(
		archive_title,
		archive_date,
		archive_description,
		archive_filepath,
		archive_category
	)
	const archive = await doDBQueryDatestring(sql, inserts)
	return archive
}

async function editOne({
	id,
	archive_title,
	archive_date,
	archive_description,
	archive_filepath,
	archive_category,
}) {
	const sql = `UPDATE inbrc_archive SET
								archive_title = ?,
								archive_date = ?,
								archive_description = ?,
								archive_filepath = ?,
								archive_category = ?,
								modified_dt= NOW()
							WHERE archive_id = ?`
	let inserts = []
	inserts.push(
		archive_title,
		archive_date,
		archive_description,
		archive_filepath,
		archive_category,
		id
	)
	const archive = await doDBQueryDatestring(sql, inserts)
	return archive
}

async function deleteOne(id) {
	const sql = `UPDATE inbrc_archive SET deleted = 1, deleted_dt = NOW() WHERE archive_id = ${id}`
	const archive = await doDBQueryDatestring(sql)

	return archive
}

async function changeStatus({ id, status }) {
	const sql = `UPDATE inbrc_archive SET status = ${status} WHERE archive_id = ${id}`
	const archive = await doDBQueryDatestring(sql)

	return archive
}
