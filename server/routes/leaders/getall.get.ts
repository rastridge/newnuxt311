import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return leadersService.getAll()
	} else {
		return 'restricted'
	}
})
