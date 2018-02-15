import MonoSynth from './Audio/MonoSynth';
import {connectManyToOne} from './Audio/helpers/routing';

class BassSynth {

  private _activeKeys = new Set<number>();

  bassSynth1: MonoSynth;
  bassSynth2: MonoSynth;
  bassSynth3: MonoSynth;
  output = this.context.createGain();
  private _compressor = this.context.createDynamicsCompressor();

  constructor(public context: AudioContext) {
    this.bassSynth1 = new MonoSynth(context);
    this.bassSynth2 = new MonoSynth(context);
    this.bassSynth3 = new MonoSynth(context);
    this.bassSynth1.waveform = 'triangle';
    this.bassSynth2.waveform = 'sine';
    this.bassSynth3.waveform = 'square';

    const vols = [0.338, 0.355, 0.022]
    const mult = 1.3;
    this.bassSynth1.volume = vols[0]*mult;
    this.bassSynth2.volume = vols[1]*mult;
    this.bassSynth3.volume = vols[2]*mult;

    connectManyToOne(this._compressor, this.bassSynth1, this.bassSynth2, this.bassSynth3)
    this._compressor.connect(this.output);
  }

  noteOn(frequency, id = -1) {
    this.bassSynth1.frequency = frequency;
    this.bassSynth2.frequency = frequency/2;
    this.bassSynth3.frequency = frequency/2;
    this.bassSynth1.noteOn(frequency, undefined, undefined, 0.1);
    this.bassSynth2.noteOn(frequency/2, undefined, undefined, 0.1);
    this.bassSynth3.noteOn(frequency/2, undefined, undefined, 0.1);
    this._activeKeys.add(id);
  }

  noteOff(id = -1) {
    this._activeKeys.delete(id);

    if (this._activeKeys.size === 0) {
      this.bassSynth1.noteOff(undefined, 0.5)
      this.bassSynth2.noteOff(undefined, 0.8)
      this.bassSynth3.noteOff(undefined, 0.2)
    }
  }

  purge() {
    this.bassSynth1.noteOff(undefined, 0.5)
    this.bassSynth2.noteOff(undefined, 0.8)
    this.bassSynth3.noteOff(undefined, 0.2)
    this._activeKeys.clear();
  }

  connect(destination: AudioNode | AudioNodeBase, output?: number, input?: number) {
    this.output.connect.apply(this.output, arguments)
  }

}
export default BassSynth;