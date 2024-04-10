import { newslettersService } from '~/server/services/newslettersService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return newslettersService.getAll()
	} else {
		return 'restricted'
	}
})
