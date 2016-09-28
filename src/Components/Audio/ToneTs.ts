//extend the connect function to include Tones

(<any>AudioNode).prototype._nativeConnect = AudioNode.prototype.connect;
AudioNode.prototype.connect = function(B: any, outNum, inNum){
	if (B.input){
		this.connect(B.input, outNum, inNum);
	} else {
		try {
			if (B instanceof AudioNode){
				this._nativeConnect(B);
			} else {
				this._nativeConnect(B);
			}
		} catch (e) {
			throw new Error("error connecting to node: "+e);
		}
	}
};

class ToneTs {

	public input: GainNode;
	public output: GainNode;
	public ctx: AudioContext;

	constructor(ctx) {
		this.ctx = ctx;
		this.input = this.ctx.createGain();
		this.output = this.ctx.createGain();
		
	}

	connect(destination) {
		this.output.connect(destination);
	}

	disconnect() {
		this.output.disconnect();
	}
}

export default ToneTs;