import path from 'path';
import glob from 'glob';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import livereload from 'rollup-plugin-livereload';
import alias from 'rollup-plugin-alias';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';

/*
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import resolveAlias from 'rollup-plugin-resolve-alias';
import buble from 'rollup-plugin-buble'
import VuePlugin from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
*/


function toObject(paths){
	var ret = {};

	paths.forEach(function(path) {
		if(!/interface/.test(path)){
			ret[path.split('/ts').slice(-1)[0].replace(/(?:^\/|\.ts)/g, '')] = path;
		}
	});
	return ret;
}

export default {
	input:toObject(glob.sync(path.join(__dirname, 'src/ts/**/*.ts'))),
	plugins:[
		typescript(),
		replace({
			'process.env.NODE_ENV':JSON.stringify('prod'),
			'./':'/kr/ko_kr/'
		}),
		alias({
			'vue':path.resolve('node_modules/vue/dist/vue.js')
		}),
		resolve({
			// pass custom options to the resolve plugin
			customResolveOptions: {
				moduleDirectory:'node_modules'
			}
		}),
		commonjs({
			include: 'node_modules/**',
			sourceMap: false
		}),
		//(process.env.NODE_ENV === 'dev' && livereload('dist')),
		(process.env.NODE_ENV === 'prod' && uglify())
	],
	output: [
		{
			dir:"dist/assets/js",
			format:"system",
			sourcemap:false,
			chunkFileNames:'[name].js'
		}
	]
};