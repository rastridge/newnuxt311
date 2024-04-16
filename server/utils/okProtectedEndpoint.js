import jwt from 'jsonwebtoken'
export default (event) => {
	const CONFIG = useRuntimeConfig()

	const token = getHeaders(event).authorization
	let ok = true
	let verified = ''
	if (token) {
		verified = jwt.verify(token, CONFIG.API_SECRET)
	}
	if (!verified || !token) {
		ok = false
		throw createError({
			statusCode: 401,
			message: 'Unauthorized',
		})
	}
	return ok
}
