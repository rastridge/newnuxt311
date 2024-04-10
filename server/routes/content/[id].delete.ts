import { contentService } from '~/server/services/contentService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	if (okProtectedEndpoint(event)) {
		return contentService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
