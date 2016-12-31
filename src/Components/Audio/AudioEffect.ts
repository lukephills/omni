import AudioNodeBase from './AudioNodeBase';
import {numberWithinRange} from '../../Utils/number';

abstract class AudioEffect extends AudioNodeBase {

  // Effects that extend this abstract class must connect all effect specifc stuff to fxIn and fxOut
  protected fxIn = this.ctx.createGain();
  protected fxOut = this.ctx.createGain();

  private _mix = 0.5;
  private _dry = this.context.createGain();
  private _wet = this.context.createGain();


  constructor(public context: AudioContext) {
    super(context);

    // Split the signal two ways
    this.input.connect(this._dry)
    this.input.connect(this._wet)

    // Dry bypasses the effect
    this._dry.connect(this.output)

    // Wet through the effect
    this._wet.connect(this.fxIn)
    this.fxOut.connect(this.output)
  }

  connect(destination: AudioNode | AudioNodeBase, output?: number, input?: number) {
    this.output.connect.apply(this.output, arguments)
  }

  disconnect(destination?: AudioNode | number | AudioParam | AudioNodeBase, output?: number, input?: number) {
    this.output.disconnect.apply(this.output, arguments)
  }

  get mix() {
    return this._mix;
  }

  set mix(mix: number) {
    mix = numberWithinRange(mix, 0, 1)
    this._mix = mix

    this._dry.gain.value = Math.abs(mix - 1);
    this._wet.gain.value = mix;
  }

}

export default AudioEffect;