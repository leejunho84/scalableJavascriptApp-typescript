import path from 'path';
import glob from 'glob';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import multiInput from 'rollup-plugin-multi-input';
import html from '@open-wc/rollup-plugin-html';

const filter = (paths, check) => {
	return paths.filter(v => !/(interface|messageProperty)/.test(v));
}

export default [
	{
		input:filter(glob.sync(path.join(__dirname, 'src/js/**/*.ts'))),
		plugins:[
			multiInput(),
			typescript(),
			replace({
				'process.env.NODE_ENV':JSON.stringify('prod')
			}),
			resolve({
				// pass custom options to the resolve plugin
				customResolveOptions: {
					moduleDirectory:path.resolve('node_modules')
				}
			}),
			commonjs({
				include:path.resolve('node_modules/**'),
				sourceMap: false
			}),
			(process.env.NODE_ENV === 'dev' && livereload('dist')),
			(process.env.NODE_ENV === 'prod' && uglify()),
			(process.env.NODE_ENV === 'dev' && serve({
				contentBase:'dist',
				host: 'localhost',
				port: 3000,
				headers: {
					'Access-Control-Allow-Origin': '*',
					foo: 'bar'
				}
			}))
		],
		external:['axios', 'vue', 'rxjs', 'rxjs/operators', 'rxjs/Rx', 'vue-property-decorator'],
		output:{
			dir:'dist',
			format:'system',
			sourcemap:false,
			chunkFileNames:'[name].js'
		}
	},
	{
		input: glob.sync(path.join(__dirname, 'src/template/index.html')),
		output: { dir: 'dist' },
		plugins: [html({ flatten: false, rootDir: '_site' })],
	}
];