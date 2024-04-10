import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return paymentsService.changeStatus(body)
	} else {
		return 'restricted'
	}
})
