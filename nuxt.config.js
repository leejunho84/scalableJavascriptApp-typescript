module.exports = {
	head:{
		titleTemplate: '%s - Nuxt.js',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Meta description' }
		],
		link:[
			{ rel: 'icon', type: 'image/x-icon', href:'/favicon.ico'},
			{ rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css' },
			{ rel: 'stylesheet', href: '/css/common.css' }
		]
	},
}