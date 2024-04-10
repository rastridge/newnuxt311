import { accountsFlagService } from '~/server/services/accountsFlagService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return accountsFlagService.getOne(id)
	} else {
		return 'restricted'
	}
})
