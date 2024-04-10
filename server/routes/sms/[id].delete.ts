import { smsService } from '~/server/services/smsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return smsService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
