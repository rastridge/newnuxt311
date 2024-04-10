import { member_infoService } from '~/server/services/member_infoService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return member_infoService.getAll()
	} else {
		return 'restricted'
	}
})
