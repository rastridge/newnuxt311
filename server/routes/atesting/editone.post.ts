import { atestingService } from '~/server/services/atestingService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return atestingService.editOne(body)
})
