import {connectSeries} from './helpers/routing';
import {makeDistortionCurve} from './helpers/distortionCurves';
import AudioEffect from './AudioEffect';

type oversampleType = 'none' | '2x' | '4x';

class CrappyDistortion extends AudioEffect {

  distortion = this.ctx.createWaveShaper();
  private _drive: number;

  constructor(public ctx: AudioContext, drive: number = 4, oversample: oversampleType = '4x') {
    super(ctx);

    this._drive = drive;
    this.distortion.curve = makeDistortionCurve(drive);
    this.distortion.oversample = oversample;
    connectSeries(this.fxIn, this.distortion, this.fxOut);
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


