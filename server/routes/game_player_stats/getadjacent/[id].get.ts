import { statsService } from '~/server/services/statsService'

export default defineEventHandler((event) => {
	const id = event.context.params.id
	// console.log('id= ', id)
	return statsService.getAdjacent(id)
})
