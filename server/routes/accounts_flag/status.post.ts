import { accountsFlagService } from '~/server/services/accountsFlagService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return accountsFlagService.changeStatus(body)
	} else {
		return 'restricted'
	}
})
