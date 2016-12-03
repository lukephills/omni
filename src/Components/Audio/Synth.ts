import {createIOSSafeAudioContext} from '../../Utils/Audio/iOS';
import '../../Utils/audio-shim';
import { DEFAULTS } from '../../Constants/Defaults';
import * as CanvasUtils from '../../Utils/CanvasUtils';
import {WaveformStringType} from '../../Constants/AppTypings';
import Looper from '../../Utils/Looper/Looper';
import {getFrequencyFromNoteIndexInScale, Scale} from '../../Utils/Audio/scales';
import Sine from './Sine';
import CrappyDistortion from './CrappyDistortion';
import FeedbackDelay from './FeedbackDelay';

interface IAnalysers {
	live: AnalyserNode;
	recording: AnalyserNode;
}

interface IOsc {
  /**
   * is it in use?
   */
  active: boolean;

  /**
   * it's current index associated with touch identifier
   */
  index: number

  /**
   * the audio component
   */
  osc: Sine;
}

class Synth {

	public context: AudioContext;
	public voiceCount: number = DEFAULTS.VoiceCount;
	public recording: AudioBufferSourceNode;
	public looper: Looper;

	public scale: Scale;
  rootNoteIdx = 0;

	// Gains
	public masterVolume: GainNode;
	public synthOut: GainNode;
	// public oscillatorGains: GainNode[];
	public scuzzGain: GainNode;
	public recordingGain: GainNode;

	// Effects
	public compressor: DynamicsCompressorNode;
	public delay: DelayNode;
	public feedback: GainNode;
	// public filters: BiquadFilterNode[];

	// Analysers
	public analysers: IAnalysers;

	// Oscillators
  public oscillators: Map<number, IOsc> = new Map();
	public scuzz: OscillatorNode;
  public voicesAmount: number = 50;

	private _frequencyMultiplier = 15;
	private _defaultCoordinates: CanvasUtils.Coordinate = {x: 0, y: 0};
	private _minFrequency = 0.8;

	constructor() {

		this.initAudioContext();
		this.createNodes();
		this.routeSounds();
		this.setupAnalysers();

		this.looper = new Looper(this.synthOut, this.recordingGain);

		this.scale = [261.6255653006, 274.52698453615, 329.62755691287, 349.22823143301, 391.99543598175, 411.32572372413, 493.88330125613];
	}

	public createNodes(): void {
		// Gains
		this.masterVolume = this.context.createGain();
		this.synthOut = this.context.createGain();
		// this.oscillatorGains = [];
		this.scuzzGain = this.context.createGain();
		this.recordingGain = this.context.createGain();

		// Effects
		this.compressor = this.context.createDynamicsCompressor();
		this.delay = this.context.createDelay();
		this.feedback = this.context.createGain();
		// this.filters = [];


		// Analysers
		this.analysers = {
			live: this.context.createAnalyser(),
			recording: this.context.createAnalyser(),
		}

		// Oscillators
		this.scuzz = this.context.createOscillator();

    // Create a pool of oscillators
    for (let i = 0; i < this.voicesAmount; i++) {
      this.oscillators.set(i, {
        osc: new Sine(this.context),
        active: false,
        index: -1,
      });
    }
	}

  /**
   * Create a pool of 50 oscillators
   *
   * oscillators is an object contanining 50 oscillatorNodes
   *
   * oscillators = {id: {osc: SINE, active: boolean} * 50}
   *
   * When a note is triggered:
   * loop through oscillators
   * find one that is not active (active === false)
   * play it
   * set active to true
   *
   * When a note is released:
   * set active to false
   *
   *
   */
	initAudioContext(): AudioContext {
		this.context = createIOSSafeAudioContext(44100);
    return this.context;
	}

