import AudioController from './AudioController';
import Harp from './Harp';
import XYPad from './XYPad';

import PitchConstellation from './PitchConstellation';
import ScaleSelector from './ScaleSelector';
import DroneSelector from './DroneSelector';
import RootNoteSelector from './RootNoteSelector';
import FavScaleSelector from './FavScaleSelector';
import SettingsCarouselManager from './SettingsCarousels';
import LoopController from './LoopController';
import { scales, IScale } from '../Utils/Scales/scales-shortlist';

import { populateFXCarousels } from './appSpecific/populateFXCarousels';

import { scaleFromRoot12Idx } from '../Utils/Audio/scales';

import { initViewController } from './ViewController'
import { $ } from '../Utils/selector'
import { round, incrementIfWithinRange, decrementIfWithinRange } from '../Utils/number'

const SVGInjector = require('svg-injector')
// import {effects} from '../Constants/Effects'

// import {log} from '../Utils/logger'

import { KeyboardManager } from './Inputs/KeyboardManager';
import { getKeyBinding, getKeyType, KeyType, KeyboardEventLatest, keyboardCodeMap } from './Inputs/KeyboardBindings';

interface IState {
  droneIdx: number;
  voiceIdx: number;
  scale: IScale;
  scaleIdx: number;
  rootNoteIdx: number;
  octaveOffset: number;
  octavesToDisplay: number;
  xEffect: number;
  yEffect: number;
}

interface IEffect {
  name: string;
  setVal: any;
  getVal: any;
  isDefault?: string;
}




class App {

  audio: AudioController;
  // actx: AudioContext;
  state: IState;
  harp: Harp;
  xyPad: XYPad;
  // sliders: Slider[] = []
  // bass: BassController;
  pitchConstellation: PitchConstellation;
  scaleSelector: ScaleSelector;
  rootNoteSelector: RootNoteSelector;
  droneSelector: DroneSelector;
  settingsCarouselManager: SettingsCarouselManager;
  favScaleSelector: FavScaleSelector;
  loopController: LoopController;
  scales: IScale[] = scales;
  keyboardManager: KeyboardManager;

  effects: IEffect[];


  private prevScaleBtns = $('.js-scaleSelectPrevBtn');
  private nextScaleBtns = $('.js-scaleSelectNextBtn');
  private xEffectNameEl = $('#xAxisName')[0];
  private yEffectNameEl = $('#yAxisName')[0];


  constructor() {

    // DEFAULT STATE
    this.state = {

      // the index of the active drone button. (-1 means none are active)
      droneIdx: -1,

      // current scale choice index
      scaleIdx: 0,

      voiceIdx: 0,

      // current scale choice
      scale: {
        frequencies: [0],
        name: '',
        description: ''
      },

      // The musical key choice
      rootNoteIdx: 0,

      // start octave
      octaveOffset: -1,
      octavesToDisplay: 2,

      // XY pad effect choices
      yEffect: 2,
      xEffect: 3,

    }

    if (this.prevScaleBtns.length) {
      this.prevScaleBtns.forEach(el => el.addEventListener('click', e => this.onScaleChange('prev', e)));
    }
    if (this.nextScaleBtns.length) {
      this.nextScaleBtns.forEach(el => el.addEventListener('click', e => this.onScaleChange('next', e)));
    }

  }

  init() {
    // on resize event listener
    window.addEventListener('resize', this.onResize.bind(this));

    // this.actx = createIOSSafeAudioContext(44100);

    this.harp = new Harp(<HTMLCanvasElement>document.getElementById('harp'));

    this.audio = new AudioController();

    this.xyPad = new XYPad(<HTMLCanvasElement>document.getElementById('xyPad'));
    const xAxisOutputEl = $('#xAxisVal')[0];
    const yAxisOutputEl = $('#yAxisVal')[0];

    this.xyPad.onChange = (x: any, y: any) => {
      this.effects[this.state.xEffect].setVal(x);
      this.effects[this.state.yEffect].setVal(y);
      if (xAxisOutputEl && yAxisOutputEl) {
        xAxisOutputEl.innerHTML = round(x * 100, 0).toString();
        yAxisOutputEl.innerHTML = round(y * 100, 0).toString();
      }
    }

    this.pitchConstellation = new PitchConstellation(<HTMLElement>document.getElementById('pitchConstellation'))

    this.favScaleSelector = new FavScaleSelector()

    this.scaleSelector = new ScaleSelector()

    this.rootNoteSelector = new RootNoteSelector()

    this.droneSelector = new DroneSelector()

    this.settingsCarouselManager = new SettingsCarouselManager()

    this.effects = [
      {
        name: 'feedback',
        setVal: (val) => this.audio.delay.feedback = val,
        getVal: () => this.audio.delay.feedback,
      },
      {
        name: 'distortion',
        setVal: (val) => this.audio.distortion.mix = val,
        getVal: () => this.audio.distortion.mix,
      },
      {
        name: 'delay time',
        setVal: (val) => this.audio.delay.delay = val,
        getVal: () => this.audio.delay.delay,
      },
      {
        name: 'reverb',
        setVal: (val) => this.audio.convolver.mix = val,
        getVal: () => this.audio.convolver.mix,
      },
      {
        name: 'sustain',
        setVal: (val) => this.audio.harp.release = val * 3 + 0.1,
        getVal: () => this.audio.harp.release / 3 - 0.1,
      }
    ]

    this.setXEffect(this.state.xEffect)
    this.setYEffect(this.state.yEffect)

    this.setupEffectsSwitch();
    // populateFXCarousels(this.state, this.effects)

    // todo: do these if checks inside loop controller instead
    const recBtnEl = document.getElementById('recordBtn');
    const playBtnEl = document.getElementById('playBtn');
    const downloadBtnEl = document.getElementById('downloadBtn');
    if (recBtnEl && playBtnEl) {
      this.loopController = new LoopController(recBtnEl, playBtnEl, downloadBtnEl);
    }


    // Inject all svgs
    // SVGInjector(document.querySelectorAll('img.inject-me'));


    initViewController();


    // draw everything
    this.draw();

    // initialize keyboard events
    this.keyboardManager = new KeyboardManager({
      onKeyDown: this.onKeyDown.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
    });

  }


