import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return leadersService.editOne(body)
	} else {
		return 'restricted'
	}
})
