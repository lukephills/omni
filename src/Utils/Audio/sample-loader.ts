export function loadSample(url: string, context: AudioContext, callback: (buffer: AudioBuffer) => any) {
	const request = new XMLHttpRequest();
	request.open('get', url, true);
	request.responseType = 'arraybuffer';
	request.onload = function() {
		context.decodeAudioData(request.response, function(buffer) {
			callback(buffer);
		});
	};
	request.send();
};