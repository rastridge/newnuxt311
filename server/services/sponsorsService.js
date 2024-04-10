const { doDBQueryBuffalorugby } = useQuery()
export const sponsorsService = {
	getAll,
	getAllCurrent,
	getSponsorIds,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
									ad_client_id,
									ad_client_id as id,
									ad_client_name,
									ad_client_name as title,
									ad_client_contact,
									ad_client_email,
									ad_client_phone,
									ad_client_website,
									ad_image_path,
									status,
									deleted,
									deleted_dt,
									modified_dt,
									modified_dt as dt
                FROM inbrc_sponsors
                WHERE deleted = 0
                ORDER BY title ASC`

	const sponsors = await doDBQueryBuffalorugby(sql)
	return sponsors
}

async function getAllCurrent() {
	const sql = `SELECT
										ad_client_id,
										ad_client_id as id,
										ad_client_name,
										ad_client_name as title,
										ad_client_contact,
										ad_client_email,
										ad_client_phone,
										ad_client_website,
										ad_image_path,
										status,
										deleted,
										deleted_dt,
										modified_dt,
										modified_dt as dt
									FROM inbrc_sponsors
									WHERE
										deleted = 0
										AND
										STATUS = 1`

	const sponsors = await doDBQueryBuffalorugby(sql)
	return sponsors
}

async function getOne(id) {
	const sql = `select 	
								ad_client_id,
								ad_client_id as id,
								ad_client_name,
								ad_client_contact,
								ad_client_email,
								ad_client_phone,
								ad_client_website,
								ad_image_path
							from 
								inbrc_sponsors 
							where 
								ad_client_id=${id}`

	const sponsor = await doDBQueryBuffalorugby(sql)
	return sponsor[0]
}
async function getSponsorIds() {
	const sql = `SELECT
										ad_client_id as id
								FROM
										inbrc_sponsors
								WHERE
										deleted = 0 AND
								STATUS
										= 1`

	const adIds = await doDBQueryBuffalorugby(sql)
	return adIds
}
async function addOne({
	ad_client_name,
	ad_client_contact,
	ad_client_email,
	ad_client_phone,
	ad_client_website,
	ad_image_path,
}) {
	// check for other users with proposed email address
	let msg = null // will be returned with message if email exists
	const lc_ad_client_email = ad_client_email.toLowerCase()
	let sql = `select * from inbrc_sponsors where deleted = 0`
	const temp = await doDBQueryBuffalorugby(sql)
	const emailExists = temp.find(
		(u) => u.ad_client_email.toLowerCase() === lc_ad_client_email
	)

	if (!emailExists) {
		sql = `INSERT INTO inbrc_sponsors
						SET
						ad_client_name = ?,
						ad_client_contact = ?,
						ad_client_email = ?,
						ad_client_phone = ?,
						ad_client_website = ?,
						ad_image_path = ?,

						STATUS = 1,
						deleted = 0,
						created_dt = NOW(),
						modified_dt = NOW()`

		let inserts = []
		inserts.push(
			ad_client_name,
			ad_client_contact,
			lc_ad_client_email,
			ad_client_phone,
			ad_client_website,
			ad_image_path
		)
		const sponsor = await doDBQueryBuffalorugby(sql, inserts)

		/* const email = {
			from: FROM,
			fromName: FROM_NAME,
			to: 'ron.astridge@me.com',
			subject: 'BRC Member Account Modification',
			body_text: '',
			body_html: `<h3>An Buffalo Rugby Club sponsorship for ${ad_client_name} has been created. Email ${ad_client_email}</h3>`,
		}
		sendEmail(email) */
	} else {
		msg = `Sponsor with email ${lc_ad_client_email} already exists`
	}
	return { message: msg }
}
async function editOne({
	ad_client_name,
	ad_client_contact,
	ad_client_email,
	ad_client_phone,
	ad_client_website,
	ad_image_path,
	id,
}) {
	// check for other users with proposed email address
	let msg = null // will be returned with message if email exists
	const lc_ad_client_email = ad_client_email.toLowerCase()
	let sql = `SELECT * FROM inbrc_sponsors WHERE deleted = 0 AND ad_client_id <> ${id}`
	const temp = await doDBQueryBuffalorugby(sql)
	const emailExists = temp.find(
		(u) => u.ad_client_email.toLowerCase() === lc_ad_client_email
	)
	if (!emailExists) {
		// undefined - no other sponsors with proposed email
		let inserts = []
		sql = `UPDATE inbrc_sponsors SET
							ad_client_name = ?,
							ad_client_contact = ?,
							ad_client_email = ?,
							ad_client_phone = ?,
							ad_client_website = ?,
							ad_image_path = ?,
							modified_dt= NOW()
						WHERE ad_client_id = ?`

		inserts.push(
			ad_client_name,
			ad_client_contact,
			lc_ad_client_email,
			ad_client_phone,
			ad_client_website,
			ad_image_path,
			id
		)
		const sponsor = await doDBQueryBuffalorugby(sql, inserts)

		/* const email = {
			from: FROM,
			fromName: FROM_NAME,
			to: 'ron.astridge@me.com',
			subject: 'BRC Member Account Modification',
			body_text: '',
			body_html: `<h3>An Buffalo Rugby Club sponsorship for ${ad_client_name} has been modified. Email ${ad_client_email}</h3>`,
		}
		sendEmail(email) */
	} else {
		msg = `Sponsor with email ${lc_ad_client_email} already exists`
	}
	return { message: msg }
}

async function deleteOne(id) {
	const sql = `UPDATE inbrc_sponsors SET deleted=1, deleted_dt=NOW() WHERE ad_client_id=${id}`
	const sponsor = await doDBQueryBuffalorugby(sql)
	return sponsor
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_sponsors SET STATUS = "` +
		status +
		`" WHERE ad_client_id  = ` +
		id
	const sponsor = await doDBQueryBuffalorugby(sql)
	return sponsor
}
