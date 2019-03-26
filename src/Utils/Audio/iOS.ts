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


var isWebAudioUnlocked = false;
var isHTMLAudioUnlocked = false;

export function unlock(myContext: AudioContext) {
    if (isWebAudioUnlocked  && isHTMLAudioUnlocked) return;

    // Unlock WebAudio - create short silent buffer and play it
    // This will allow us to play web audio at any time in the app
    var buffer = myContext.createBuffer(1, 1, 22050); // 1/10th of a second of silence
    var source = myContext.createBufferSource();
    source.buffer = buffer;
    source.connect(myContext.destination);
    source.onended = function()
    {
        console.log("WebAudio unlocked!");
        isWebAudioUnlocked = true;
        if (isWebAudioUnlocked && isHTMLAudioUnlocked)
        {
            console.log("WebAudio unlocked and playable w/ mute toggled on!");
            window.removeEventListener("mousedown", () => unlock(myContext));
            window.removeEventListener("touchstart", () => unlock(myContext));

        }
    };
    source.start();

    // Unlock HTML5 Audio - load a data url of short silence and play it
    // This will allow us to play web audio when the mute toggle is on
    var silenceDataURL:string = "data:audio/mp3;base64,//MkxAAHiAICWABElBeKPL/RANb2w+yiT1g/gTok//lP/W/l3h8QO/OCdCqCW2Cw//MkxAQHkAIWUAhEmAQXWUOFW2dxPu//9mr60ElY5sseQ+xxesmHKtZr7bsqqX2L//MkxAgFwAYiQAhEAC2hq22d3///9FTV6tA36JdgBJoOGgc+7qvqej5Zu7/7uI9l//MkxBQHAAYi8AhEAO193vt9KGOq+6qcT7hhfN5FTInmwk8RkqKImTM55pRQHQSq//MkxBsGkgoIAABHhTACIJLf99nVI///yuW1uBqWfEu7CgNPWGpUadBmZ////4sL//MkxCMHMAH9iABEmAsKioqKigsLCwtVTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVV//MkxCkECAUYCAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    var tag:HTMLAudioElement = document.createElement("audio");
    tag.controls = false;
    tag.preload = "auto";
    tag.loop = false;
    tag.src = silenceDataURL;
    tag.onended = function()
    {
        console.log("HTMLAudio unlocked!");
        isHTMLAudioUnlocked = true;
        if (isWebAudioUnlocked && isHTMLAudioUnlocked)
        {
            console.log("WebAudio unlocked and playable w/ mute toggled on!");
            window.removeEventListener("mousedown", () => unlock(myContext));
            window.removeEventListener("touchstart", () => unlock(myContext));
        }
    };
    var p = tag.play();
    if (p) p.then(function(){console.log("play success")}, function(reason){console.log("play failed", reason)});
}
