
import ToneTs from './ToneTs';

class ADSR extends ToneTs {

	public gainNode: GainNode;

	constructor(ctx: AudioContext) {
		super(ctx);
		this.ctx = ctx;
		this.gainNode = this.ctx.createGain();
		this.gainNode.gain.value = 0.001;
	}

	trigger(time: number, g: number = 1, a: number = 0.01, r: number = 0.01): void {
		this.gainNode.gain.setValueAtTime(0.001, time);
		this.gainNode.gain.exponentialRampToValueAtTime(g, time + a);
		this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + a + r);
	};

  release(): void {
    console.log('release');
  }

}

export default ADSR;