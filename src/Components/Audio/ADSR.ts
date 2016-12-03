
import AudioNodeBase from './AudioNodeBase';

class ADSR extends AudioNodeBase {

	constructor(public ctx: AudioContext) {
		super(ctx);
		this.input.gain.value = 0.001;
    this.input.connect(this.output);
	}

	trigger(time: number, g: number = 1, a: number = 0.01, r: number = 0.01): void {
		this.input.gain.setValueAtTime(0.001, time);
		this.input.gain.exponentialRampToValueAtTime(g, time + a);
		this.input.gain.exponentialRampToValueAtTime(0.001, time + a + r);
	};

  release(): void {
    console.log('release');
  }

}

export default ADSR;