import Harp from './Harp';
import PitchConstellation from './PitchConstellation';
import ScaleSelector from './ScaleSelector';
import DroneSelector from './DroneSelector';
import {scales, IScale} from '../Utils/Scales/scales-shortlist';
import {getFrequencyTET} from '../Utils/Audio/scales';

interface IState {
  droneIdx: number;
  scale: IScale;
}

// interface IScale {
//   name: string;
//   frequencies: number[];
//   description: string;
// }

class App {

  state: IState;
  harp: Harp;
  pitchConstellation: PitchConstellation;
  scaleSelector: ScaleSelector;
  droneSelector: DroneSelector;
  scales: IScale[] = scales;
  private prevScaleBtn = document.getElementById('scaleSelectPrevBtn');
  private nextScaleBtn = document.getElementById('scaleSelectNextBtn');



  constructor() {


    // DEFAULT STATE
    this.state = {

      // the index of the active drone button. (-1 means none are active)
      droneIdx: -1,

      // current scale choice
      scale: {
        frequencies: [261.6255653006, 274.52698453615, 329.62755691287, 349.22823143301, 391.99543598175, 411.32572372413, 493.88330125613],
        name: 'Xenakis',
        description: 'This is a description for Xenakis'
      },

    }

    this.prevScaleBtn.addEventListener('click', e => this.onScaleChange('prev', e));
    this.nextScaleBtn.addEventListener('click', e => this.onScaleChange('next', e));

  }


	init() {
		console.log('INITIALIZED APP');

		// on resize event listener
		window.addEventListener('resize', this.onResize.bind(this));

    // harp controller
    this.harp = new Harp(document.getElementById('harp'));

    // pitch constellation
    this.pitchConstellation = new PitchConstellation(document.getElementById('pitchConstellation'))

    // initialise scale selector
    this.scaleSelector = new ScaleSelector()

    // initialise drone selector
    this.droneSelector = new DroneSelector()

    // draw everything
    this.draw();
	}

  onScaleChange(direction: 'prev' | 'next', e) {
    if (direction === 'prev') this.onScaleChangePrev(e);
    if (direction === 'next') this.onScaleChangeNext(e);
  }

  onScaleChangePrev(e) {
    this.scaleSelector.prev();
  }

  onScaleChangeNext(e) {
    this.scaleSelector.next();
  }

  setScale(scaleIdx: number = 0, cb: (state: IState) => any = function(){}) {

    this.state.scale = this.scales[scaleIdx];

    console.log('new state =', this.state);
    cb(this.state);
    this.scaleDidChange();
  }

  scaleDidChange() {
    this.pitchConstellation.drawLines(this.state.scale.frequencies);
    this.harp.updateScale(this.state.scale.frequencies);
  }

  randomNumberBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

	onResize() {
    this.harp.onResize();
		this.draw();
	}



  /**
   * DRAW ALL COMPONENTS
   */
  draw() {
    this.harp.draw(this.state.scale.frequencies);
    this.pitchConstellation.drawLines(this.state.scale.frequencies);
  }






}



export default App;