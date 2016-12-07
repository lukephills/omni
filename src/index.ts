import 'babel-polyfill';
import 'normalize.css';
import './Styles/styles.scss';
import App from './Components/app';

export let Omni = new App();

const startApp = () => {
	// Prevent touch scroll event on document //
	// document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
  Omni.init();

  // Add active class to body to hide loaders and overlays
  document.body.classList.add('app-active');
}


// const deviceReady = () => {
// 	setTimeout(() => {
// 		navigator.splashscreen.hide();
// 		startApp();
// 	}, 2000);
// }

// if (window.cordova) {
// 	document.addEventListener('deviceready', deviceReady, false);
// } else {
	startApp();
// }

/**
 * HMR allows modules to replace on updates
 */
declare var module: any; // TODO: add webpack HMR typings
if (module.hot) {
  module.hot.accept();
}

/**
 * Override console.log for debug mode
 */
const DEBUG = true;

// const logAlias: any = console.log;
// console.log = (...args) => {
//   if (DEBUG) logAlias(...args)
// }
