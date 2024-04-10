import { opponentsService } from '~/server/services/opponentsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return opponentsService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
