import {
	uniq,
	getIteration,
	getIndexFromArray,
} from '../array';

//--------------//
///   SCALES   ///
//--------------//

export type Scale = number[];

/**
 * Takes a Scale and a root frequency and returns an updated scale beginning at the root
 * @param scale: Scale
 * @param root: number
 * @returns {Scale}
 */
export function scaleFromRoot(scale: Scale, root: number): Scale {
	const multi: number = root/scale[0];
	let newScale: Scale = [];
	for (let i = 0, len = scale.length; i < len; i++) {
		// for each frequency times by multiplier and round to 4 decimal places
		newScale[i] = +(scale[i] * multi).toFixed(4);
	}
	return newScale;
}


/**
 * Takes a Scale and an array of root frequencies and returns a singular Scale with frequencies from scales combined and ordered lowest to highest
 * @param scale
 * @param root
 * @returns {any}
 */
export function scaleFromRoots(scale: Scale, roots: number[]): Scale {
	const newScales: Scale[] = [];
	for (let i = 0, l = roots.length; i < l; i++) {
		newScales[i] = scaleFromRoot(scale, roots[i]);
	}
	return combineScales(newScales);
}


/**
 * Takes an array of Scales and combines and orders them lowest to highest removing duplicates
 * @param array
 */
export function combineScales(array: Scale[]): Scale {
	return uniq([].concat(...array).sort((a, b) => a - b));
}


/**
 * gets the frequency from the scale and note position
 * @param scale
 * @param noteIndex - 0 would be the 1st note in the scale, 11 would be the 12th note in the scale.
 * @returns {number}
 */
export function getFrequencyFromNoteIndexInScale(noteIndex: number, scale: Scale): number {
	let note = scale[getIndexFromArray(noteIndex,  scale)];
	let octave = getIteration(noteIndex, scale.length) - 2;
	return getFrequencyFromRootAndOctave(note, octave);
}



export const equalTempRatio12 = 1.0594645048603144;
export const middleC = 261.6255653006;

/**
 * Gets the frequency from degree
 */
export function getFrequency(root: number, degree: number, ratio: number = equalTempRatio12): number {
  return root * Math.pow(ratio, degree);
}

/**
 * Gets the degree from frequency root and ratio
 * Default ratio is 12TET
 */
export function getDegree(frequency: number, root: number, ratio: number  = equalTempRatio12): number {
  return Math.log(frequency / root) / Math.log(ratio);
}

/**
 * Uses a modulo to always return a number between 0 & 12 for pitch constellation
 */
export function getDegreeWithin12(frequency: number, root: number = middleC): number {
  return getDegree(frequency, root) % 12;
}

/**
 * Gets frequency from degree within 12 tone temperament
 * Default root is middle C
 */
export function getFrequencyTET(degree: number, root: number = middleC): number {
  return getFrequency(root, degree, equalTempRatio12)
}

/**
 * returns frequency using the root frequency and octave number
 * @param root
 * @param octave
 * @returns {number}
 */
export function getFrequencyFromRootAndOctave(root: number, octave: number): number {
  return getFrequency(root, octave, 2);
}

function extendScaleLength(scale, numberOfNotes){

}


/**
 * get overtone harmonic frequencies
 * @param freq {number} main frequency
 * @param amount {number} amount of harmonic frequencies to return
 * @returns {number[]}
 */
export function getOvertones(freq: number, amount: number): number[] {
	let harmonics = [];
	for (let i = 0; i<amount; i++) {
		harmonics[i] = freq*(i+2);
	}
	return harmonics;
}

/**
 * get undertone subharmonic frequencies
 * @param freq {number} main frequency
 * @param amount {number} amount of harmonic frequencies to return
 * @returns {Array}
 */
export function getUndertones(freq: number, amount: number): number[] {
	let subharmonics = [];
	for (let i = 0; i<amount; i++) {
		subharmonics[i] = freq/(i+2);
	}
	return subharmonics;
}

function getRatio(note1, note2) {
	return note1/note2;
}

/**
 * Checks if scale has a perfect fifth to within 1.01 accuracy.
 * Returns the index position in the scale array or -1 if no match
 * @param scale
 * @returns {number|boolean}
 */
export function getPerfectFifthIndex(scale: Scale, accuracy: number = 1.01): number {
	return getNoteIndexWithRatio(scale, justInnotationRatios[7], accuracy);
}

/**
 * Checks if scale has a perfect fourth to within 1.01 accuracy.
 * Returns the index position in the scale array or -1 if no match
 * @param scale
 * @returns {number|boolean}
 */
export function getPerfectFourthIndex(scale: Scale, accuracy: number = 1.01): number {
	return getNoteIndexWithRatio(scale, justInnotationRatios[5], accuracy);
}

/**
 * Checks if scale has a frequency using the ratio given within an accuracy
 * Returns the index position in the scale array or -1 if no match
 * @param scale
 * @param ratio
 * @param accuracy = 1.01
 * @returns {any}
 */
export function getNoteIndexWithRatio(scale: Scale, ratio: number, accuracy: number = 1.01): number {
	let targetFreq = scale[0]*ratio;
	let diff = scale[0] - (scale[0]/accuracy);
	for (let i = 1, len = scale.length; i < len; i++) {
		if (isNumberCloseBy(scale[i], targetFreq, diff)) {
			return i;
		}
	}
	return -1;
}

/**
 * Takes two numbers and checks whether they are within a given range of each other
 * @param num
 * @param num2
 * @param maxDist
 * @returns {boolean}
 */
export function isNumberCloseBy(num: number, num2: number, maxDist: number): boolean {
	return ((num + maxDist) > num2) && ((num - maxDist) <= num2);
}


export const justInnotationRatios = [1, 25/24, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 9/5, 15/8];

function convertScaleToJustInnotation(scale) {
	for (var i = 1; i < scale.length; i++) {
		var ratio = getRatio(scale[i], scale[i-1]);
		// if (ratio)
	}
}
