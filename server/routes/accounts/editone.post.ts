import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler(async (event) => {
	// if (okProtectedEndpoint(event)) {
	// 	const body = await readBody(event)
	// 	return accountsService.editOne(body)
	// } else {
	// 	return 'restricted'
	// }
	const body = await readBody(event)
	return accountsService.editOne(body)
})
