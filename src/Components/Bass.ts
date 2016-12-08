import MonoSynth from './Audio/MonoSynth';
import {getFrequencyFromNoteIndexInScale, Scale} from './../Utils/Audio/scales';
import {Omni} from '../index';

class BassController {

  bassSynth: MonoSynth;
  private _activeKeys = new Set<number>();
  private _activeKey = -1;

  constructor(actx: AudioContext) {
    this.bassSynth = new MonoSynth(actx);
  }

  onKeyDown(key: number) {
    const frequency = getFrequencyFromNoteIndexInScale(key, <number[]>Omni.state.scale.frequencies, 0);
    this.bassSynth.noteOn(frequency, undefined, undefined, 0.1);
    this._activeKey = key;
  }

  onKeyUp(key: number) {
    if (this._activeKey === key) {
      this.bassSynth.noteOff(undefined, 0.1)
      this._activeKey = -1;
    }
  }

}
export default BassController;