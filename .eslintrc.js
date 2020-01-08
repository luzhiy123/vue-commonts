module.exports = {
	"parser": "vue-eslint-parser",
	"parserOptions": {
		"sourceType": "module",
		"ecmaVersion": 2018,
		"ecmaFeatures": {
			"globalReturn": false,
			"impliedStrict": false,
			"jsx": true
		}
	},
	env: {
		node: true
	},
	extends: ['plugin:vue/recommended', 'eslint:recommended'],
	rules: {
		"indent": ["error", 4, { "SwitchCase": 1 }],
		"vue/html-indent": ["error", 4],
        "vue/script-indent": ["error", 4, { "switchCase": 1 }],
        "vue/require-default-prop": "off",
        "quotes": [1, "double"],
		"no-console": "off",
		"no-debugger": "error"
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
