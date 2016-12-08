
import AudioNodeBase from './AudioNodeBase';

class ADSR extends AudioNodeBase {

  attack = 0.01;
  release = 0.01;
  velocity = 1;

	constructor(public ctx: AudioContext) {
		super(ctx);
		this.input.gain.value = 0.001;
    this.input.connect(this.output);
	}

	triggerAttack(time = this.ctx.currentTime, velocity = this.velocity, attack = this.attack) {
    this.input.gain.cancelScheduledValues(time);
		this.input.gain.setValueAtTime(0.001, time);
		this.input.gain.exponentialRampToValueAtTime(velocity, time + attack);
	};

  triggerAttackRelease(time = this.ctx.currentTime, velocity = this.velocity, attack = this.attack, release = this.release) {
    this.input.gain.cancelScheduledValues(time);
    this.input.gain.setValueAtTime(0.001, time);
		this.input.gain.exponentialRampToValueAtTime(velocity, time + attack);
		this.input.gain.exponentialRampToValueAtTime(0.001, time + attack + release);
  }

  triggerRelease(time = this.ctx.currentTime, release = this.release) {
    this.input.gain.cancelScheduledValues(time);
    this.input.gain.setValueAtTime(this.input.gain.value, time);
    console.log('stop???')
    this.input.gain.exponentialRampToValueAtTime(0.001, time + release);
  }

}

export default ADSR;