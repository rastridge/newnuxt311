import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	if (okProtectedEndpoint(event)) {
		return eventsService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
