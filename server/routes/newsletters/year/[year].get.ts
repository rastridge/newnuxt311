import { newslettersService } from '~/server/services/newslettersService'

export default defineEventHandler(async (event) => {
	const year = event.context.params.year
	return newslettersService.getYear(year)
})
