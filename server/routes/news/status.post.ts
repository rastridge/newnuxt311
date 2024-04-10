import { newsService } from '~/server/services/newsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return newsService.changeStatus(body)
	} else {
		return 'restricted'
	}
})
