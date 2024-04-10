import { newslettersService } from '~/server/services/newslettersService'
export default defineEventHandler((event) => {
	const query = getQuery(event)
	return newslettersService.trackNewsletter(query)
})
