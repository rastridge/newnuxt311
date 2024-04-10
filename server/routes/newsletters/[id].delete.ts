import { newslettersService } from '~/server/services/newslettersService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return newslettersService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
