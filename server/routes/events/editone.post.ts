import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return eventsService.editOne(body)
	} else {
		return 'restricted'
	}
})
