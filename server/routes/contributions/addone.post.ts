import { contributionsService } from '~/server/services/contributionsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return contributionsService.addOne(body)
	} else {
		return 'restricted'
	}
})
