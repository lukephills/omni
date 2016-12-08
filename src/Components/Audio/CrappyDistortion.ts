import {connectSeries} from './helpers/routing';
import AudioNodeBase from './AudioNodeBase';

type oversampleType = 'none' | '2x' | '4x';

class CrappyDistortion extends AudioNodeBase {

  distortion: WaveShaperNode;
  private _drive: number;

  constructor(public ctx: AudioContext, drive: number = 4, oversample: oversampleType = '4x') {
    super(ctx);
    this.distortion = ctx.createWaveShaper();
    this._drive = drive;
    this.distortion.curve = makeDistortionCurve(drive);
    this.distortion.oversample = oversample;
    connectSeries(this.input, this.distortion, this.output);
  }

  set oversample(val: oversampleType) {
    this.distortion.oversample = val;
  }

  get oversample() {
    return (this.distortion.oversample) as oversampleType;
  }

  set drive(amount: number) {
    this._drive = amount;
    this.distortion.curve = makeDistortionCurve(amount);
  }

  get drive() {
    return this._drive;
  }

}

export default CrappyDistortion;


function makeDistortionCurve(amount) {
  let k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};