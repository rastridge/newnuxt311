import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return paymentsService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
