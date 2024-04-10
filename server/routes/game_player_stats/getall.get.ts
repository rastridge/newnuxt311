import { statsService } from '~/server/services/statsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return statsService.getAll()
	} else {
		return 'restricted'
	}
})
