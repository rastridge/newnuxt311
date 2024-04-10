import { contributionsService } from '~/server/services/contributionsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return contributionsService.getAll()
	} else {
		return 'restricted'
	}
})
