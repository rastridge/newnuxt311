import querystring from 'querystring'
import https from 'https'

export default function useEmail() {
	const CONFIG = useRuntimeConfig()

	const HOSTING = 'https://buffalorugby.org'

	async function sendNewsletters(
		recipientss,
		newsletter_subject,
		newsletter_body_html,
		newsletter_id
	) {
		// local function
		function composeEmailHelper(
			recipient,
			newsletter_body_html,
			newsletter_subject
		) {
			// this should work if and when email works
			const TRACKING = `${HOSTING}/newsletters/track?account_id=${recipient.account_id}&newsletter_id=${newsletter_id}`
			// const TRACKINGPIXEL = `<img src="${TRACKING}" height="1" width="1"  />`
			const BEGIN_HTML = `<!DOCTYPE html>
											<html>
											<head>
											<meta charset='UTF-8'>
											<meta name='viewport' content='width=device-width, initial-scale=1.0' />
											<style>
											html {
													font-size: 12px;
													@media screen and (min-width: 576px) {
														font-size: 14px;
													}
													@media screen and (min-width: 768px) {
														font-size: 16px;
													}
													@media screen and (min-width: 1200px) {
														font-size: 18px;
													}
												}
											.nl-container {	
												background-color: #FFF;
												width: 90%;
												padding: 25px;
											}
											.nl-banner  { 
												width: 100%;
												padding: 0.5rem;
												color: #00F;
												background-color: #FFF;
												font-family: Verdana, Geneva, sans-serif;
												font-weight: bold;
												text-align: center;
											}											
											.nl-footer { 
												width: 100%;
												padding: 0.5rem;
												border: thin solid #000;
												color: #000;
												text-align: left;
												font-size: 1rem;

											}
											@media screen and (min-width: 576px) {
												.nl-banner { 
													font-size: 1.5rem;
												}												
											}
											@media screen and (min-width: 768px) {
												.nl-banner { 
													font-size: 2rem;
												}													
											}
											.ql-indent-1,
											.ql-indent-2,
											.ql-indent-3 {
												margin: 10px;
												padding: 0.5rem;
												padding-left: 2rem;
											}
											.ql-align-center {	text-align: center;	}
											.ql-align-justify {	text-align: justify;}
											.ql-align-right {	text-align: right;}
											.ql-font-serif {
												font-family: serif;
											}
											.ql-size-huge {
												font-size: xx-large;
											}
											.ql-size-large {
												font-size: xx-large;
											}
											.ql-size-small {
												font-size: small;
											}
											.img-fluid {
												display: block;
												margin-left: auto;
												margin-right: auto;
											}

										</style>
										</head>
										<body>
											<div class='nl-container'>

											<img src="${TRACKING}" height="1" width="1"  />
												<div class='nl-banner'>
													<h3>Buffalo Rugby<br>Newsletter</h3>
												</div>`

			const NEWSLETTER_END_STYLES = `<div class="nl-footer"> 
																			<p>This is Your Current Contact Info. Please <a href="${HOSTING}/update/918J275B654I${recipient.account_id}" target="_blank"> click here update your info if necessary</a></p>
																			<table>
																				<tbody>
																					<tr><td>${recipient.member_firstname} ${recipient.member_lastname}</td></tr>
																					<tr><td>${recipient.account_addr_street}</td></tr>
																					<tr><td>${recipient.account_addr_street_ext}</td></tr>
																					<tr><td>${recipient.account_addr_city}, ${recipient.account_addr_state} ${recipient.account_addr_postal}</td></tr>
																					<tr><td>${recipient.account_addr_country}</td></tr>
																					<tr><td>${recipient.account_addr_phone}</td></tr>
																					<tr><td>Year Joined the BRC ${recipient.member_year}</td></tr>
																					<tr><td>Previous teams ${recipient.member_prev_club}</td></tr>
																				</tbody>
																			</table> 
																		</div>
											</div> <!-- container -->
										</body>
									</html>`

			const email = {
				to: recipient.account_email,
				subject: newsletter_subject,
				message: BEGIN_HTML + newsletter_body_html + NEWSLETTER_END_STYLES,
			}
			// return email
			return email
		}

		// local function
		function sendEmailHelper(to, subject, message) {
			const post_data = querystring.stringify({
				api_key: CONFIG.EE_API_KEY,
				subject: subject,
				from: CONFIG.FROM,
				fromName: CONFIG.FROM_NAME,
				to: to,
				body_html: message,
				body_text: '',
				isTransactional: true,
			})

			const post_options = {
				hostname: 'api.elasticemail.com',
				path: '/v2/email/send',
				port: '443',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': post_data.length,
				},
			}

			let result = ''
			const post_req = https.request(post_options, function (res) {
				res.setEncoding('utf8')
				res.on('data', function (chunk) {
					// result = chunk
					const { statusCode, statusMessage, headers } = res
					result = statusCode
				})
				res.on('error', function (e) {
					result = 'Error: ' + e.message
				})
			})

			post_req.write(post_data)
			post_req.end()

			return result
		}

		const rec_cnt = recipientss.length

		let sentlist = []
		let email = ''

		let i = 0
		do {
			email = await composeEmailHelper(
				recipientss[i],
				newsletter_body_html,
				newsletter_subject
			)
			await sendEmailHelper(email.to, email.subject, email.message)
			sentlist.push(email.to)
			i++
		} while (i < recipientss.length)

		return sentlist
	}

	function sendEmail(to, subject, message) {
		const post_data = querystring.stringify({
			api_key: CONFIG.EE_API_KEY,
			subject: subject,
			from: CONFIG.FROM,
			fromName: CONFIG.FROM_NAME,
			to: to,
			body_html: message,
			body_text: '',
			isTransactional: true,
		})

		const post_options = {
			hostname: 'api.elasticemail.com',
			path: '/v2/email/send',
			port: '443',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': post_data.length,
			},
		}

		let result = ''
		const post_req = https.request(post_options, function (res) {
			res.setEncoding('utf8')
			res.on('data', function (chunk) {
				// result = chunk
				const { statusCode, statusMessage, headers } = res
				result = statusCode
			})
			res.on('error', function (e) {
				result = 'Error: ' + e.message
			})
		})

		post_req.write(post_data)
		post_req.end()

		return result
	}

	return {
		sendEmail,
		sendNewsletters,
	}
}