  setupEffectsSwitch() {
    const effectChoiceTriggerEls = $('.js-fx-switch')
    if (!effectChoiceTriggerEls.length) return;

    // TODO use a class selector to group these two together
    effectChoiceTriggerEls.forEach(el => {
      el.addEventListener('click', this.handleFXChange.bind(this))
    })
  }

  handleFXChange(e) {
    const data = (e.target as HTMLElement).dataset;
    const fxLen = this.effects.length - 1;
    const yFx = this.state.yEffect;
    const xFx = this.state.xEffect;

    if (data.direction === "prev") {
      if (data.xy === 'y') {
        let idx = yFx === 0 ? fxLen : yFx - 1;
        if (xFx === idx) {
          idx = xFx === 0 ? fxLen : xFx - 1;
        }
        this.setYEffect(idx)
      } else {
        let idx = xFx === 0 ? fxLen : xFx - 1;
        if (yFx === idx) {
          idx = yFx === 0 ? fxLen : yFx - 1;
        }
        this.setXEffect(idx)
      }
    } else {
      if (data.xy === 'y') {
        let idx = yFx >= fxLen ? 0 : yFx + 1;
        if (xFx === idx) {
          idx = xFx >= fxLen ? 0 : xFx + 1;
        }
        this.setYEffect(idx)
      } else {
        let idx = xFx >= fxLen ? 0 : xFx + 1;
        if (yFx === idx) {
          idx = yFx >= fxLen ? 0 : yFx + 1;
        }
        this.setXEffect(idx)
      }
    }
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

  setVoice(val: number) {
    this.state.voiceIdx = val;
  }

  setXEffect(val: number) {
    this.state.xEffect = val;

    // update the xyPad button position
    this.xyPad.xPos = this.effects[val].getVal()

    if (this.xEffectNameEl) {
      this.xEffectNameEl.innerHTML = this.effects[val].name;
    }
  }


  setYEffect(val: number) {
    this.state.yEffect = val;

    // update the xyPad button position
    this.xyPad.yPos = this.effects[val].getVal()

    if (this.yEffectNameEl) {
      this.yEffectNameEl.innerHTML = this.effects[val].name;
    }
  }

  private isDuplicateXYPadChoice() {
    return this.state.yEffect === this.state.xEffect ? true : false;
  }

  setHarpOctaves(val: number) {
    this.state.octavesToDisplay = val;
    this.harp.octavesToDisplay = val;
    this.scaleDidChange();
  }

  setHarpOctaveOffset(val: number) {
    this.state.octaveOffset = val;
    this.setScale();
  }

  setScale(scaleIdx = this.state.scaleIdx, rootNoteIdx = this.state.rootNoteIdx, octave = this.state.octaveOffset) {

    this.state.scaleIdx = scaleIdx;

    this.state.scale = this.scales[scaleIdx];

    let freqs = this.state.scale.frequencies

    // transform scale frequencies using rootNote idx and lower by 1 octave
    if (freqs) {
      this.state.scale.frequencies = scaleFromRoot12Idx(freqs, rootNoteIdx, this.state.octaveOffset);
    }

    // this.onStateChange();
    this.scaleDidChange();

    this.favScaleSelector.setActiveClass(scaleIdx);
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

  onResize() {

    // Resize canvas components
    this.harp.onResize();
    this.xyPad.onResize();

    this.draw();
  }

  /**
   * DRAW ALL COMPONENTS
   */
  draw() {
    if (this.state.scale.frequencies) {
      this.harp.draw(this.state.scale.frequencies);
      this.xyPad.draw();
      this.pitchConstellation.drawLines(this.state.scale.frequencies);
      // this.sliders.forEach(s => s.draw());
    }
  }

  onKeyDown(e: KeyboardEventLatest) {
    const key = getKeyBinding(e);
    const keyType: KeyType = getKeyType(key);


    if (keyType === 'harp') {
      this.harp.onKeyDown(key - 10)
    } else if (keyType === 'bass') {
      this.audio.bassNoteOn(key)
    } else if (keyType === 'rootNote') {
      this.rootNoteSelector.setKey(key - 40);
    } else if (keyType === 'control') {
      this.emitKeyControlAction(key);
    }
  }

  onKeyUp(e: KeyboardEventLatest) {
    const key = getKeyBinding(e);
    const keyType: KeyType = getKeyType(key);
    if (keyType === 'bass') {
      this.audio.bassNoteOff(key)
    }
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
        this.favScaleSelector.prev();
        break;
      case keyboardCodeMap.ArrowRight:
        this.favScaleSelector.next();
        break;
      default:
        break;
    }
  }

}



export default App;