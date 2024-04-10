import { clubhouseService } from '~/server/services/clubhouseService'

export default defineEventHandler((event) => {
	return clubhouseService.getAllCurrent()
})
