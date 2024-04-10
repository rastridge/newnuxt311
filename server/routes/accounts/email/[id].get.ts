import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const email = event.context.params.id
		return accountsService.lookupByEmail(email)
	} else {
		return 'restricted'
	}
	/* 	console.log('id= ', event.context.params.id)
	const email = event.context.params.id
	return accountsService.lookupByEmail(email) */
})
