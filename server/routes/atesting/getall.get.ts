import { atestingService } from '~/server/services/atestingService'

export default defineEventHandler((event) => {
	return atestingService.getAll()
})
