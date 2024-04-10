import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const { sendEmail } = useEmail()
const { doDBQueryBuffalorugby } = useQuery()
const { getConnectionBuffalorugby } = useDBConnection()

const CONFIG = useRuntimeConfig()

export const usersService = {
	authenticate,
	getAll,
	getOne,
	addOne,
	editOne,
	getApps,
	getAppPerms,
	_setPerms,
	// initPerms,
	resetRequest,
	resetPassword,
	deleteOne,
	changeStatus,
}

/***************************************** */
/*              _setPerms                  */
/*                                         */
/***************************************** */
async function _setPerms(aPerms, id) {
	const sql = `DELETE
            FROM
                inbrc_admin_perms
            WHERE
                admin_user_id = ${id}`

	await doDBQueryBuffalorugby(sql)

	// loop through permissions array
	aPerms.forEach(myFunction)

	// add new permission record
	async function myFunction(value, index) {
		const sql = `INSERT
								INTO inbrc_admin_perms
										(
												admin_user_id,
												admin_app_id,
												admin_perm
										) values (
												${value.admin_user_id},
												${value.admin_app_id},
												${value.admin_perm}
										)`
		await doDBQueryBuffalorugby(sql)
	}
	return true
}
/***************************************** */
/*              _getPerms                  */
/***************************************** */

async function _getPerms(id) {
	// need this to include app name in perms
	const sql = `SELECT
								p.admin_perm_id, a.admin_app_id, a.admin_app_name, p.admin_perm, u.admin_user_id
							FROM
								inbrc_admin_perms p, inbrc_admin_apps a, inbrc_admin_users u
							WHERE
								a.admin_app_id = p.admin_app_id
								AND
								u.admin_user_id = p.admin_user_id
								AND
								p.admin_user_id  = ${id}
								ORDER BY a.admin_app_name ASC`

	const perms = await doDBQueryBuffalorugby(sql)

	return perms
}
/***************************************** */
/*              authenicate                */
/***************************************** */
async function authenticate({ username, password }) {
	const lc_admin_user_name = username.toLowerCase()
	const sql = `SELECT *
								FROM inbrc_admin_users
								WHERE deleted = 0`

	const users = await doDBQueryBuffalorugby(sql)

	let user = users.find((u) => {
		let match = false

		if (
			u.admin_user_name === lc_admin_user_name &&
			bcrypt.compareSync(password, u.admin_user_pass)
		) {
			match = true
		} else {
			match = false
		}
		return match
	})

	if (user) {
		user.match = true

		// there is a user with matching username and password
		// add permissions to user
		const perms = await _getPerms(user.admin_user_id)
		user.perms = perms
		const token = await jwt.sign(user.admin_user_id, CONFIG.API_SECRET)
		user.token = token
	} else {
		user = { match: false }
	}
	return user
}
/***************************************** */
/*              getAll                     */
/***************************************** */

async function getAll() {
	const sql = `SELECT
									admin_user_name as title,
									modified_dt as dt,
									admin_user_id as id,
									STATUS as status
								FROM inbrc_admin_users
								WHERE deleted = 0
								ORDER BY dt DESC`
	const users = await doDBQueryBuffalorugby(sql)

	return users
}
/***************************************** */
/*              getOne                     */
/***************************************** */
async function getOne(id) {
	const sql = `SELECT 
								admin_user_id,
								admin_user_name,
								admin_user_email
							FROM
								inbrc_admin_users
							WHERE 
								admin_user_id = ${id}`

	const user = await doDBQueryBuffalorugby(sql)
	const perms = await _getPerms(id)
	let jsObj2 = perms
	let jsObj = user[0]
	jsObj.perms = jsObj2
	return jsObj
}

async function deleteOne(id) {
	const conn = await getConnectionBuffalorugby()
	try {
		await conn.query('START TRANSACTION')

		let sql = `DELETE FROM inbrc_admin_users
								WHERE admin_user_id= ${id}`
		await conn.execute(sql)

		sql = `DELETE FROM inbrc_admin_perms WHERE admin_user_id = ${id}`
		await conn.execute(sql)

		await conn.query('COMMIT')
		await conn.end()
		return 'COMMIT'
	} catch (e) {
		await conn.query('ROLLBACK')
		await conn.end()
		return 'ROLLBACK ' + e
	}
}

