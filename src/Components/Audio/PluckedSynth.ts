
import '../../Utils/audio-shim';
import { DEFAULTS } from '../../Constants/Defaults';
import * as CanvasUtils from '../../Utils/CanvasUtils';
import {WaveformStringType} from '../../Constants/AppTypings';

import Sine from './Sine';


interface IOsc {
  /**
   * is it in use?
   */
  active: boolean;

  /**
   * it's current index associated with touch identifier
   */
  index: number

  /**
   * the audio component
   */
  osc: Sine;
}

class PluckedSynth {

	output = this.context.createGain();
  osc: Sine

	constructor(public context: AudioContext) {
    this.osc = new Sine(this.context)
    this.osc.connect(this.output);
	}

  connect(destination: AudioNode | AudioNodeBase, output?: number, input?: number) {
    this.output.connect.apply(this.output, arguments)
  }


	NoteOn(frequency: number, volume: number = 1, index: number): void {
      this.osc.frequency = frequency;
      this.osc.noteOn(volume);
	}

	NoteOff(index: number): void {}

  set attack(val: number) {
    this.osc.attack = val;
  }

  get attack(): number {
    return this.osc.attack;
  }

  set release(val: number) {
    this.osc.release = val;
  }

  get release(): number {
    return this.osc.release;
  }


}
export default PluckedSynth;
