import * as path from 'path';
import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
const pkg = require('../../package.json');

export default {
  entry: path.resolve('build/src/app.js'),
  useStrict: false,
  banner:
	'/**\n' +
	' * ' + pkg.name + '\n' +
	' * @version ' + pkg.version + '\n' +
	' * @copyright (c) 2016 ' + pkg.author + '\n' +
	' * @license MIT <'+ pkg.homepage + '/blob/master/LICENSE>\n' +
	' */',
  plugins: [
    commonjs({ include: 'node_modules/**' }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    buble()
  ],
  targets: [
    {
      dest: path.resolve('dist-finale/' + pkg.name + '.js'),
      format: 'umd',
      moduleName: pkg.name,
      sourceMap: false
    },
    // ES Modules
    {
      dest: path.resolve('dist-finale/' + pkg.name + '.es'),
      format: 'es',
      sourceMap: false
    },
    // ES Modules
    {
      dest: path.resolve('dist-finale/' + pkg.name + '.mjs'),
      format: 'es',
      sourceMap: false
    }
  ]
};