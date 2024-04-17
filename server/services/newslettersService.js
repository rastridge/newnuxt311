import mysql from 'mysql2/promise'

/* const {
	DB_DATABASE,
	DB_PASSWORD,
	DB_USER,
	DB_HOST,
	FROM,
	FROM_NAME,
	EE_API_KEY,
} = useRuntimeConfig() */

const { doDBQueryBuffalorugby } = useQuery()
const { getConnectionBuffalorugby } = useDBConnection()
const { sendNewsletters } = useEmail()

export const newslettersService = {
	getAll,
	getAllCurrent,
	getYear,
	sendNewsletter,
	trackNewsletter,
	getOne,
	addOne,
	editOne,
	deleteOne,
	changeStatus,
	getRecipientTypes,
}

async function getAll() {
	const sql = `SELECT
								newsletter_id,
								newsletter_id as id,
								newsletter_recipient_type_id,
								admin_user_id,
								newsletter_subject as title,
								newsletter_sent as sent_dt,
								status,
								deleted,
								deleted_dt,
								created_dt,
								modified_dt,
								modified_dt as dt
							FROM
								inbrc_newsletters
							WHERE
								deleted = 0
							ORDER BY dt DESC`

	const newsletter = await doDBQueryBuffalorugby(sql)
	return newsletter
}

async function getAllCurrent() {
	const sql = `SELECT
								newsletter_id,
								newsletter_id as id,
								newsletter_recipient_type_id,
								admin_user_id,
								newsletter_subject as title,
								newsletter_sent as sent_dt,
								newsletter_body_html,
								status,
								deleted,
								deleted_dt,
								created_dt,
								modified_dt,
								modified_dt as dt
							FROM
								inbrc_newsletters
							WHERE
								deleted = 0
								AND
								status = 1
							ORDER BY dt DESC`

	const newsletter = await doDBQueryBuffalorugby(sql)
	return newsletter
}

async function getYear(year) {
	const sql = `SELECT
					newsletter_id,
					newsletter_id as id,
					newsletter_recipient_type_id,
					admin_user_id,
					newsletter_subject,
					newsletter_subject as title,
					newsletter_sent as sent_dt,
					status,
					deleted,
					deleted_dt,
					created_dt,
					modified_dt,
					modified_dt as dt
				FROM
					inbrc_newsletters
				WHERE
					deleted = 0
					AND
					YEAR(created_dt) = ${year}
				ORDER BY
          dt DESC`
	const newsletters = await doDBQueryBuffalorugby(sql)
	return newsletters
}

// Define function to add footer, compose and send newsletters
//
async function sendNewsletter({
	newsletter_id,
	newsletter_body_html,
	newsletter_subject,
	newsletter_recipient_type_id,
}) {
	// get all active accounts
	const sql = `SELECT
						a.account_id as id,
						a.account_id,
						member_type_id,
						member_type2_id,
						member_firstname,
						member_lastname,
						CONCAT(member_firstname," ", member_lastname) as title,
						member_year,
						member_prev_club,
						account_email,
						account_email_opening,
						account_textmsg_opening,
						account_addr_street,
						account_addr_street_ext,
						account_addr_city,
						account_addr_state,
						account_addr_country,
						account_addr_postal,
						account_addr_phone,
						newsletter_recipient,
						mail_recipient,
						sms_recipient,
						a.modified_dt,
						a.modified_dt as dt,
						a.status
					FROM inbrc_accounts a
					WHERE deleted = 0
					ORDER BY account_email ASC`
	const accounts = await doDBQueryBuffalorugby(sql)

	// define function to filter match member types with recipient types
	//
	function setNewsletterRecipients(accounts, recipient_type_id) {
		function newsletterTypeMemberMatch(recipient_type_id, el) {
			recipient_type_id = parseInt(recipient_type_id)
			const member_type_id = parseInt(el.member_type_id)
			const member_type2_id = parseInt(el.member_type2_id)
			let include = false
			switch (recipient_type_id) {
				// All
				case 1:
					if (
						member_type_id === 2 ||
						member_type_id === 3 ||
						member_type_id === 5 ||
						member_type_id === 6
					)
						include = true
					break
				// active
				case 2:
					if (member_type_id === 2) include = true
					break
				// alumni
				case 3:
					if (member_type_id === 3) include = true
					break
				// sponsor - might also be active player !
				case 4:
					if (member_type_id === 4 || member_type2_id === 4) include = true
					break
				// special
				case 5:
					if (member_type_id === 5) include = true
					break
				// development
				case 6:
					if (member_type_id === 6) include = true
					break
				// local alumni
				case 7:
					if (
						member_type_id === 3 &&
						el.account_addr_postal.indexOf('14') === 0
					)
						include = true
					break
				// pending
				case 9:
					if (member_type_id === 9) include = true
					break
				// other
				case 10:
					if (member_type_id === 10) include = true
					break
				// flag
				case 11:
					if (member_type_id === 11) include = true
					break
				// testing
				case 13:
					if (member_type_id === 13) include = true
					break
				// marked for mail/calendar no donations
				case 14:
					if (
						member_type_id === 3 && // alumni
						el.mail_recipient === 1 && // marked for mail/calendar
						el.donated == 0 // no donations
					)
						include = true
					break
			}
			return el.status && !el.deleted && el.newsletter_recipient && include
		}
		return accounts.filter(function (el) {
			return newsletterTypeMemberMatch(recipient_type_id, el)
		})
	}
	// Call function to make recipients list
	//
	const recipients = setNewsletterRecipients(
		accounts,
		newsletter_recipient_type_id
	)
	// Calls server/utils/ useEmail composable sendNewsletters to send newsletters
	//
	const r = await sendNewsletters(
		recipients,
		newsletter_subject,
		newsletter_body_html,
		newsletter_id
	)
	// log the email send
	//
	const sql2 = `UPDATE inbrc_newsletters
								SET
									newsletter_sent = NOW(),
									newsletter_send = NOW(),
									newsletter_send_complete = NOW(),
									newsletter_send_status = 3,
									newsletter_opened_cnt = 0,
									newsletter_recp_cnt = ${recipients.length}
								WHERE
									newsletter_id = ${newsletter_id}`

	await doDBQueryBuffalorugby(sql2)
	return r
}
//
//
//
async function getOne(id) {
	const sql = `select * from inbrc_newsletters where newsletter_id = ` + id
	const newsletter = await doDBQueryBuffalorugby(sql)
	return newsletter[0]
}

