import { usersService } from '~/server/services/usersService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return usersService.getAll()
	} else {
		return 'restricted'
	}
})
