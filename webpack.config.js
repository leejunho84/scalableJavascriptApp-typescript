const path = require('path');
const webpack = require('webpack');
//const manifestPlugin = require('webpack-manifest-plugin');

module.exports = {
	mode:'development',
	entry:path.join(__dirname, 'src/ts/index.ts'),
	devtool:'source-map', // Enable sourcemaps for debugging webpack's output.
	module:{
		rules:[
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					esModule:true
				}
			},
			{
				test:/\.tsx?$/,
				use:['ts-loader'],
				exclude:/node_modules/
			}
		]
	},
	resolve:{
		extensions:['.tsx', '.ts', '.js', '.json'],
		alias:{
			'vue$':'vue/dist/vue.esm.js'
		}
	},
	output:{
		filename:'[name].index.js',
		chunkFilename:'[name].[chunkhash].chunk.js',
		path:path.resolve(__dirname, 'dist')
	},
	devServer:{
		contentBase:path.join(__dirname, 'dist'),
		compress:true,
		port:9000,
		inline:true,
		hot:true
	},
	plugins:[
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
		//new manifestPlugin({fileName:'assets.json', basePath:__dirname}),
	]
};
