import { votesService } from '~/server/services/votesService'

export default defineEventHandler((event) => {
	const email = event.context.params.email
	return votesService.getQuestions(email)
})
