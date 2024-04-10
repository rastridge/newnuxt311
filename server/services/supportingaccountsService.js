const { doDBQueryBuffalorugby } = useQuery()
export const supportingaccountsService = {
	getAll,
	getAllCurrent,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
									supportingApp_id,
									supportingApp_id as id,
									supportingApp_name,
									supportingApp_name as title,
									supportingApp_description,
									supportingApp_url,
									supportingApp_owner,
									supportingApp_username,
									supportingApp_password,
									status,
									deleted,
									deleted_dt,
									modified_dt,
									modified_dt as dt
                FROM inbrc_supportingaccts
                WHERE deleted = 0
                ORDER BY title ASC`

	const supportingaccounts = await doDBQueryBuffalorugby(sql)
	return supportingaccounts
}

async function getAllCurrent() {
	const sql = `SELECT
								supportingApp_id,
								supportingApp_id as id,
								supportingApp_name,
								supportingApp_name as title,
								supportingApp_description,
								supportingApp_url,
								supportingApp_owner,
								supportingApp_username,
								supportingApp_password,
								status,
								deleted,
								deleted_dt,
								modified_dt,
								modified_dt as dt
							FROM inbrc_supportingaccts
							WHERE
								deleted = 0
								AND
								STATUS = 1`

	const supportingaccounts = await doDBQueryBuffalorugby(sql)
	return supportingaccounts
}

async function getOne(id) {
	const sql = `SELECT 	
									supportingApp_id,
									supportingApp_id as id,
									supportingApp_name,
									supportingApp_name as title,
									supportingApp_description,
									supportingApp_url,
									supportingApp_owner,
									supportingApp_username,
									supportingApp_password
							FROM 
								inbrc_supportingaccts 
							WHERE 
								supportingApp_id=${id}`

	const supportingaccounts = await doDBQueryBuffalorugby(sql)
	return supportingaccounts[0]
}

async function addOne({
	supportingApp_name,
	supportingApp_description,
	supportingApp_url,
	supportingApp_owner,
	supportingApp_username,
	supportingApp_password,
}) {
	const sql = `INSERT INTO 
								inbrc_supportingaccts
              SET
								supportingApp_name = ?,
								supportingApp_description = ?,
								supportingApp_url = ?,
								supportingApp_owner = ?,
								supportingApp_username = ?,
								supportingApp_password = ?,
								STATUS = 1,
								deleted = 0,
								created_dt = NOW(),
								modified_dt = NOW()`

	let inserts = []
	inserts.push(
		supportingApp_name,
		supportingApp_description,
		supportingApp_url,
		supportingApp_owner,
		supportingApp_username,
		supportingApp_password
	)
	const supportingaccounts = await doDBQueryBuffalorugby(sql, inserts)
	return supportingaccounts
}

async function editOne({
	supportingApp_name,
	supportingApp_description,
	supportingApp_url,
	supportingApp_owner,
	supportingApp_username,
	supportingApp_password,
	id,
}) {
	const sql = `UPDATE inbrc_supportingaccts SET
									supportingApp_name = ?,
									supportingApp_description = ?,
									supportingApp_url = ?,
									supportingApp_owner = ?,
									supportingApp_username = ?,
									supportingApp_password = ?,
									modified_dt= NOW()
								WHERE supportingApp_id = ?`
	let inserts = []

	inserts.push(
		supportingApp_name,
		supportingApp_description,
		supportingApp_url,
		supportingApp_owner,
		supportingApp_username,
		supportingApp_password,
		id
	)
	const supportingaccounts = await doDBQueryBuffalorugby(sql, inserts)
	return supportingaccounts
}

async function deleteOne(id) {
	const sql = `UPDATE inbrc_supportingaccts SET deleted=1, deleted_dt=NOW() WHERE supportingApp_id=${id}`
	const supportingaccounts = await doDBQueryBuffalorugby(sql)
	return supportingaccounts
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_supportingaccts SET STATUS = "` +
		status +
		`" WHERE supportingApp_id  = ` +
		id
	const supportingaccounts = await doDBQueryBuffalorugby(sql)
	return supportingaccounts
}
