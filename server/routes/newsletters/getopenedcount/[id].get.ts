import { newslettersService } from '~/server/services/newslettersService'

export default defineEventHandler((event) => {
	const id = event.context.params.id
	return newslettersService.getOpenedCount(id)
})
