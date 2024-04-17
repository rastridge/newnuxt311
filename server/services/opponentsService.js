import mysql from 'mysql2/promise'
const { doDBQueryBuffalorugby } = useQuery()
const { getConnectionBuffalorugby } = useDBConnection()

export const opponentsService = {
	getAll,
	getAllCurrent,
	getSuggestions,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
					opponent_id,
					opponent_id as id,
					opponent_name,
					opponent_name as title,
					opponent_location,
					opponent_type,
					opponent_level,
					opponent_description,
					status,
					deleted,
					created_dt,
					modified_dt,
					modified_dt as dt
			FROM
					inbrc_opponents
			WHERE
					deleted = 0
			ORDER BY
				opponent_name ASC`

	const opponents = await doDBQueryBuffalorugby(sql)
	return opponents
}
async function getAllCurrent() {
	const sql = `SELECT
									opponent_id,
									opponent_id as id,
									opponent_name,
									opponent_name as title,
									opponent_location,
									opponent_type,
									opponent_level,
									opponent_description,
									status,
									deleted,
									created_dt,
									modified_dt,
									modified_dt as dt
							FROM
									inbrc_opponents
							WHERE
									deleted = 0
									AND
									status = 1
							ORDER BY
								opponent_name ASC`

	const opponents = await doDBQueryBuffalorugby(sql)
	return opponents
}

async function getSuggestions() {
	const sql = `SELECT
									opponent_id as id,
									opponent_id,
									opponent_name
							FROM inbrc_opponents
							WHERE deleted = 0 AND status = 1
							ORDER BY opponent_name ASC`

	const suggestions = await doDBQueryBuffalorugby(sql)
	return suggestions
}

async function getOne(id) {
	const sql = `SELECT
								opponent_id,
								opponent_id as id,
								opponent_name,
								opponent_location,
								opponent_type,
								opponent_level,
								opponent_description,
								status,
								deleted,
								created_dt,
								modified_dt
						FROM
								inbrc_opponents
						WHERE
								deleted = 0
								AND
								opponent_id = ${id}`

	const opponents = await doDBQueryBuffalorugby(sql)
	return opponents[0]
}

async function editOne(item) {
	const sql = `UPDATE inbrc_opponents
				SET
					opponent_name = ?,
					opponent_location = ?,
					opponent_type = ?,
					opponent_level = ?,
					opponent_description = ?,
					modified_dt= NOW()
				WHERE opponent_id = ?`

	let inserts = []
	inserts.push(
		item.opponent_name,
		item.opponent_location,
		item.opponent_type,
		item.opponent_level,
		item.opponent_description,
		item.id
	)
	const opponents = await doDBQueryBuffalorugby(sql, inserts)
	return opponents
}

async function addOne(item) {
	const sql = `INSERT INTO inbrc_opponents
				SET
				opponent_id = ?,
				opponent_name = ?,
				opponent_location = ?,
				opponent_type = ?,
				opponent_level = ?,
				opponent_description = ?,
				status = 1,
				deleted = 0,
				created_dt = NOW(),
				modified_dt = NOW()`

	let inserts = []
	inserts.push(
		item.opponent_id,
		item.opponent_name,
		item.opponent_location,
		item.opponent_type,
		item.opponent_level,
		item.opponent_description
	)
	const opponents = await doDBQueryBuffalorugby(sql, inserts)
	return opponents
}

async function deleteOne(id) {
	let message = null
	const conn = await getConnectionBuffalorugby()
	try {
		await conn.query('START TRANSACTION')

		//
		// check for games with opponent
		// if so do not delete
		//
		let sql = `SELECT
				count(*) as used
			FROM
				inbrc_stats_games
			WHERE
				opponent_id = ${id}
				AND deleted = '0';`
		let inserts = []
		sql = mysql.format(sql, inserts)

		const games = await conn.execute(sql)
		const used = games[0][0].used

		if (used === 0) {
			sql = `UPDATE inbrc_opponents
							SET
									deleted = '1',
									deleted_dt= NOW()
								WHERE opponent_id = ?;`
			inserts = []
			inserts.push(id)
			sql = mysql.format(sql, inserts)
			await conn.execute(sql)
		} else {
			message = 'Opponent is in a game, cannot delete'
		}

		await conn.query('COMMIT')
		await conn.end()
		return message
	} catch (e) {
		await conn.query('ROLLBACK')
		await conn.end()
		return 'ROLLBACK ' + e
	}
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_opponents SET status = "` +
		status +
		`" WHERE opponent_id = ` +
		id
	const opponents = await doDBQueryBuffalorugby(sql)
	return opponents
}
