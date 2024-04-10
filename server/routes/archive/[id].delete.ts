import { archivesService } from '~/server/services/archivesService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return archivesService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
