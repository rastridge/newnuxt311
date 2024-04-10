import { supportingaccountsService } from '~/server/services/supportingaccountsService'

export default defineEventHandler((event) => {
	return supportingaccountsService.getAllCurrent()
})
