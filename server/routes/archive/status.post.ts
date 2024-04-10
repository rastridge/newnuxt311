import { archivesService } from '~/server/services/archivesService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return archivesService.changeStatus(body)
	} else {
		return 'restricted'
	}
})
