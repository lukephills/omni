import AudioNodeBase from './AudioNodeBase';
import {connectManyToOne, connectSeries} from './helpers/routing';
import ADSR from './ADSR';

class MonoSynth extends AudioNodeBase {

  osc1: OscillatorNode | null;
  osc2: OscillatorNode;
  filter: BiquadFilterNode;
  envelope: ADSR

  constructor(public actx: AudioContext) {
    super(actx);
    this.envelope = new ADSR(actx);
    connectSeries(this.envelope, this.output, this.actx.destination);
  }

  noteOn(note, time = this.ctx.currentTime, velocity?, attack?) {
    if (this.osc1) {
      this.osc1.stop(time);
    }
    this.osc1 = this.actx.createOscillator();
    this.osc1.frequency.value = note;
    this.osc1.connect(this.envelope)
    this.osc1.start();
    this.envelope.triggerAttack(time, velocity, attack)
  }

  noteOff(time = this.ctx.currentTime, release = 0.01) {
    if (this.osc1 !== null) {
      this.osc1.stop(time + release);
      this.osc1 = null;
    }
    this.envelope.triggerRelease(time, release)
  }


}
export default MonoSynth;