import { clubhouseService } from '~/server/services/clubhouseService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	if (okProtectedEndpoint(event)) {
		return clubhouseService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
