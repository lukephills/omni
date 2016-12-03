import {connectSeries} from './helpers/routing';
import AudioNodeBase from './AudioNodeBase';

class Effect extends AudioNodeBase {

  effect;

  constructor(public ctx: AudioContext) {
    super(ctx);
    this.effect = this.ctx.createGain();
    connectSeries(this.input, this.effect, this.output);
  }

  get volume() {
    return this.output.gain.value;
  }

  set volume(level: number) {
    this.output.gain.value = level;
  }

}

export default Effect;