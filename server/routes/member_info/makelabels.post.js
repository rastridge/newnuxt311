import { member_infoService } from '~/server/services/member_infoService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return member_infoService.makeLabels(body)
	} else {
		return 'restricted'
	}
})