/***************************************** */
/*              addOne                     */
/***************************************** */
async function addOne({ admin_user_name, password, admin_user_email, perms }) {
	const conn = await getConnectionBuffalorugby()
	try {
		await conn.query('START TRANSACTION')

		// check for existing username or email
		let sql = `select *
							from inbrc_admin_users
							where deleted = 0`
		const [rows, fields] = await conn.execute(sql)
		const users = rows

		const lc_admin_user_name = admin_user_name.toLowerCase()
		const lc_admin_user_email = admin_user_email.toLowerCase()

		let user = users.find(
			(u) =>
				u.admin_user_name === lc_admin_user_name ||
				u.admin_user_email === lc_admin_user_email
		)
		let msg = null
		if (!user) {
			// no other users with same username or email
			// hash password
			const saltRounds = 10
			const salt = bcrypt.genSaltSync(saltRounds)
			const hashedpassword = bcrypt.hashSync(password, salt)
			// inser new user
			let sql = `INSERT INTO
										inbrc_admin_users
									SET
										admin_user_name  = ?,
										admin_user_pass  = ?,
										admin_user_email  = ?,
										status = 1,
										created_dt = NOW(),
										modified_dt = NOW()`

			let inserts = []
			inserts.push(lc_admin_user_name, hashedpassword, lc_admin_user_email)
			sql = mysql.format(sql, inserts)
			const [rows, fields] = await conn.execute(sql)
			user = rows
			// save id of new user
			const id = user.insertId

			// initial permissions with view only

			for (let p of perms) {
				sql = `INSERT INTO 
									inbrc_admin_perms
								SET
									admin_user_id = ?,
									admin_app_id = ?,
									admin_perm = ?`

				inserts = []
				inserts.push(id, p.admin_app_id, p.admin_perm)
				sql = mysql.format(sql, inserts)

				await conn.execute(sql)
			}
			// sendEmail(
			// 	'ron.astridge@me.com',
			// 	'Buffalo Rugby Club Admin Account Modification',
			// 	'An account for user ' +
			// 		lc_admin_user_name +
			// 		'  has been created, password = ' +
			// 		password +
			// 		' email = ' +
			// 		lc_admin_user_email
			// )
		} else {
			msg =
				'A user with username ' +
				lc_admin_user_name +
				' or email ' +
				lc_admin_user_email +
				' already exists'
			// sendEmail(
			// 	'ron.astridge@me.com',
			// 	'Buffalo Rugby Club Admin Account Modification',
			// 	'A user with username ' +
			// 		lc_admin_user_name +
			// 		' or email ' +
			// 		lc_admin_user_email +
			// 		' already exists'
			// )
		}

		await conn.query('COMMIT')
		await conn.end()
		return { message: msg }
	} catch (e) {
		await conn.query('ROLLBACK')
		await conn.end()
		return 'ROLLBACK ' + e
	}
}
/***************************************** */
/*              editOne                    */
/***************************************** */

