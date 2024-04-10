import { usePlacemarkStore } from '~/stores/placemarkStore'
import { useAlertStore } from '~/stores/alertStore'
export default defineNuxtRouteMiddleware((to, from) => {
	const appto = to.path.split('/')[2]
	const appfrom = from.path.split('/')[2]
	// console.log('appto= ', appto, ' appfrom= ', appfrom)
	// console.log('to= ', to.path, ' from= ', from.path)

	const placemark = usePlacemarkStore()

	if (to.path.slice(0, 6) === '/admin' && appto !== appfrom) {
		placemark.setPage(0)
		placemark.setAlpha('1')
		placemark.initYear()
		placemark.initSeason()
		placemark.setMemberTypeId(2)
		placemark.setGameTypeId(1)
	} else {
		// Handle pages outside of admin
		//
		// return from games and stats // STILL NEEDED ?
		if (
			(from.path.slice(0, 6) !== '/games' &&
				from.path.slice(0, 5) !== '/stats') ||
			(to.path.slice(0, 17) === '/games/schedule/0' &&
				from.path.slice(0, 6) !== '/games' &&
				from.path.slice(0, 5) !== '/stats')
		) {
		}
	}
	//
	// clear previous alerts on any page change
	//
	if (to.path !== from.path) {
		const alert = useAlertStore()
		alert.clear()
	}
})
