import { videosService } from '~/server/services/videosService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return videosService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
