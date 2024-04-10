import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return paymentsService.addOne(body)
	} else {
		return 'restricted'
	}
})
