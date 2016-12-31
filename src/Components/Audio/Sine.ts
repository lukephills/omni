import AudioNodeBase from './AudioNodeBase';
import ADSR from './ADSR';
import {getOvertones} from '../../Utils/Audio/scales';


// var c = new AudioContext();
// var osc = c.createOscillator();


class Sine extends AudioNodeBase {

  public input: GainNode;
  public output: GainNode;
  public frequency: number = 440;
  public ADSR: ADSR;

  private osc: OscillatorNode;

  private Decay: number;
  private Sustain: number;

  private overtoneOscs: OscillatorNode[];
  private overtoneGains: GainNode[];

  constructor(ctx, public attack = 0.005, public release = 3) {
    super(ctx);
    this.input = this.ctx.createGain();
    this.output = this.ctx.createGain();
	}

	public noteOn(volume) {
    const attack = this.attack;
		const release = this.release + (Math.random() * 0.1);

		this.setup();
		let now = this.ctx.currentTime;
		this.osc.start();
		this.osc.stop(now + this.attack + this.release);

		this.overtoneOscs.forEach((osc) => {
			osc.start(now);
			osc.stop(now + this.attack + this.release);
		});

		this.ADSR.triggerAttackRelease(now, volume / 1.3, attack, release);
	}



	private setup() {

		this.osc = this.ctx.createOscillator();
		this.ADSR = new ADSR(this.ctx);

		this.overtoneOscs = [];
		this.overtoneGains = [];
		const overtones: number[] = getOvertones(this.frequency, 2);

		overtones.forEach((tone, i) => {
			this.overtoneOscs[i] = this.ctx.createOscillator();
			this.overtoneOscs[i].type = 'sine';
			this.overtoneOscs[i].frequency.value = tone;

			this.overtoneGains[i] = this.ctx.createGain();
			this.overtoneGains[i].gain.value = 1 / (i + 4);

			this.overtoneOscs[i].connect(this.overtoneGains[i]);
			this.overtoneGains[i].connect(this.ADSR);
		});


		this.osc.type = 'triangle';
		this.osc.frequency.value = this.frequency;

		this.osc.connect(this.ADSR);
		this.ADSR.connect(this.output);
	}



}

export default Sine;
