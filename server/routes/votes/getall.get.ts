import { votesService } from '~/server/services/votesService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return votesService.getAll()
	} else {
		return 'restricted'
	}
})
