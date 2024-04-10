import { archivesService } from '~/server/services/archivesService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return archivesService.getAll()
	} else {
		return 'restricted'
	}
})
