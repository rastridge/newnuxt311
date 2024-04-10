import { supportingaccountsService } from '~/server/services/supportingaccountsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return supportingaccountsService.getAll()
	} else {
		return 'restricted'
	}
})
