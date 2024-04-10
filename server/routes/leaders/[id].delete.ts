import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return leadersService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
