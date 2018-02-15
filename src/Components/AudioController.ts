import PluckedSynth from './Audio/PluckedSynth'
import {createIOSSafeAudioContext} from '../Utils/Audio/iOS';
import BassSynth from './Bass';
import CrappyDistortion from './Audio/CrappyDistortion';
import FeedbackDelay from './Audio/FeedbackDelay';
import Convolver from './Audio/Convolver';
import Looper from './../Utils/Looper/Looper';
import {getFrequencyFromNoteIndexInScale, Scale} from './../Utils/Audio/scales';
import {Omni} from '../index';

interface IAnalysers {
	live: AnalyserNode;
	recording: AnalyserNode;
}

class AudioController {

  scale: Scale;
  rootNoteIdx = 0;
  octaveOffset = 0

  // Sources
  harp: PluckedSynth
  bass: BassSynth;

  // Effects
	compressor: DynamicsCompressorNode;
	delay: FeedbackDelay;
  distortion: CrappyDistortion;
  convolver: Convolver;

  // Recording
  recording: AudioBufferSourceNode;
	looper: Looper;

  // Gains
  recordingGain: GainNode
  masterVolume: GainNode;
	synthOut: GainNode;

  // Analysers
	analysers: IAnalysers;

  constructor(public context = createIOSSafeAudioContext(44100)) {

    // Harp synth
    this.harp = new PluckedSynth(this.context);
    this.harp.attack = 0.005
    this.harp.release = 3

    // Bass synth
    this.bass = new BassSynth(this.context);

    // Effects
		this.compressor = this.context.createDynamicsCompressor();
    this.distortion = new CrappyDistortion(this.context, 20, 'none');
    this.distortion.mix = 0;

		this.delay = new FeedbackDelay(this.context, 0.1, 0.6, 0.5);
		this.convolver = new Convolver(this.context, 0.25);

    //Gains
    this.recordingGain = this.context.createGain();
		this.masterVolume = this.context.createGain();
		this.synthOut = this.context.createGain();


    this.looper = new Looper(this.synthOut, this.recordingGain);


		this.scale = [261.6255653006, 274.52698453615, 329.62755691287, 349.22823143301, 391.99543598175, 411.32572372413, 493.88330125613];

    // Analysers
		this.analysers = {
			live: this.context.createAnalyser(),
			recording: this.context.createAnalyser(),
		}

    this.routeSounds();
  }

  private routeSounds(): void {

		this.masterVolume.gain.value = 0.5;

    this.harp.connect(this.distortion)
    this.bass.connect(this.synthOut)


    this.distortion.connect(this.delay)
    this.delay.connect(this.convolver)
    this.convolver.connect(this.compressor)

		this.compressor.connect(this.synthOut);


		this.synthOut.connect(this.analysers.live);
		this.analysers.live.connect(this.masterVolume);

		this.recordingGain.connect(this.analysers.recording);
		this.analysers.recording.connect(this.masterVolume);

		this.masterVolume.connect(this.context.destination);

	}

  harpNoteOn(noteIndex: number, volume: number = 1, index: number, octaveOffset = this.octaveOffset) {
    const frequency = getFrequencyFromNoteIndexInScale(noteIndex, this.scale, octaveOffset);
    this.harp.NoteOn(frequency, volume, index)
  }

  harpNoteOff(index: number) {
    this.harp.NoteOff(index)
  }

  bassNoteOn(key: number) {
    const frequency = getFrequencyFromNoteIndexInScale(key, <number[]>Omni.state.scale.frequencies, -1);
    this.bass.noteOn(frequency, key)
  }

  bassNoteOff(key: number) {
    this.bass.noteOff(key)
  }

  bassNotesOff() {
    this.bass.purge()
  }


  onRecordPress() {
		this.looper.recordBtnPressed();
	}

	onPlaybackPress() {
		this.looper.playBtnPressed();
	}

	StopPlayback(): void {
		this.recording.stop(0);
	}

	Download(cb: Function): void {
		this.looper.exportWav((recording: Blob) => {
			//TODO: create a promise?
			setTimeout(cb(recording),0);
		});
	}

  private setupAnalysers(): void {
		if (this.analysers) {
			for (const analyser in this.analysers) {
				// this.analysers[analyser].maxDecibels = DEFAULTS.Analyser.maxDecibels;
				// this.analysers[analyser].minDecibels = DEFAULTS.Analyser.minDecibels;
				// this.analysers[analyser].smoothingTimeConstant = DEFAULTS.Analyser.smoothingTimeConstant;
			}
		}
	}

}

export default AudioController;