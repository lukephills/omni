import * as path from 'path';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import strip from 'rollup-plugin-strip';
const pkg = require('../../package.json');

export default {
  entry: path.resolve('build/src/app.js'),
  plugins: [
  uglify({
			warnings: false,
			compress: {
				screw_ie8: true,
				dead_code: true,
				unused: true,
				drop_debugger: true
			}
		}),
   	commonjs({ include: 'node_modules/**' }),
		strip({ debugger: true }),
		replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    buble()
  ],
  targets: [
    {
      dest: path.resolve('dist-finale/'+ pkg.name +'.min.js'),
      format: 'umd',
      moduleName: pkg.name,
      sourceMap: false
    }
  ]
};