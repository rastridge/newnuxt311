import { votesService } from '~/server/services/votesService'

export default defineEventHandler((event) => {
	return votesService.getUsedChoices()
})
