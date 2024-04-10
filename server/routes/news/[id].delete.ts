import { newsService } from '~/server/services/newsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return newsService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
