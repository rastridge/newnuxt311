import { supportingaccountsService } from '~/server/services/supportingaccountsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return supportingaccountsService.getOne(id)
	} else {
		return 'restricted'
	}
})