async function trackNewsletter(query) {
	// console.log('IN newsletterService query = ', query)
	const conn = await getConnectionBuffalorugby()

	try {
		await conn.query('START TRANSACTION')

		// update member last email opened date
		let sql = `UPDATE inbrc_accounts
					SET
						account_email_opening = NOW()
					WHERE
						account_id = ?`

		let inserts = []
		inserts.push(query.account_id)
		sql = mysql.format(sql, inserts)
		await conn.execute(sql)

		// Check if Newsletter already logged for this account in _newsletter_openings ?
		sql = `SELECT
							count(*) as cnt
						FROM
							inbrc_newsletter_openings
						WHERE
							newsletter_id = ? AND account_id = ?`

		inserts = []
		inserts.push(query.newsletter_id, query.account_id)
		sql = mysql.format(sql, inserts)
		let [rows] = await conn.execute(sql)
		let cnt = rows[0].cnt

		// IF not already counted as opened
		if (!cnt) {
			sql = `INSERT INTO inbrc_newsletter_openings
							SET
								newsletter_id = ?,
								account_id = ?,
								newsletter_opened_date = NOW()`

			inserts = []
			inserts.push(query.newsletter_id, query.account_id)
			sql = mysql.format(sql, inserts)
			await conn.execute(sql)
		}
		sql = `UPDATE inbrc_newsletters
					SET
						newsletter_opened_cnt = newsletter_opened_cnt + 1
					WHERE
						newsletter_id = ?`

		inserts = []
		inserts.push(query.newsletter_id)
		sql = mysql.format(sql, inserts)
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

async function addOne({
	newsletter_recipient_type_id,
	admin_user_id,
	newsletter_subject,
	newsletter_body_text,
	newsletter_body_html,
}) {
	let sql = `INSERT INTO inbrc_newsletters SET
								newsletter_recipient_type_id = ?,
                admin_user_id = ?,
                newsletter_subject = ?,
                newsletter_body_text = ?,
                newsletter_body_html = ?,
                newsletter_send_status = 0,
								status = 1,
                created_dt = NOW(),
                modified_dt= NOW()`

	let inserts = []
	inserts.push(
		newsletter_recipient_type_id,
		admin_user_id,
		newsletter_subject,
		newsletter_body_text,
		newsletter_body_html
	)
	const newsletter = await doDBQueryBuffalorugby(sql, inserts)
	return newsletter
}

async function editOne({
	newsletter_id,
	newsletter_recipient_type_id,
	admin_user_id,
	newsletter_subject,
	newsletter_body_text,
	newsletter_body_html,
	newsletter_sent,
	newsletter_send_complete,
	newsletter_send_status,
}) {
	let sql = `UPDATE inbrc_newsletters SET
							newsletter_recipient_type_id = ?,
							admin_user_id = ?,
							newsletter_subject = ?,
							newsletter_body_text = ?,
							newsletter_body_html = ?,
							newsletter_sent = ?,
							newsletter_send_complete = ?,
							newsletter_send_status = ?,
							modified_dt= NOW()
						WHERE newsletter_id = ?`
	let inserts = []
	inserts.push(
		newsletter_recipient_type_id,
		admin_user_id,
		newsletter_subject,
		newsletter_body_text,
		newsletter_body_html,
		newsletter_sent,
		newsletter_send_complete,
		newsletter_send_status,
		newsletter_id
	)
	const newsletter = await doDBQueryBuffalorugby(sql, inserts)

	return newsletter
}

async function deleteOne(id) {
	const conn = await getConnectionBuffalorugby()

	try {
		await conn.query('START TRANSACTION')

		let sql = `UPDATE inbrc_newsletters SET deleted=1, deleted_dt= NOW() WHERE newsletter_id = ${id}`
		await conn.execute(sql)

		sql = `UPDATE inbrc_newsletter_openings SET deleted = 1 WHERE newsletter_id = ${id}`
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

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_newsletters SET status = "` +
		status +
		`" WHERE newsletter_id = ` +
		id
	const newsletter = await doDBQueryBuffalorugby(sql)

	return newsletter
}

async function getRecipientTypes() {
	const sql = `SELECT * FROM inbrc_newsletter_recipient_types WHERE 1`
	const recipienttypes = await doDBQueryBuffalorugby(sql)
	return recipienttypes
}
