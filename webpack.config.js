const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
//const manifestPlugin = require('webpack-manifest-plugin');

function toObject(paths){
	var ret = {};

	paths.forEach(function(path) {
		//you can define entry names mapped to [name] here
		if(!/interface/.test(path)){
			ret[path.split('/ts').slice(-1)[0].replace(/(?:^\/|\.ts)/g, '')] = path;
		}
	});
	return ret;
}


module.exports = {
	mode:'development',
	entry:toObject(glob.sync(path.join(__dirname, 'src/ts/**/*.ts'))),
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
		filename:'[name].js',
		path:path.resolve(__dirname, 'dist/js')
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