async function editOne(info) {
	const { admin_user_id, admin_user_name, admin_user_email, perms, password } =
		info

	const conn = await getConnectionBuffalorugby()
	try {
		await conn.query('START TRANSACTION')
		/*
		// check for existing admin_user_name or admin_user_email
		*/
		let sql = `SELECT *
							FROM inbrc_admin_users
							WHERE
								deleted = 0 AND admin_user_id !=  ${admin_user_id}`
		const [rows, fields] = await conn.execute(sql)
		const users = rows

		const lc_admin_username = admin_user_name.toLowerCase()
		const lc_admin_user_email = admin_user_email.toLowerCase()

		const user_conflict = users.find((u) => {
			return (
				u.admin_user_name === lc_admin_username ||
				u.admin_user_email === lc_admin_user_email
			)
		})

		/*
			// if new info is not in conflict with existing admin users
		*/
		let msg = null
		if (!user_conflict) {
			/*
			// if updated (edit) password
			*/
			if (password.length > 0) {
				// Change password
				const saltRounds = 10
				const salt = bcrypt.genSaltSync(saltRounds)
				const new_admin_user_pass = bcrypt.hashSync(password, salt)
				sql = `UPDATE inbrc_admin_users
								SET
										admin_user_name = ?,
										admin_user_email = ?,
										admin_user_pass = ?,
										modified_dt= NOW()
								WHERE
										admin_user_id = ?`

				let inserts = []
				inserts.push(
					lc_admin_username,
					lc_admin_user_email,
					new_admin_user_pass,
					admin_user_id
				)
				sql = mysql.format(sql, inserts)

				await conn.execute(sql)
			} else {
				// no new password
				// just update other info
				sql = `UPDATE inbrc_admin_users
							SET
									admin_user_name = ?,
									admin_user_email = ?,
									modified_dt= NOW()
							WHERE
									admin_user_id = ?`
				let inserts = []
				inserts.push(lc_admin_username, lc_admin_user_email, admin_user_id)
				sql = mysql.format(sql, inserts)
				await conn.execute(sql)
			}
			/*
				// updates done
				//
				// update user perms by deleting records - creating new
				//
			*/

			sql = `DELETE
						FROM
							inbrc_admin_perms
						WHERE
							admin_user_id = ${admin_user_id}`
			await conn.execute(sql)

			for (let p of perms) {
				sql = `INSERT
							INTO inbrc_admin_perms
								(
									admin_user_id,
									admin_app_id,
									admin_perm
								) values (
									${p.admin_user_id},
									${p.admin_app_id},
									${p.admin_perm}
								)`
				await conn.execute(sql)
			}

			// send email notification
			//
			// sendEmail(
			// 	'ron.astridge@me.com',
			// 	'BRC Admin Account Modification',
			// 	'The account for admin user ' +
			// 		lc_admin_username +
			// 		'  has been modified'
			// )
		} else {
			msg =
				'An admin with this username ' +
				lc_admin_username +
				' or email ' +
				lc_admin_user_email +
				' already exists'
		}
		/* 		msg =
			'An admin with this username ' +
			lc_admin_username +
			' or email ' +
			lc_admin_user_email +
			' already exists'
		console.log('IN userservice 4 ', 'msg = ', msg) */

		await conn.query('COMMIT')
		await conn.end()
		return { message: msg }
		// return 'msg'
	} catch (e) {
		await conn.query('ROLLBACK')
		await conn.end()
		return 'ROLLBACK ' + e
	}
}
/***************************************** */
/*              changeStatus               */
/*                                         */
/***************************************** */
async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_admin_users SET STATUS = "` +
		status +
		`" WHERE admin_user_id  = ` +
		id
	const user = await doDBQueryBuffalorugby(sql)

	return user
}
/***************************************** */
/*              getApps                    */
/*                                         */
/***************************************** */
async function getApps() {
	const sql = `SELECT
                    admin_app_id,
                    admin_app_name
                FROM inbrc_admin_apps
                ORDER BY
                    admin_app_name`

	const apps = await doDBQueryBuffalorugby(sql)

	return apps
}
/***************************************** */
/*              initPerms                  */
/*                                         */
/***************************************** */
/* async function initPerms() {
	const sql = `SELECT
								admin_app_id,
								admin_app_name
							FROM
								inbrc_admin_apps
							WHERE 1 
							ORDER BY
                    admin_app_id`

	const perms = await doDBQueryBuffalorugby(sql)

	return perms
}
 */ /***************************************** */
/*              getAppPerms                */
/*                                         */
/***************************************** */
async function getAppPerms() {
	const sql = `SELECT
								admin_perm,
								admin_app_name,
								u.admin_user_id
							FROM
								inbrc_admin_apps as a,
								inbrc_admin_perms as p,
								inbrc_admin_users as u
							WHERE
								a.admin_app_id = p.admin_app_id
								AND
								p.admin_user_id = u.admin_user_id`

	const perms = await doDBQueryBuffalorugby(sql)

	return perms
}
/***************************************** */
/*              resetRequest               */
/*                                         */
/***************************************** */
async function resetRequest({ username }) {
	// Find out if matching username exists
	const sql = `SELECT
								COUNT(*) as cnt,
								admin_user_email
							FROM
								inbrc_admin_users
							WHERE
								admin_user_name = '${username}'`

	const rows = await doDBQueryBuffalorugby(sql)

	const cnt = rows[0].cnt
	const admin_user_email = rows[0].admin_user_email
	// if username exists
	if (cnt) {
		const msg =
			// 'To reset your user admin password <a href="https://main--peaceful-tarsier-458ff9.netlify.app/reset/' +
			'To reset your user admin password <a href="http://localhost:3000/reset/' +
			username +
			'" rel="noopener noreferrer" target="_blank" >Click here</a>'

		sendEmail(
			admin_user_email,
			'BRC Admin User Password Reset',
			'<h3>' + msg + '</h3>'
		)
	}
	return username
}

async function resetPassword({ username, password }) {
	// update user password
	const sql = `UPDATE inbrc_admin_users
					SET
						admin_user_pass = ?,
						modified_dt= NOW()
					WHERE
						admin_user_name = ?`

	const hashedpassword = await bcrypt.hashSync(password, 10)
	const inserts = []
	inserts.push(hashedpassword, username)
	const result = await doDBQueryBuffalorugby(sql, inserts)

	sendEmail(
		'ron.astridge@me.com',
		'BRC Member Account Modification',
		`<h3>The password has been changed for ${username}. The new password is "${password}"</h3>`
	)

	return 'Probably sent ok'
}
