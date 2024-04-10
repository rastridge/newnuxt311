import { contributionsService } from '~/server/services/contributionsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return contributionsService.editOne(body)
	} else {
		return 'restricted'
	}
})
