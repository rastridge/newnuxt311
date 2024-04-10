import { newsService } from '~/server/services/newsService'

export default defineEventHandler(async (event) => {
	const year = event.context.params.year
	return newsService.getYear(year)
})
