import { useAuthStore } from '~/stores/authStore'
const auth = useAuthStore()
import { useMenuStore } from '~/stores/menuStore'
const menuStore = useMenuStore()
const customMenuItems = menuStore.getCustomMenuItems

const checkPerm = (app) => {
	const user = auth.user
	const temp = user.perms
	const perms = temp.find(function (u) {
		return u.admin_app_name === app
	})
	return perms.admin_perm
}

export function useNavigationMenu() {
	const navigationMenu = () => {
		let menu = []
		customMenuItems.forEach((element) => {
			menu.push(element)
		})
		menu.push(
			{
				label: 'Officers',
				icon: 'pi pi-fw pi-users',
				route: '/officers',
			},
			{
				label: 'Members',
				icon: 'pi pi-fw pi-users',
				route: '/members',
			},

			{
				label: 'Sponsors',
				icon: 'pi pi-fw pi-dollar',
				route: '/sponsors',
			},
			{
				label: 'Payments',
				icon: 'pi pi-fw pi-dollar',
				route: '/payments',
			}
		)

		return [
			{
				label: 'Homepage',
				route: '/',
				icon: 'pi pi-fw pi-home',
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'About',
				icon: 'pi pi-fw pi-info-circle',
				visible: () => !auth.isLoggedIn,
				items: menu,
			},
			{
				label: 'News',
				icon: 'pi pi-fw pi-book',
				visible: () => !auth.isLoggedIn,

				items: [
					{
						label: 'News',
						icon: 'pi pi-fw pi-folder-open',
						route: '/news',
					},
					{
						label: 'Events',
						icon: 'pi pi-fw pi-folder-open',
						route: '/events',
					},
					{
						label: 'Contributions',
						icon: 'pi pi-fw pi-folder-open',
						route: '/contributions',
					},
					{
						label: 'Community Service',
						icon: 'pi pi-fw pi-folder-open',
						route: '/communityservice',
					},
				],
			},
			{
				label: 'Competition',
				icon: 'pi pi-fw pi-calendar',
				visible: () => !auth.isLoggedIn,

				items: [
					{
						label: 'Schedule',
						icon: 'pi pi-fw pi-folder-open',
						route: '/schedule',
					},
					{
						label: 'League Results',
						icon: 'pi pi-fw pi-folder-open',
						route: '/otherresults',
					},

					{
						label: 'Player Stats 15s',
						icon: 'pi pi-fw pi-folder-open',
						route: '/stats/player_stats',
					},
					{
						label: 'Player Stats 7s',
						icon: 'pi pi-fw pi-folder-open',
						route: '/stats/player_stats7s',
					},
					{
						label: 'Player Games',
						icon: 'pi pi-fw pi-folder-open',
						route: '/stats/player_history',
					},
					{
						label: 'Team Record',
						icon: 'pi pi-fw pi-folder-open',
						route: '/stats/team_stats',
					},
					{
						label: 'Youth Flag',
						icon: 'pi pi-fw pi-folder-open',
						route: '/flag',
					},
				],
			},
			{
				label: 'History',
				icon: 'pi pi-fw pi-calendar',
				visible: () => !auth.isLoggedIn,

				items: [
					{
						label: 'Clubhouse',
						icon: 'pi pi-fw pi-folder-open',
						route: '/clubhouse',
					},
					{
						label: 'Old Documents',
						icon: 'pi pi-fw pi-folder-open',
						route: '/archives/documents',
					},
					{
						label: 'Leaders',
						icon: 'pi pi-fw pi-users',
						route: '/leaders',
					},
					{
						label: 'Old News',
						icon: 'pi pi-fw pi-folder-open',
						route: '/archives/news',
					},
					{
						label: 'Old Newsletters',
						icon: 'pi pi-fw pi-folder-open',
						route: '/archives/newsletters',
					},
					{
						label: 'Opponents',
						icon: 'pi pi-fw pi-folder-open',
						route: '/opponents',
					},
					{
						label: 'Photo Album',
						icon: 'pi pi-fw pi-images',
						route: '/photos',
					},
					{
						label: 'Videos',
						icon: 'pi pi-fw pi-video',
						route: '/videos',
					},

					/* 					{
						label: '50th Anniversary',
						icon: 'pi pi-fw pi-folder-open',
						route: '/sponsors',
					}, */
				],
			},
			{
				label: 'Login',
				icon: 'pi pi-fw pi-sign-in',
				route: '/loginpage',
				visible: () => !auth.isLoggedIn,
			},
			{
				label: 'Admin Menu',
				icon: 'pi pi-fw pi-plus',
				items: [
					{
						label: 'Admin Home',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin',
						visible: () => checkPerm('users') > 0,
					},
					{
						label: 'Admin Users',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/users',
						visible: () => checkPerm('users') > 0,
					},
					{
						label: 'Clubhouse',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/clubhouse',
						visible: () => checkPerm('clubhouse') > 0,
					},
					{
						label: 'Content',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/content',
						visible: () => checkPerm('content') > 0,
					},
					{
						label: 'Contributions',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/contributions',
						visible: () => checkPerm('contributions') > 0,
					},
					{
						label: 'Old Documents',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/archive',
						visible: () => checkPerm('archive') > 0,
					},
					{
						label: 'Events',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/events',
						visible: () => checkPerm('events') > 0,
					},
					{
						label: 'Leaders',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/leaders',
						visible: () => checkPerm('leaders') > 0,
					},
					{
						label: 'Members Men',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/accounts/men',
						visible: () => checkPerm('accounts/men') > 0,
					},
					{
						label: 'Members Flag',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/accounts_flag',
						visible: () => checkPerm('accounts_flag') > 0,
					},

					{
						label: 'Member Info',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/member_info',
						visible: () => checkPerm('member_info') > 0,
					},
					{
						label: 'News',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/news',
						visible: () => checkPerm('news') > 0,
					},
					{
						label: 'Newsletters',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/newsletters',
						visible: () => checkPerm('newsletters') > 0,
					},
					{
						label: 'Opponents',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/opponents',
						visible: () => checkPerm('opponents') > 0,
					},
					{
						label: 'Payments',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/payments',
						visible: () => checkPerm('payments') > 0,
					},
					{
						label: 'Sponsors',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/sponsors',
						visible: () => checkPerm('sponsors') > 0,
					},
					{
						label: 'Game stats',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/game_player_stats',
						visible: () => checkPerm('game_player_stats') > 0,
					},
					{
						label: 'Supporting Accounts',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/supporting_accounts',
						visible: () => checkPerm('supporting_accounts') > 0,
					},
					{
						label: 'Texts',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/sms',
						visible: () => checkPerm('sms') > 0,
					},

					{
						label: 'Videos',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/videos',
						visible: () => checkPerm('videos') > 0,
					},
					{
						label: 'Votes',
						icon: 'pi pi-fw pi-user-edit',
						route: '/admin/votes',
						visible: () => checkPerm('votes') > 0,
					},
					{
						label: 'Log out',
						icon: 'pi pi-fw pi-sign-out',
						route: '/logout',
						visible: () => auth.isLoggedIn,
					},
				],
				visible: () => auth.isLoggedIn,
			},
		]
	}
	return { navigationMenu }
}
