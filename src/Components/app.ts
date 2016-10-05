import Harp from './Harp';
import ScaleSelector from './ScaleSelector';
import DroneSelector from './DroneSelector';

class App {

  state: any;
  harp: Harp;
  scaleSelector: ScaleSelector;
  droneSelector: DroneSelector;
  scale = [261.6255653006, 274.52698453615, 329.62755691287, 349.22823143301, 391.99543598175, 411.32572372413, 493.88330125613];

  constructor() {
    this.state = {
      droneIdx: -1
    }
  }

	init() {
		console.log('INITIALIZED APP');

		// on resize event listener
		window.addEventListener('resize', this.onResize.bind(this));

    // harp controller
    this.harp = new Harp(document.getElementById('harp'));

    // initialise scale selector
    this.scaleSelector = new ScaleSelector()

    // initialise drone selector
    this.droneSelector = new DroneSelector()

    // draw everything
    this.draw();
	}


	onResize() {
    this.harp.onResize();
		this.draw();
	}



  /**
   * DRAW ALL COMPONENTS
   */
  draw() {
    this.harp.draw();
  }






}

export default App;



