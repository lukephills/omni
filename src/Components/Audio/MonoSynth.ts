import AudioNodeBase from './AudioNodeBase';
import {connectManyToOne, connectSeries} from './helpers/routing';
import ADSR from './ADSR';

class MonoSynth extends AudioNodeBase {

  osc1: OscillatorNode;
  osc2: OscillatorNode;
  filter: BiquadFilterNode;
  envelope: ADSR

  constructor(public actx: AudioContext) {
    super(actx);

    this.osc1 = actx.createOscillator();
    this.osc1.start();
    this.envelope = new ADSR(actx);
    connectSeries(this.osc1, this.envelope, this.output);
  }

  noteOn(frequency, time?, velocity?, attack?) {
    this.osc1.frequency.value = frequency;
    this.envelope.triggerAttack(time, velocity, attack)
  }

  noteOff(time?, release?) {
    this.envelope.triggerRelease(time, release)
  }

  set frequency(value: number) {
    this.osc1.frequency.value = value;
  }

  get frequency() {
    return this.osc1.frequency.value;
  }

  set waveform(type: string) {
    this.osc1.type = type;
  }

  get waveform() {
    return this.osc1.type;
  }

}
export default MonoSynth;