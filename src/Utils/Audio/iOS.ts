import {createEmptyBuffer} from './buffers';

/**
 * Pass this function an audio context to check to see if it is unlocked
 * An isUnlocked boolean is passed as a parameter of the callback function
 */
export function isIOSAudioUnlocked(context: AudioContext, cb): void {
	// create empty buffer and play it
	const source = createEmptyBuffer(context);
	// by checking the play state after some time, we know if we're really unlocked
	setTimeout(() => {
		cb(((<any>source).playbackState === (<any>source).PLAYING_STATE ||
		(<any>source).playbackState === (<any>source).FINISHED_STATE));
	}, 1);
}


/**
 * IOS safe audio context
 * Sometimes IOS changes the sample rate to 48000 and everything sounds distorted
 * https://github.com/Jam3/ios-safe-audio-context
 * http://stackoverflow.com/questions/17892345/webkit-audio-distorts-on-ios-6-iphone-5-first-time-after-power-cycling/34501159#34501159
 * @returns {AudioContext}
 * @constructor
 */
export function createIOSSafeAudioContext(desiredSampleRate = 44100): AudioContext {
	const AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;
	let context = new AudioContext();

	// Check if hack is necessary. Only occurs in iOS6+ devices
	// and only when you first boot the iPhone, or play a audio/video
	// with a different sample rate
	if (/(iPhone|iPad)/i.test(navigator.userAgent) &&
		context.sampleRate !== desiredSampleRate) {
		var buffer = context.createBuffer(1, 1, desiredSampleRate);
		var dummy = context.createBufferSource();
		dummy.buffer = buffer;
		dummy.connect(context.destination);
		dummy.start(0);
		dummy.disconnect();
		context.close(); // dispose old context
		context = new AudioContext();
	}
	return context
}
