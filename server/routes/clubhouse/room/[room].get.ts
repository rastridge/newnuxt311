import { clubhouseService } from '~/server/services/clubhouseService'

export default defineEventHandler(async (event) => {
	const room = event.context.params.room
	return clubhouseService.getRoom(room)
})
