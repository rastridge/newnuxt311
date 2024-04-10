import { archivesService } from '~/server/services/archivesService'

export default defineEventHandler((event) => {
	return archivesService.getAllCurrent()
})