	public NoteOn(noteIndex: number, volume: number = 100, index: number): void {

    const rootNoteIdx = this.rootNoteIdx;
    console.log(rootNoteIdx);
    const frequency = getFrequencyFromNoteIndexInScale(noteIndex, this.scale, -1);

    for (let [key, value] of this.oscillators.entries()) {
      // find an inactive osc
      // if (value.active) {
      //   // osc is active so keep searching
      //  continue;
      // } else {
        // osc is inactive, set it's frequency, trigger it & set it to active.
        console.log(key, value);
        value.osc.frequency = frequency;
        value.osc.noteOn(volume / 100);
        value.index = index;
        value.active = true;
        break;
      // }
    }


	}

	public NoteOff(index: number): void {
    console.log('note off')
    // if this oscillator has the index given stop it and set it to inactive
    if (this.oscillators.has(index)) {
      let oscillator = this.oscillators.get(index);
      if (oscillator) {
        oscillator.active = false;
      }
    }
	}

  public updateNote(x: number, y: number, index: number): void {
    if (this.oscillators.has(index)) {
      let oscillator = this.oscillators.get(index);
      // oscillator.osc.();
    }
  }


	// public StopAll(): void {
	// 	for (let i: number = 0; i < this.voiceCount; i++) {
	// 		this.NoteOff(i);
	// 	}
	// }

	// public SetWaveform(value: WaveformStringType): void {
	// 	this.oscillators.forEach((osc: OscillatorNode) => {
	// 		osc.type = value;
	// 	});
	// }

	// public SetFilterFrequency(y: number, id: number): void {
	// 	if (id < this.voiceCount) {
	// 		if (y === 0) y = this._minFrequency;
	// 		this.filters[id].frequency.value = (this.context.sampleRate / 2) * (y / 150);
	// 	}
	// }

	onRecordPress() {
		this.looper.recordBtnPressed();
	}

	onPlaybackPress() {
		this.looper.playBtnPressed();
	}

	public StopPlayback(): void {
		this.recording.stop(0);
	}

	public Download(cb: Function): void {
		this.looper.exportWav((recording: Blob) => {
			//TODO: create a promise?
			setTimeout(cb(recording),0);
		});
	}

	private setupAnalysers(): void {
		if (this.analysers) {
			for (const analyser in this.analysers) {
				this.analysers[analyser].maxDecibels = DEFAULTS.Analyser.maxDecibels;
				this.analysers[analyser].minDecibels = DEFAULTS.Analyser.minDecibels;
				this.analysers[analyser].smoothingTimeConstant = DEFAULTS.Analyser.smoothingTimeConstant;
			}
		}
	}

	private routeSounds(): void {
		// Set slider values
		this.delay.delayTime.value = DEFAULTS.Sliders.delay.value;
		this.feedback.gain.value = DEFAULTS.Sliders.feedback.value;
		this.scuzzGain.gain.value = DEFAULTS.Sliders.scuzz.value;

		// this.oscillatorGains.forEach((oscGain: GainNode) => {
		// 	oscGain.gain.value = 0;
		// });
		this.masterVolume.gain.value = 0.5;

		this.scuzz.frequency.value = 400;
		this.scuzz.type = DEFAULTS.Sliders.scuzz.waveform;

		// Connect the Scuzz
		this.scuzz.connect(this.scuzzGain);

    var distortion = new CrappyDistortion(this.context, 5, 'none');
    var delay = new FeedbackDelay(this.context, 0.1, 0.6, 0.5);

    // connect all the oscillators in the pool
    for (let {osc} of this.oscillators.values()) {
      // osc is inactive, set it's frequency, trigger it & set it to active.
      osc.connect(delay);
    }

    delay.connect(this.compressor)

		// this.delay.connect(this.feedback);
		// this.delay.connect(this.compressor);
		this.feedback.connect(this.delay);
		this.compressor.connect(this.synthOut);

		// THEREMIN ROUTE
		this.synthOut.connect(this.analysers.live);
		this.analysers.live.connect(this.masterVolume);

		this.recordingGain.connect(this.analysers.recording);
		this.analysers.recording.connect(this.masterVolume);

		//OUTPUT
		this.masterVolume.connect(this.context.destination);

		//Start oscillators
		this.scuzz.start(0);
		// this.oscillators.forEach((osc: OscillatorNode) => {
		// 	osc.start(0);
		// });
	}

}
export default Synth;
