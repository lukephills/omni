import AudioEffect from './AudioEffect';
// import impulseResponse from '../../assets/teufelsberg01';

class Convolver extends AudioEffect {

  private _convolver = this.context.createConvolver();

  constructor(public ctx: AudioContext, mix = 0.5) {
    super(ctx);

    this.mix = mix;

    // grab audio track via XHR for convolver node

    const ajaxRequest = new XMLHttpRequest();
    // ajaxRequest.open('GET', './assets/teufelsberg01.mp3', true);
    ajaxRequest.open('GET', 'https://femurdesign.com/omni/assets/teufelsberg01.mp3', true);
    ajaxRequest.responseType = 'arraybuffer';

    ajaxRequest.onload = () => {
      console.log("on load")
      this.context.decodeAudioData(ajaxRequest.response, (buffer) => {
        console.log("loaded")
          this._convolver.buffer = buffer;
        }, (err: DOMException) => {
          console.log("Error with decoding audio data " + err)
        }
      );
    }
    ajaxRequest.send();

    this.fxIn.connect(this._convolver)
    this._convolver.connect(this.fxOut);

    this.fxOut.gain.value = 0.3;
  }

}

export default Convolver;