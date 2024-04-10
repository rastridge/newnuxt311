import { contributionsService } from '~/server/services/contributionsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return contributionsService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
