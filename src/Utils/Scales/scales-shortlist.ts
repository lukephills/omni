import {getFrequencyTET} from '../Audio/scales';

const NOTE_STRINGS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

// const midiPitchC = 60

//TODO: all the conversion functions needed http://www.flutopedia.com/pitch_to_frequency.htm

/**
 * Convert a MIDI pitch to the frequency. Can also pass an optional base tuning which is 440 by default
 * @param midi
 * @param tuning - Optional, default is 440
 * @returns {number}
 */
export function midiToFreq(midi: number, tuning = 440): number {
  return Math.pow(2, (midi - 69) / 12) * tuning;
}

export function freqToNote(freq: number, tuning = 440): string {
  return midiToNote(freqToMidi(freq, tuning));
}

export function freqToMidi(freq: number, tuning = 440): number {
  return Math.round(69 + (12 * ((Math.log(freq) - Math.log(tuning)) / Math.log(2))));
}

export function midiToNote(midi: number): string {
  return NOTE_STRINGS[midi % 12] + (Math.floor(midi / 12) - 1);
}

export interface IScale {
  name: string;
  intervals?: number[];
  frequencies?: number[];
  description: string;
}

const _scales: IScale[] = [
  {
    name: 'Aeolian',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    description: `The Aeolian mode is also known as the 'natural minor' scale and has the same notes as its relative major scale, but is built starting from the sixth note. On a piano using only white keys, the Aeolian mode would start from A.`
  },
  {
    name: 'Algerian',
    intervals: [0, 2, 3, 6, 7, 8, 11],
    description: 'The Algerian Scale is a scale which is frequently found in Algerian, Berber, and North African music. The frequent use of 1.5 steps(or whole-and-a-half steps) in the scale helps create a sound which is commonly associated with Moorish music.'
  },
  {
    name: 'Altered',
    intervals: [0, 1, 3, 4, 6, 8, 10],
    description: 'In jazz, the altered scale is a seven-note scale that is a dominant scale where all non-essential tones have been altered. This means that it comprises the three essential tones that define a dominant seventh chord, which are root, major third, and minor seventh and that all other chord tones have been altered.'
  },
  {
    name: 'Augmented',
    intervals: [0, 3, 4, 7, 8, 11],
    description: 'Also known in jazz theory as the symmetrical augmented scale. It can be thought of as an interlocking combination of two augmented triads a minor third apart: C E G# and Eb G B.'
  },
  {
    name: 'Bayātī',
    intervals: [0, 1, 4, 5, 7, 8, 10],
    description: 'Also know as the Phrygian dominant or Freygish scale, this is most commonly found in Arabic and Egyptian music in which it is used in Hebrew prayers and Klezmer music.' //https://en.wikipedia.org/wiki/Phrygian_dominant_scale
  },

  {
    name: 'Blues',
    intervals: [0, 3, 5, 6, 7, 10],
    description: 'The blues scale comprises the notes of a minor pentatonic with the flat 5, also known as the "blue" note. In jazz, the blues scale is used by improvising musicians.',
  },
  {
    name: 'Bolivia',
    frequencies: [
      261.6255653006,
      315.83481057014,
      401.62159853282,
      478.71605466184,
      581.25458464818,
      714.36935367713,
      884.07587347381,
      1042.8816384286
    ],
    description: 'An observed pan-pipe scale from the La Paz, Bolivia.'
  },
  {
    name: 'Burma',
    frequencies: [
      261.6255653006,
      287.71029735626,
      317.68827763215,
      350.39147881787,
      389.32370520689,
      429.81331927092,
      476.14308821464
    ],
    description: 'An observed Burmese gamelan scale',
  },
  {
    name: 'Burt', //burt3
    frequencies: [
      261.6255653006,
      281.75060878526,
      332.06321749692,
      382.37582620857,
      387.40708707973,
      392.4383479509,
      397.46960882207,
      402.50086969323,
      503.12608711654,
      508.1573479877,
      513.18860885887,
      518.21986973003
    ],
    description: `Warren Burt's 13 enharmonic #3, February 19, 1996. Burt is a composer and theorist known for using new tunings and
interesting algorithms in his music.`
  },
  {
    name: 'Bushmen',
    frequencies: [
      261.6255653006,
      347.0163224393,
      394.26624244126,
      453.9405988926
    ],
    description: 'Observed scale of South-African San people, almost (4 notes) equal pentatonic',
  },
  {
    name: 'Cons9',
    frequencies: [
      261.6255653006,
      327.03195662575,
      348.83408706747,
      392.4383479509,
      436.04260883433
    ],
    description: 'A set of Just Innotation ratios, where the numerator + denominator is less than 10. 5/4 (E), 4/3 (F), 3/2 (G), 5/3 (A), 2/1 (C)'
  },
  {
    name: 'Đàn Tranh',
    frequencies: [
      261.6255653006,
      317.68818643644,
      348.83408706747,
      392.4383479509,
      473.41768959156,
      476.53227965466
    ],
    description: 'An observed tuning from a vietnamese plucked zither, the đàn tranh.'
  },
  {
    name: 'Diat Enh',
    frequencies: [
      261.6255653006,
      269.29177952703,
      311.12698372208,
      349.22823143301,
      391.99543598175,
      403.48177901006,
      466.16376151809
    ],
    description: `Taken from 'The Mathematical Theory of Tone Systems' by Jan Haluska, this is an enharmonic double tetrachord, which has notes similar to the Phyrigian mode.`
  },
  {
    name: 'Dorian',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    description: 'The Dorian mode is a symmetric scale corresponding to the white keys of the piano from D to D.',
  },
  {
    name: 'Farey',
    frequencies: [
      261.6255653006,
      313.95067836072,
      348.83408706747,
      392.4383479509,
      418.60090448096
    ],
    description: 'Created from the Farey sequence, a mathematical construct' //(fractions between 0 and 1 until 3rd level, normalised by 2/1'
  },
  {
    name: 'Gamelan',
    frequencies: [
      261.6255653006,
      286.1303811777,
      319.28416942365,
      390.63652710512,
      420.90734643474
    ],
    description: 'Gamelan Degung is a Sundanese musical ensemble that uses a subset of modified gamelan instruments with a particular mode of pelog scale.'
  },
  {
    name: 'Gumbeng',
    frequencies: [
      261.6255653006,
      305.03156112838,
      348.43777142572,
      394.8168394034,
      470.9259392365,
      525.62941881859
    ],
    description: `An observed tuning of a Javanese Gumbeng ensemble. A Gumbeng is a bamboo tube zither with three "strings" carved from the skin of the bamboo cylinder.`
  },
  {
    name: 'Gunkali',
    frequencies: [
      261.6255653006,
      275.93321340298,
      282.55561052465,
      348.83408706747,
      392.4383479509,
      408.78994578219,
      418.60090448096
    ],
    description: 'A traditional Indian Raag. Among morning Raags, Gunkali essentially embodies Bhakti (emotional devotionalism) and Karuna (mercy, compassion).'
  },
  {
    name: 'Harmonic Minor',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    description: 'The harmonic minor scale is one of three minor scales. The sound of the harmonic scale is characterized by the music of the Middle East.'
  },
  {
    name: 'Harmonics',
    frequencies: [
      261.6255653006,
      327.03195662575,
      392.4383479509,
      457.84473927605
    ],
    description: 'Third octave of the harmonic overtone series',
  },
  {
    name: 'Hexany',
    frequencies: [
      261.6255653006,
      327.03195662575,
      348.83408706747,
      392.4383479509,
      418.60090448096
    ],
    description: 'A six-note just intonation structure, with the notes placed on the vertices of an octahedron. The notes are arranged so that every edge of the octahedron joins together notes that make a consonant dyad, and every face joins together the notes of a consonant triad. This makes a "musical geometry". (Erv Wilson)',
  },
  {
    name: 'Hirajōshi',
    intervals: [0, 2, 3, 7, 8],
    description: 'Containing 5 notes from the minor scale, Hirajōshi was adapted from shamisen music for the koto, a japanese stringed instrument'
  },
  {
    name: 'Hungarian', //or hungarian minor
    intervals: [0, 2, 3, 6, 7, 8, 11],
    description: 'Hungarian gypsy scale is found by sharpening the 4th degree of the harmonic minor scale to introduce an additional gap. This is a symmetrical scale that is very common in Flamenco but also Carnatic music associated with Southern India'
  },
  {
    name: 'Insen',
    intervals: [0, 1, 5, 7, 10],
    description: 'A pentatonic scale adapted from shamisen music by Yatsuhashi Kengyō for the koto, a japanese stringed instrument'
  },
  {
    name: 'Irak',
    frequencies: [
      261.6255653006,
      290.3675288125,
      326.6631048533,
      348.83408706747,
      387.1561215731,
      435.55129321875,
      465.11211608996,
      516.20736538157
    ],
    description: 'An 8-tone scale derived from Arabic and Persian music. Similar to a Rast scale but with the extra double flat root note. (Alexander John Ellis)'
  },
  {
    name: 'Iwato',
    intervals: [0, 1, 5, 6, 10],
    description: 'Used in traditional Japanese music for the koto. It is a mode of the Hirajōshi scale.'
  },
  {
    name: 'Just',
    frequencies: [261.6255653006, 294.328760963175, 327.03195662575, 348.8340870674666, 392.4383479509, 436.04260883433335, 490.54793493862496],
    description: `Major scale using 'just' tuning. The frequencies of notes are related by ratios of small whole numbers. Any interval tuned in this way is called a pure or just interval. Pure intervals are important in music because they naturally tend to be perceived by humans as consonant: pleasing or satisfying. This differs from Equal Temperament where an octave is divided into 12 equal parts.`
  },
  {
    name: 'Korsakovian',
    intervals: [0, 2, 3, 5, 6, 8, 9, 11],
    description: 'In St. Petersburg at the turn of the 20th century, this scale had become so familiar in the circle of composers around Nikolai Rimsky-Korsakov that it was referred to as the Korsakovian scale. This is also known as an Octatonic because unlike most other seven-note scales this contains eight.'
  },
  {
    name: 'Lusheng',
    frequencies: [
      261.6255653006,
      316.38258506467,
      348.82502010853,
      389.28772571905,
      466.97226207056,
      520.53801357752
    ],
    description: `Chinese observed tuning of a small Lusheng. The lusheng is a Miao musical instrument with multiple bamboo pipes, each fitted with a free reed, which are fitted into a long blowing tube made of hardwood.`
  },
  {
    name: 'Lydian',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    description: 'Similar to the major scale except the fourth note is raised half a step.'
  },

  {
    name: 'Major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    description: 'The major scale (or Ionian scale) is one of the most commonly used musical scales, especially in Western music.'
  },
  {
    name: `Mbira`,
    frequencies: [
      261.6255653006,
      293.15632631094,
      308.97787266236,
      346.21547002486,
      390.18821123181,
      462.40922843744,
      524.46149515038,
      // 595.18445928535,
      // 620.10113226249
    ],
    description: `A tuning from an African N'Gundi Mbira instrument (thumb piano).`
  },
  {
    name: 'Microtonal Mixolydian',
    frequencies: [
      261.6255653006,
      294.32876096318,
      327.03195662575,
      359.73515228832,
      392.4383479509,
      425.14154361347,
      457.84473927605
    ],
    description: 'A microtonal version of a mixolydian mode using harmonic tones. (Henk Badings)',
  },
  {
    name: 'Minor Pentatonic',
    intervals: [0, 3, 5, 7, 10],
    description: 'Like the major pentatonic, this is scale dates back to ancient times. Today, it’s as ubiquitous as ever as it offers a fantastic improvisational framework for jazz, blues and rock.'
  },
  {
    name: 'Minyō',
    intervals: [0, 2, 5, 7, 9],
    description: 'A pentatonic scale containing only major notes and is used in traditional Japanese folk music.'
  },
  {
    name: 'Olympos',
    frequencies: [
      261.6255653006,
      279.06726965397,
      348.83408706747,
      372.08969287196,
      465.11211608996
    ],
    description: 'Scale of an ancient Greek flutist Olympos, 6th century BC as reported by music theorist, Harry Partch.'
  },
  {
    name: 'Pentatonic',
    intervals: [0, 2, 4, 7, 9],
    description: "This scale, found in virtually every culture in the world, is the major pentatonic, or five-note scale. Though it’s commonly used in modern music, it's thought to be one of the oldest. Bone flutes dated to around 50,000 years old were found tuned to the major pentatonic."
  },
  {
    name: 'Persian',
    intervals: [0, 1, 4, 5, 6, 8, 11],
    description: 'Traditionally found in Iranian music.'
  },
  {
    name: 'Raja',
    frequencies: [
      261.6255653006,
      275.58617649731,
      323.21709932123,
      347.81902735497,
      393.58362272115,
      410.77171881178,
      488.21056770985
    ],
    description: 'An observed tuning from an Indian Raga performed for the monarchy.'
  },
  {
    name: 'Romanian',
    intervals: [0, 2, 3, 6, 7, 9, 10],
    description: 'Romanian minor or Ukranian Dorian scale.'
  },
  {
    name: 'Sanza',
    frequencies: [
      261.6255653006,
      390.63923480058,
      465.35666077712,
      588.68812410589,
      663.45725712889,
      702.9084786129,
      783.08569314515
    ],
    description: 'A tuning taken from an African Baduma Sanza instrument (similar to an Mbira).'
  },
  {
    name: 'Triad Major',
    intervals: [0, 4, 7],
    description: 'The three notes that make up a major chord include the root note, a major third and a perfect fifth. It is one of the basic building blocks of tonal music.'
  },
  {
    name: 'Triad Minor',
    intervals: [0, 3, 7],
    description: 'The minor chord, along with the major chord, is one of the basic building blocks of tonal music. In comparison with a major chord, minor has a darker and sadder sound.'
  },
  {
    name: 'Tuvan',
    intervals: [0, 2, 4, 6, 7, 9],
    description: `Also known as the 'Acoustic' or 'Overtone' scale, differs from the major scale in having a raised fourth and lowered seventh. Traditionally, the scale persists in the music of peoples of South Siberia, especially in Tuvan music.`
  },
  {
    name: 'Whole Tone',
    intervals: [0, 2, 4, 6, 8, 10],
    description: 'A scale consisting entirely of intervals of a tone, with no semitones. Because of this no single tone stands out and the scale creates a blurred, indistinct effect.',
  },
  {
    name: 'Xenakis',
    frequencies: [
      261.6255653006,
      274.52698453615,
      329.62755691287,
      349.22823143301,
      391.99543598175,
      411.32572372413,
      493.88330125613
    ],
    description: `A Byzantine Liturgical mode created by Greek-French composer and music theorist Iannis Xenakis.`
  },
]

function convertIntervalsToFrequencies(scales: IScale[]): IScale[] {
  const convertedScales = scales;
  for (let scale in scales) {
    const intervals = scales[scale].intervals;
    if (intervals) {
      convertedScales[scale].frequencies = intervals.map(s => getFrequencyTET(s));
    }
  }
  return convertedScales;
}

export const scales = convertIntervalsToFrequencies(_scales);