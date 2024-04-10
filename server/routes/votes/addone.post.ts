import { votesService } from '~/server/services/votesService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return votesService.addOne(body)
	} else {
		return 'restricted'
	}
})
