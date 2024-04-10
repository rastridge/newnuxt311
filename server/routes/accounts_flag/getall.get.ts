import { accountsFlagService } from '~/server/services/accountsFlagService'

export default defineEventHandler((event) => {
	if (okProtectedEndpoint(event)) {
		return accountsFlagService.getAll()
	} else {
		return 'restricted'
	}
})
