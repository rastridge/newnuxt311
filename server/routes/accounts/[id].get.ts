import { accountsService } from '~/server/services/accountsService'
// import okProtectedEndpoint from '~/server/utils/okProtectedEndpoint'

export default defineEventHandler(async (event) => {
	// if (okProtectedEndpoint(event)) {
	// 	const id = event.context.params.id
	// 	return accountsService.getOne(id)
	// } else {
	// 	return 'restricted'
	// }
	const id = event.context.params.id

	return accountsService.getOne(id)
})
