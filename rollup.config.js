import path from 'path';
import glob from 'glob';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import multiInput from 'rollup-plugin-multi-input';
import htmlTemplate from '@open-wc/rollup-plugin-html';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';

const filter = (paths, check) => {
	return paths.filter(v => !/(interface|messageProperty)/.test(v));
}

export default [
	{
		input: filter(glob.sync(path.join(__dirname, 'src/js/**/*.ts'))),
		plugins:[
			json(),
			multiInput(),
			resolve({
				customResolveOptions:{
					moduleDirectory:path.resolve('node_modules')
				}
			}),
			commonjs({
				include:path.resolve('node_modules/**'),
				sourceMap:false
			}),
			typescript(),
			copy({
				targets:[
					{src:'node_modules/systemjs/dist/system.js', dest:'dist/assets/js/libs'},
					{src:'node_modules/vue/dist/vue.min.js', dest:'dist/assets/js/libs'},
					{src:'node_modules/axios/dist/axios.min.js', dest:'dist/assets/js/libs'},
					{src:'./src/static/font', dest:'dist/assets'},
					{src:'./src/static/images', dest:'dist/assets'},
				]
			}),
			replace({
				'process.env.NODE_ENV':JSON.stringify('prod')
			}),
			scss({
				output:'dist/assets/css/style.css',
			}),
			process.env.NODE_ENV === 'dev' && livereload(),
			process.env.NODE_ENV === 'prod' && uglify(),
		],
		external:['vue', 'axios', 'rxjs', 'rxjs/operators'],
		output:{
			dir:'dist/assets',
			format:'system',
			sourcemap:false,
			entryFileNames:'[name].js',
			chunkFileNames:'[name].js'
		}
	},
	{
		input: '**/*.html',
		output: {
			dir: 'dist'
		},
		plugins: [
			htmlTemplate({ flatten: false, rootDir: './src/template' })
		]
	}
];