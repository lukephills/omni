import {connectOneToMany} from './helpers/routing';
import AudioNodeBase from './AudioNodeBase';

class FeedbackDelay extends AudioNodeBase {

  private _delay: DelayNode;
  private _feedback: GainNode;
  private _wetLevel: GainNode;

  constructor(public ctx: AudioContext, delay = 0.15, feedback = 0.25, wetLevel = 0.25) {
    super(ctx);
    this._delay = this.ctx.createDelay();
    this._feedback = this.ctx.createGain();
    this._wetLevel = this.ctx.createGain();

    // set values
    this._delay.delayTime.value = delay;
    this._feedback.gain.value = feedback;
    this._wetLevel.gain.value = wetLevel;

    connectOneToMany(this.input, this._delay, this.output)
    connectOneToMany(this._delay, this._feedback, this._wetLevel)
    this._feedback.connect(this._delay)
    this._wetLevel.connect(this.output);
  }

  get delay() {
    return this._delay.delayTime.value;
  }

  set delay(val: number) {
    this._delay.delayTime.value = val;
  }

  get feedback() {
    return this._feedback.gain.value;
  }

  set feedback(val: number) {
    this._feedback.gain.value = val
  }

  get wet() {
    return this._wetLevel.gain.value;
  }

  set wet(level: number) {
    this._wetLevel.gain.value = level;
  }

}

export default FeedbackDelay;