## A ultimate TypeScript 2.0 Pre boilerplate for node and the browser

[![Build Status](https://travis-ci.org/Kflash/sikky.svg?branch=master)](https://travis-ci.org/Kflash/sikky)
[![CircleCI](https://circleci.com/gh/Kflash/sikky.svg?style=svg)](https://circleci.com/gh/Kflash/sikky)
[![Build status](https://ci.appveyor.com/api/projects/status/vibxi4wro4qwbdtw?svg=true)](https://ci.appveyor.com/project/Kflash/sikky)
[![Coverage Status](https://coveralls.io/repos/github/Kflash/sikky/badge.svg?branch=master)](https://coveralls.io/github/Kflash/sikky?branch=master)
[![npm version](https://badge.fury.io/js/sikky.svg)](https://badge.fury.io/js/sikky)
[![npm downloads](https://img.shields.io/npm/dm/sikky.svg)](https://www.npmjs.org/package/sikky)
[![npm](https://img.shields.io/npm/l/express.svg?style=flat-square)](https://github.com/kflash/sikky/blob/master/LICENSE.md)

A TypeScript 2.0 starter kit using all the latest technology, included the latest available
TypeScript version - version 2.0 Pre (*nightly build*).

If this boilerplate are too complex,a and you need a super fast, and lightweight TypeScript boilerplate that export a single file, [click here](https://github.com/Kflash/rachelle).

## Features

- [x] Statically typed build system for working with [Typescript](https://www.typescriptlang.org/) 2.0 Pre
- [x] VSCode integration. Debug and run tests in the editor.
- [x] Chrome dev tools integration with VSCode
- [x] Consistent code style with [TSLint](https://palantir.github.io/tslint/).
- [x] Intelligent code editing with [VSCode](https://code.visualstudio.com/)
- [x] Experimental support for [ES7](https://tc39.github.io/ecma262/) decorators.
- [x] Async/await and generators support for ES5/ES3
- [x] Parallel Test Driven Development (TDD)
- [x] All up-to-date TypeScript 2.0 features
- [x] Code Coverage with [Istanbul](https://github.com/gotwarlost/istanbul) and [Karma](https://karma-runner.github.io/0.13/index.html)
- [x] Hot Module Replacement with Webpack
- [x] Async/await and generators support for ES5/ES3
- [x] ES Modules (*specs will change again*).
- [x] Allow dead code elimination for ES6 modules
- [x] TSX / JSX
- [x] Complete sourcemap support
- [x] Environment variabels
- [x] Browser tests in browser (*port 8080*)
- [x] [Babel](https://babeljs.io/) as the ES2015 compiler for the testing stack
- [x] [Bublé](https://gitlab.com/Rich-Harris/buble) as the ES2015 compiler
- [x] [Rollup](http://rollupjs.org/) for bundling
- [x] [Sinon](http://sinonjs.org/) for test doubles
- [x] iOS and Android support
- [x] React support
- [x] Angular2 support
- [x] [Mocha](https://mochajs.org/) & [Chai](http://chaijs.com/) de facto standard
- [x] Easy debugging (*parallell*)

## Quick start

The only development dependency of this project is [Node.js](https://nodejs.org/en/). So just make sure you have it installed.
Then type few commands known to every Node developer...

```bash
git clone --depth 1 https://github.com/kflash/sikky.git
cd sikky
# install the project's dependencies
npm install

# dev build
npm run build:dev
# prod build
npm run build:prod
```
... and boom! You have it all setup for you!

## Workflow

* `npm start` - runs a web server on localhost:3000 and updates on changes using HMR
* `npm run build` - transpile down to ES5 and builds a bundle both for development and production
* `npm run build:dev` - transpile down to ES5 and builds a bundle for development
* `npm run build:prod` - transpile down to ES5 and builds a bundle for production
* `npm run build:finale` - transpile down to ES5 and builds a bundle for production with Rollup and `Bublé`
* `npm run build:finale:prod` - transpile down to ES5 and builds a bundle for production with Rollup and `Bublé`
* `npm run build:finale:prod` - transpile down to ES5 and builds a bundle for production with Rollup and `Bublé`
* `npm run debug` - debug task used with the `VSCode editor`.
* `npm run cleanup` - remove the dist, coverage and build folders
* `npm run remove:build` - remove the build folder
* `npm run remove:dist` - removed the dist folder
* `npm run lint` - validates everything
* `npm run lint:src` - validates all source files
* `npm run lint:tests` - validates all test files
* `npm run test` - run tests both for browser and the `node.js environment`
* `npm run test:browser` - run all unit tests in the browser
* `npm run test:node` - run all unit tests in the `node.js environment`
* `npm run watch:browser` - run all unit tests and watch files for changes in the browser.
* `npm run watch:build` - watch your TypeScript files and trigger recompilation on changes.
* `npm run watch:node` - run all unit tests and watch files for changes in the `node.js` environment.
* `npm run tdd` - run all watch tasks in parallel and watch files for changes.
* `update:dependencies` - update npm packages


## Build workflow

Everything is done with `Webpack`. When you are satisfied and ready to ship the code to production, you can make a nice, clean output with `Rollup`.

`npm run build:finale` bundle the `finale build` files with Rollup, and make them ready for shipping. This files are put inside it's own folder `dist-finale`.

A `finale` build shaves off around 4 - 5 KB from the bundled source, compared to `Webpack`. Less bytes - more happy customers!!

## Visual Studio Code

This workflow is tightly integrated with `VSCode`. In fact you can do everything from the editor.

Start the VSCode editor, and press **Ctrl+Shift+B** to compile the project. A build folder appers with the transpiled files in it.

To stop the compilation, press **Ctrl+P → > Tasks: Terminate Running Task**.

If you want to debug the source code, set a **breakpoint** on line 6 in /test/browser-tests/sikky.browser.js.
Then press **Cmd + D** to view debugging options.

Select `Debug Current TypeScript Test` from the dropdown and press **F5** to launch the debugger.

You should hit the breakpoint. Now you can press **F11** to step into function, or press **Shift+F5** to stop the debugger.

**Note!** Debugging may randomly return warning on build. [See](https://github.com/Microsoft/vscode/issues/4070).

Unit tests can be run by pressin **Cmd + T**. You should see results displayed in the **Output window**.

Both browser and server tests are set up to run at the same time in parallel.

## Custom Type Definitions

When including 3rd party modules you also need to include the type definition for the module if they don't provide one within the module.
From TypeScript 2.0 both `TDD` and `Typings` are *deprecated*. All definitions are now installed through `NPM packages`.

 ```js
 npm install @types/<package name>`.
 ```

You can read more about it  [here](https://github.com/Microsoft/TypeScript/issues/9184)

## Test-driven development (TDD)

There exist one task for this - `npm run tdd`. This task runs all watch task in parallel.

## Watch tasks

It's integrated a **watch task** for server and unit testing, and a task to keep an eye on your build process. This is tightly integrated with the
debugger task included in the `VSCode editor`.

`npm run watch:build` starts the `TypeScript 2.0` compiler in watch mode, and watch input files and trigger recompilation on changes. Dead code elimination for ES6 modules are activated by default, so later on you can use either
`Webpack 2.0` (*early beta stage*) or `Rollup` to perform tree shaking.

The watch task inform you if something is wrong with your code, and can come up with suggestions on how to solve current issue.

```bash
7:28:24 PM - File change detected. Starting incremental compilation...
src/universal/foo.ts(7,10): error TS2348: Value of type 'typeof TeaSpoon' is not callable.
Did you mean to include 'new'?
```
## Continuous integration (CI)

Travis, Circle and Appveyor are the only supported CI. Travis is setup to work with Linux and OSX. Appveyor only runs in a Windows environment, but are configured to run on both the x86 and x64 platform.

You will need to change permissons on the .sh files used by Travis.

## Code coverage

The library is set up to integrate with [`Coveralls.io`](https://coveralls.io/), and are using [`Istanbul`](https://github.com/gotwarlost/istanbul) and Karma + Webpack to generate coverage report.

Coverage report for server tests will be included soon as I find it stable enough.

## Server testing

Browser testing are done with `mocha+chai+sinon`. Debugging are enabled by default on `port 5858`.

All server related tests are located inside the `test/node-tests folder`, and named with a node extension. E.g. `foo.node.ts`.

`JsDOM` are used to fake DOM on the server.

**Note!** There is no need to manually import testing framework related packages such as `Chai`, `Sinon` etc. This have been done automatically.

## Browser testing

Browser testing are done with `Webpack` together with Karma as the test runner.

All server related tests are located inside the test/browser-tests folder, and named with a node extension. E.g. `foo.browser.ts`.

## Direct browser testing

The browser spec runner - `./config/runner.html` - can be opened in a browser to run your tests. For it to work, you must
first run `npm run browser`, and open `port 8080` in your browser.

This will set up a watch task that will automatically refresh the tests when your scripts, or the tests, change.

## Android and iOS

This boilerplate is tested against `Travis CI` configured to run `Android` with `SDK version android-19 - 23`.
It's not tested with `iOS`. But the conlusion is that this works just fine.

## Linting

This boilerplate uses `TSLint` to lint your source. To change the rules, edit the .tslint.json` file in the root directory, respectively.

## FAQ

### When should I consider using this boilerplate?

This library is ideal for libraries that export a single file.

### Will this boilerplate always support the latest technology and specs on the market?

Yes. It will always be up-to-date.

### What's the browser compatibility?

As a rule of thumb, `TypeScript`, `Bublé` and `Babel` works best in `IE9` and above.

### What's the cost of transpiling?

A thorough analysis of this question can be found [here](https://github.com/samccone/The-cost-of-transpiling-es2015-in-2016).
