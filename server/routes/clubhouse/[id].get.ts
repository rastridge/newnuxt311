import { clubhouseService } from '~/server/services/clubhouseService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return clubhouseService.getOne(id)
})
