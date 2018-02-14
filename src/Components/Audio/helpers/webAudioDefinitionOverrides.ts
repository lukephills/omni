/**
 * This extends the AudioNode definition to allow AudioNodes to be connected to custom audio classes
 *
 * This overrides the existing AudioNode interface with two extra methods to connect and disconnect
 * instances of AudioNodeBase. AudioNodeBase classes are the foundation of my custom audio units.
 */

interface AudioNodeBase {
  input: GainNode;
  output: GainNode;
}

interface AudioNode extends EventTarget {
    channelCount: number;
    // channelCountMode: string;
    // channelInterpretation: string;
    readonly context: AudioContext;
    readonly numberOfInputs: number;
    readonly numberOfOutputs: number;
    connect(destination: AudioNode, output?: number, input?: number): void;
    connect(destination: AudioNodeBase, output?: number, input?: number): void;
    disconnect(output?: number): void;
    disconnect(destination: AudioNode, output?: number, input?: number): void;
    disconnect(destination: AudioNodeBase, output?: number, input?: number): void;
    disconnect(destination: AudioParam, output?: number): void;
}

declare var AudioNode: {
    prototype: AudioNode;
    new(): AudioNode;
}

