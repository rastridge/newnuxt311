import { videosService } from '~/server/services/videosService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return videosService.addOne(body)
	} else {
		return 'restricted'
	}
})
