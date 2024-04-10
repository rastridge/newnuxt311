import { newsService } from '~/server/services/newsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return newsService.getAll()
	} else {
		return 'restricted'
	}
})
