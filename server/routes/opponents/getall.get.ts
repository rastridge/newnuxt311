import { opponentsService } from '~/server/services/opponentsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return opponentsService.getAll()
	} else {
		return 'restricted'
	}
})
