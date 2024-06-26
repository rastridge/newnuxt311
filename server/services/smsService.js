const { doDBQueryBuffalorugby } = useQuery()
const { sendOneSMS } = useSMS()
const { typeMatch } = useMatch()

export const smsService = {
	getAll,
	sendSMS,
	getOne,
	addOne,
	editOne,
	deleteOne,
	changeStatus,
	getRecipientTypes,
}

async function getAll() {
	const sql = `SELECT
								sms_id,
								sms_id as id,
								admin_user_id,
								sms_member_type_id ,
								sms_recipient_type_id,
								sms_subject,
								sms_subject as title,
								sms_body_text,
								sms_sent as sent_dt,
								sms_send_complete,
								sms_recp_cnt,
								sms_err_cnt,
								sms_send_status,
								status,
								deleted,
								deleted_dt,
								created_dt,
								modified_dt,
								modified_dt as dt
							FROM
								inbrc_sms
							WHERE
								deleted = 0
							ORDER BY dt DESC`

	const result = await doDBQueryBuffalorugby(sql)
	return result
}

async function sendSMS({ sms_id, sms_body_text, sms_recipient_type_id }) {
	// get all active accounts marked sms_recipient
	const sql = `SELECT
									member_type_id,
									member_type2_id,
									account_addr_phone,
									mail_recipient,
									newsletter_recipient,
									sms_recipient
								FROM inbrc_accounts
								WHERE deleted = 0 AND status = 1 AND sms_recipient = 1
								ORDER BY account_addr_phone ASC`

	const accounts = await doDBQueryBuffalorugby(sql)
	//
	// make recipients list
	//
	function setSMSRecipients(accounts, recipient_type_id) {
		/* 
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
			// return el.status && !el.deleted && el.newsletter_recipient && include
			return include
		}
		 */
		return accounts.filter(function (account) {
			// return newsletterTypeMemberMatch(recipient_type_id, account)
			return typeMatch(recipient_type_id, account)
		})
	}

	// filter match member types with recipient types
	const sms_recipients = setSMSRecipients(accounts, sms_recipient_type_id)

	const rec_cnt = sms_recipients.length
	sms_recipients.forEach(function (recipient) {
		sendOneSMS(recipient, sms_body_text)
	})

	const sql2 = `UPDATE inbrc_sms
						SET
							sms_send_status = 3,
							sms_sent = NOW(),
							sms_send_complete = NOW(),
							sms_recp_cnt = ${rec_cnt}
						WHERE sms_id = ${sms_id}`

	await doDBQueryBuffalorugby(sql2)
	return sms_recipients
}
//
//
//
async function getOne(id) {
	const sql = `select * from inbrc_sms where sms_id = ` + id
	const result = await doDBQueryBuffalorugby(sql)
	return result[0]
}

async function addOne({
	sms_recipient_type_id,
	admin_user_id,
	sms_subject,
	sms_body_text,
}) {
	var sql = `INSERT INTO inbrc_sms SET
								sms_recipient_type_id = ?,
                admin_user_id = ?,
                sms_subject = ?,
                sms_body_text = ?,
                sms_send_status = 0,
								status = 1,
                created_dt = NOW(),
                modified_dt= NOW()`

	var inserts = []
	inserts.push(sms_recipient_type_id, admin_user_id, sms_subject, sms_body_text)
	const sms = await doDBQueryBuffalorugby(sql, inserts)
	return sms
}

async function editOne({
	sms_id,
	sms_recipient_type_id,
	admin_user_id,
	sms_subject,
	sms_body_text,
	sms_sent,
	sms_send_complete,
	sms_send_status,
}) {
	var sql = `UPDATE inbrc_sms SET
							sms_recipient_type_id = ?,
							admin_user_id = ?,
							sms_subject = ?,
							sms_body_text = ?,
							sms_sent = ?,
							sms_send_complete = ?,
							sms_send_status = ?,
							modified_dt= NOW()
						WHERE sms_id = ?`
	var inserts = []
	inserts.push(
		sms_recipient_type_id,
		admin_user_id,
		sms_subject,
		sms_body_text,
		sms_sent,
		sms_send_complete,
		sms_send_status,
		sms_id
	)
	const result = await doDBQueryBuffalorugby(sql, inserts)
	return result
}

async function deleteOne(id) {
	const sql =
		`UPDATE inbrc_sms SET deleted=1, deleted_dt= NOW() WHERE sms_id = ` + id
	const result = await doDBQueryBuffalorugby(sql)
	return result
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_sms SET status = "` + status + `" WHERE sms_id = ` + id
	const result = await doDBQueryBuffalorugby(sql)
	return result
}

async function getRecipientTypes() {
	const sql = `SELECT * FROM inbrc_newsletter_recipient_types WHERE 1`
	const result = await doDBQueryBuffalorugby(sql)
	return result
}
