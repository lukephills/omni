
import AudioNodeBase from './AudioNodeBase';

class ADSR extends AudioNodeBase {

  attack = 0.01;
  release = 0.01;
  velocity = 1;
  readonly _minLevel = 0.00001;

	constructor(public ctx: AudioContext) {
		super(ctx);
		this.input.gain.value = this._minLevel;
    this.input.connect(this.output);
	}

	triggerAttack(time = this.ctx.currentTime, velocity = this.velocity, attack = this.attack) {
    this.input.gain.cancelScheduledValues(time);
		this.input.gain.setValueAtTime(this.input.gain.value, time);
		this.input.gain.exponentialRampToValueAtTime(velocity, time + attack);
	};

  triggerAttackRelease(time = this.ctx.currentTime, velocity = this.velocity, attack = this.attack, release = this.release) {
    this.input.gain.cancelScheduledValues(time);
    this.input.gain.setValueAtTime(this._minLevel, time);
		this.input.gain.exponentialRampToValueAtTime(velocity, time + attack);
		this.input.gain.exponentialRampToValueAtTime(this._minLevel, time + attack + release);
  }

  triggerRelease(time = this.ctx.currentTime, release = this.release) {
    this.input.gain.cancelScheduledValues(time);
    this.input.gain.setValueAtTime(this.input.gain.value, time);
    this.input.gain.exponentialRampToValueAtTime(this._minLevel, time + release);
  }

}

export default ADSR;