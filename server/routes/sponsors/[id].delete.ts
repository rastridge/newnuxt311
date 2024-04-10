import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return sponsorsService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
