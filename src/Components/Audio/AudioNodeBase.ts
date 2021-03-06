import './helpers/webAudioDefinitionOverrides';

// TODO: make sure
// extend the connect function to include custom AudioNodes (instances of AudioNodeBase)
(<any>AudioNode).prototype._nativeConnect = AudioNode.prototype.connect;
(<any>AudioNode).prototype.connect = function(B: any, outNum: number, inNum: number) {
	if (B.input) {
		this.connect(B.input, outNum, inNum);
	} else {
		try {
			if (B instanceof AudioNode){
				this._nativeConnect(B, outNum, inNum);
			} else {
				this._nativeConnect(B, outNum);
			}
		} catch (e) {
			throw new Error("error connecting to node: "+e);
		}
	}
};

type audioNode = AudioNodeBase | AudioNode | AudioParam


abstract class AudioNodeBase {

	public input: GainNode;
	public output: GainNode;

	constructor(public ctx: AudioContext) {
    this.input = this.ctx.createGain();
    this.output = this.ctx.createGain();
	}

	connect(destination: AudioNode | AudioNodeBase, output?: number, input?: number) {
    this.output.connect.apply(this.output, arguments)
  }

  disconnect(destination?: AudioNode | number | AudioParam | AudioNodeBase, output?: number, input?: number) {
    this.output.disconnect.apply(this.output, arguments)
  }

  get volume() {
    return this.output.gain.value;
  }

  set volume(level: number) {
    this.output.gain.value = level;
  }

}

export default AudioNodeBase;