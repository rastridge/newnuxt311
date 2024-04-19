// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	rules: {
		// ...Override rules, for example:
		'vue/v-on-event-hyphenation': 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/html-self-closing': 'off',
		'vue/prop-name-casing': 'off',
		'vue/no-v-html': 'off',
	},
})
