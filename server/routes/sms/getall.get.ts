import { smsService } from '~/server/services/smsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return smsService.getAll()
	} else {
		return 'restricted'
	}
})
