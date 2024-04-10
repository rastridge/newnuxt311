import { videosService } from '~/server/services/videosService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return videosService.getAll()
	} else {
		return 'restricted'
	}
})
