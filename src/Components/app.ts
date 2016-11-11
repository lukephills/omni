import Harp from './Harp';
import PitchConstellation from './PitchConstellation';
import ScaleSelector from './ScaleSelector';
import DroneSelector from './DroneSelector';
import RootNoteSelector from './RootNoteSelector';
import FavScaleSelector from './FavScaleSelector';
import {scales, IScale} from '../Utils/Scales/scales-shortlist';
import {scaleFromRoot12Idx} from '../Utils/Audio/scales';

import {log} from '../Utils/logger'

import {KeyboardManager} from './Inputs/KeyboardManager';
import {getKeyBinding, getKeyType, KeyType, KeyboardEventLatest, keyboardCodeMap} from './Inputs/KeyboardBindings';

interface IState {
  droneIdx: number;
  scale: IScale;
  scaleIdx: number;
  rootNoteIdx: number;
  octave: number;
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
  rootNoteSelector: RootNoteSelector;
  droneSelector: DroneSelector;
  favScaleSelector: FavScaleSelector;
  scales: IScale[] = scales;
  keyboardManager: KeyboardManager;

  private prevScaleBtn = document.getElementById('scaleSelectPrevBtn');
  private nextScaleBtn = document.getElementById('scaleSelectNextBtn');



  constructor() {


    // DEFAULT STATE
    this.state = {

      // the index of the active drone button. (-1 means none are active)
      droneIdx: -1,

      // current scale choice index
      scaleIdx: 0,

      // current scale choice
      scale: {
        frequencies: [261.6255653006, 274.52698453615, 329.62755691287, 349.22823143301, 391.99543598175, 411.32572372413, 493.88330125613],
        name: 'Xenakis',
        description: 'This is a description for Xenakis'
      },

      // The musical key choice
      rootNoteIdx: 0,

      // octave
      octave: -1,

    }

    if (this.prevScaleBtn) {
      this.prevScaleBtn.addEventListener('click', e => this.onScaleChange('prev', e));
    }
    if (this.nextScaleBtn) {
      this.nextScaleBtn.addEventListener('click', e => this.onScaleChange('next', e));
    }

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

    // initialise root note selector
    this.rootNoteSelector = new RootNoteSelector()

    // initialise drone selector
    this.droneSelector = new DroneSelector()

    // initialise favourite scale selector
    this.favScaleSelector = new FavScaleSelector()

    // draw everything
    this.draw();

    // initialize keyboard events
    this.keyboardManager = new KeyboardManager({
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
    });

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

  setScale(scaleIdx = this.state.scaleIdx, rootNoteIdx = this.state.rootNoteIdx, octave = this.state.octave) {

    this.state.scaleIdx = scaleIdx;

    this.state.scale = this.scales[scaleIdx];

    let freqs = this.state.scale.frequencies



    // transform scale frequencies using rootNote idx and lower by 1 octave
    if (freqs) {
      this.state.scale.frequencies = scaleFromRoot12Idx(freqs, rootNoteIdx, this.state.octave);
    }

    this.onStateChange();
    this.scaleDidChange();
  }

  scaleDidChange() {
    if (this.state.scale.frequencies) {
      this.pitchConstellation.drawLines(this.state.scale.frequencies);
      this.harp.updateScale(this.state.scale.frequencies, this.state.rootNoteIdx);
    }
  }

  setRootNote(rootNoteIdx: number) {
    this.state.rootNoteIdx = rootNoteIdx;
    this.setScale();
  }

  randomNumberBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

	onResize() {
    this.harp.onResize();
		this.draw();
	}

  onStateChange() {
    console.log('new state =', this.state);
  }



  /**
   * DRAW ALL COMPONENTS
   */
  draw() {
    if (this.state.scale.frequencies) {
      this.harp.draw(this.state.scale.frequencies);
      this.pitchConstellation.drawLines(this.state.scale.frequencies);
    }
  }




  onKeyDown(e: KeyboardEventLatest) {
    const key = getKeyBinding(e);
    const keyType: KeyType = getKeyType(key);


    if (keyType === 'harp') {
      this.harp.onKeyDown(key)
    } else if (keyType === 'rootNote') {
      this.rootNoteSelector.setKey(key - 40);
    } else if (keyType === 'control') {
      this.emitKeyControlAction(key);
    }
    console.log('start ', key)
  }

  onKeyUp(e: KeyboardEventLatest) {
    const key = getKeyBinding(e);
    const keyType: KeyType = getKeyType(key);

    console.log('stop ', key, keyType)
  }

  emitKeyControlAction(key: number) {
    switch (key) {
      case keyboardCodeMap.ArrowUp:
        this.scaleSelector.prev();
        break;
      case keyboardCodeMap.ArrowDown:
        this.scaleSelector.next();
        break;
      case keyboardCodeMap.ArrowLeft:
        this.scaleSelector.prev();
        break;
      case keyboardCodeMap.ArrowRight:
        this.scaleSelector.next();
        break;
      default:
        break;
    }
  }

}



export default App;