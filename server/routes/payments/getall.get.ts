import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return paymentsService.getAll()
	} else {
		return 'restricted'
	}
})
