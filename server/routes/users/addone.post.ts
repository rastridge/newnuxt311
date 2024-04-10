import { usersService } from '~/server/services/usersService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return usersService.addOne(body)
	} else {
		return 'restricted'
	}
})
