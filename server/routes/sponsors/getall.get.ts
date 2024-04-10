import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return sponsorsService.getAll()
	} else {
		return 'restricted'
	}
})
