export default function useMatch() {
	function typeMatch(recipient_type_id, el) {
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
				if (member_type_id === 3 && el.account_addr_postal.indexOf('14') === 0)
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
		return include
	}
	return {
		typeMatch,
	}
}
