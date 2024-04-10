import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return accountsService.getAll()
	} else {
		return 'restricted'
	}
})
