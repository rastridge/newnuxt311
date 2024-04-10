import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const id = event.context.params.id
		return accountsService.deleteOne(id)
	} else {
		return 'restricted'
	}
})
