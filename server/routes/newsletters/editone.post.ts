import { newslettersService } from '~/server/services/newslettersService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return newslettersService.editOne(body)
	} else {
		return 'restricted'
	}
})
