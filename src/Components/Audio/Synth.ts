
import '../../Utils/audio-shim';
import { DEFAULTS } from '../../Constants/Defaults';
import * as CanvasUtils from '../../Utils/CanvasUtils';
import {WaveformStringType} from '../../Constants/AppTypings';

import {getFrequencyFromNoteIndexInScale} from '../../Utils/Audio/scales';
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

class Synth {

	public voiceCount: number = DEFAULTS.VoiceCount;
	output: GainNode;


	// Oscillators
  public oscillators: Map<number, IOsc> = new Map();
  public voicesAmount: number = 50;


	constructor(public context: AudioContext) {

		// Gains
		this.output = this.context.createGain();

    // Create a pool of oscillators
    for (let i = 0; i < this.voicesAmount; i++) {
      this.oscillators.set(i, {
        osc: new Sine(this.context),
        active: false,
        index: -1,
      });
    }

    // connect all the oscillators in the pool
    for (let {osc} of this.oscillators.values()) {
      // osc is inactive, set it's frequency, trigger it & set it to active.
      osc.connect(this.output);
    }
	}

  connect(destination: AudioNode | AudioNodeBase, output?: number, input?: number) {
    this.output.connect.apply(this.output, arguments)
  }


	public NoteOn(frequency: number, volume: number = 1, index: number): void {

    for (let [key, value] of this.oscillators.entries()) {
      // find an inactive osc
      // if (value.active) {
      //   // osc is active so keep searching
      //  continue;
      // } else {
        // osc is inactive, set it's frequency, trigger it & set it to active.
        console.log(key, value);
        value.osc.frequency = frequency;
        value.osc.noteOn(volume);
        console.log(volume)
        value.index = index;
        value.active = true;
        break;
      // }
    }


	}

	public NoteOff(index: number): void {
    console.log('note off')
    // if this oscillator has the index given stop it and set it to inactive
    if (this.oscillators.has(index)) {
      let oscillator = this.oscillators.get(index);
      if (oscillator) {
        oscillator.active = false;
      }
    }
	}

  // public updateNote(x: number, y: number, index: number): void {
  //   if (this.oscillators.has(index)) {
  //     let oscillator = this.oscillators.get(index);
  //     // oscillator.osc.();
  //   }
  // }


	// public StopAll(): void {
	// 	for (let i: number = 0; i < this.voiceCount; i++) {
	// 		this.NoteOff(i);
	// 	}
	// }

	// public SetWaveform(value: WaveformStringType): void {
	// 	this.oscillators.forEach((osc: OscillatorNode) => {
	// 		osc.type = value;
	// 	});
	// }

	// public SetFilterFrequency(y: number, id: number): void {
	// 	if (id < this.voiceCount) {
	// 		if (y === 0) y = this._minFrequency;
	// 		this.filters[id].frequency.value = (this.context.sampleRate / 2) * (y / 150);
	// 	}
	// }







}
export default Synth;
