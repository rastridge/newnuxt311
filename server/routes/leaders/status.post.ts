import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return leadersService.changeStatus(body)
	} else {
		return 'restricted'
	}
})
