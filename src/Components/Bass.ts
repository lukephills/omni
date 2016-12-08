import MonoSynth from './Audio/MonoSynth';
import {getFrequencyFromNoteIndexInScale, Scale} from './../Utils/Audio/scales';
import {Omni} from '../index';

class BassController {

  bassSynth1: MonoSynth;
  bassSynth2: MonoSynth;
  bassSynth3: MonoSynth;
  private _activeKeys = new Set<number>();
  private _activeKey = -1;

  constructor(actx: AudioContext) {
    this.bassSynth1 = new MonoSynth(actx);
    this.bassSynth2 = new MonoSynth(actx);
    this.bassSynth3 = new MonoSynth(actx);
    this.bassSynth1.waveform = 'triangle';
    this.bassSynth2.waveform = 'sine';
    this.bassSynth3.waveform = 'sawtooth';
    this.bassSynth1.volume = 0.1;
    this.bassSynth2.volume = 0.01;
    this.bassSynth3.volume = 0.003;
    this.bassSynth1.connect(actx.destination)
    this.bassSynth2.connect(actx.destination)
    this.bassSynth3.connect(actx.destination)

  }

  onKeyDown(key: number) {
    const frequency = getFrequencyFromNoteIndexInScale(key, <number[]>Omni.state.scale.frequencies, -1);
    this.bassSynth1.frequency = frequency;
    this.bassSynth2.frequency = frequency*1.5;
    this.bassSynth3.frequency = frequency/2;
    this.bassSynth1.noteOn(frequency, undefined, undefined, 0.1);
    this.bassSynth2.noteOn(frequency*1.5, undefined, undefined, 0.8);
    this.bassSynth3.noteOn(frequency/2, undefined, undefined, 0.2);
    this._activeKeys.add(key);
  }

  onKeyUp(key: number) {
    this._activeKeys.delete(key);

    if (this._activeKeys.size === 0) {
      this.bassSynth1.noteOff(undefined, 0.5)
      this.bassSynth2.noteOff(undefined, 0.8)
      this.bassSynth3.noteOff(undefined, 0.2)
    }
  }

}
export default BassController;