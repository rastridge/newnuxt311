import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return eventsService.getAll()
	} else {
		return 'restricted'
	}
})
