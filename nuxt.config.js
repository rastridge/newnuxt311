// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: false,
	runtimeConfig: {
		API_SECRET: process.env.API_SECRET,
		DB_HOST: process.env.DB_HOST,
		DB_USER: process.env.DB_USER,
		DB_PASSWORD: process.env.DB_PASSWORD,
		DB_DATABASE: process.env.DB_DATABASE,
		DATABASE_URL: process.env.DATABASE_URL,
		SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
		ONSERVER: process.server,
		ONCLIENT: process.client,
		TO: process.env.TO,
		TO_FLAG: process.env.TO_FLAG,
		FROM: process.env.FROM,
		FROM_NAME: process.env.FROM_NAME,
		EE_API_KEY: process.env.EE_API_KEY,
		TWILIO_NUMBER: process.env.TWILIO_NUMBER,
		TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
		TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,

		SEASON_DIVIDE_DATE: process.env.SEASON_DIVIDE_DATE,

		// Keys within public, will be also be
		// exposed to the client-side
		public: {
			MEDIA_URL: process.env.MEDIA_URL,
			IMAGES_URL: process.env.IMAGES_URL,
			TITLE: process.env.TITLE,
			GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
		},
	},

	modules: [
		'nuxt-primevue',
		'@pinia/nuxt',
		'dayjs-nuxt',
		'@formkit/nuxt',
		'@nuxt/image',
	],

	primevue: {
		importPT: {
			as: 'MyCustomPreset',
			from: './assets/sass/presets/primevue_preset.js',
		},
	},
	css: [
		'primevue/resources/themes/aura-light-green/theme.css',
		'primevue/resources/primevue.css',
		'primeicons/primeicons.css',
		'primeflex/primeflex.css',
	],
	dayjs: {
		locales: ['en', 'fr'],
		plugins: ['relativeTime', 'utc', 'timezone'],
		defaultLocale: 'en',
		defaultTimezone: 'America/New_York',
	},

	formkit: {
		// Experimental support for auto loading (see note):
		autoImport: true,
	},

	components: [
		'~/components/app',
		'~/components/selectors',
		'~/components/forms',
		'~/components/displays',
		'~/components',
	],
})
