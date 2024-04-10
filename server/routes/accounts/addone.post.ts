import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return accountsService.addOne(body)
	}
})
