import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return sponsorsService.addOne(body)
	} else {
		return 'restricted'
	}
})
