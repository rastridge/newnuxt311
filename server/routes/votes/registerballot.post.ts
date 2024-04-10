import { votesService } from '~/server/services/votesService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return votesService.registerBallot(body)
})
