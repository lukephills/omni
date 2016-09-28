//TODO: check this
import {notEqual} from 'assert';
const ratio = 1.0594645048603144;
const middleC = 261.6255653006;
const NOTE_STRINGS = [ 'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B' ]

// Gets frequency from degree in 12 tone equal temp
function tET(degree) {
  //TODO: instead of fixed 12 tone ratio, calculate it
  return middleC * Math.pow(ratio, degree);
}

const midiPitchC = 60
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

// Missing note strings to Midi and frequency, but do we really need them?





export const Scales = {
  "Acoustic": {
    "intervals": [0,2,4,6,7,9],
    "temp": 12,
    "description": "The acoustic scale, (also known as the overtone scale) differs from the major scale in having a raised fourth and lowered seventh scale degree. Traditionally, the scale persists in the music of peoples of South Siberia, especially in Tyvan music."
  },
  "Adonai Malakh": {
    "intervals": [0,2,4,5,7,8,10],
    "temp": 12,
    "description": "The Adonai malakh scale is a musical mode used in Jewish music. \"Adonai malakh\" (\"God is King\"), a line from Psalm 93, is set using the Adonai malakh scale at the close of the introduction to the Kabalat Shabat (Friday evening synagogue service)."
  },
  "Aeolian (Natural Minor)": {
    "intervals": [0,2,3,5,7,8,10],
    "temp": 12,
    "description": "The Aeolian mode is also known as the 'natural minor' scale and has the same notes as its relative major scale, but is built starting from the sixth note. On a piano using only white keys, the Aeolian mode would start from A"
  },
  "Algerian": {
    "intervals": [0,2,3,6,7,8,11],
    "temp": 12,
    "description": "The Algerian Scale is a scale which is frequently found in Algerian, Berber, and North African music. The frequent use of 1.5 steps(or whole-and-a-half steps) in the scale helps create a sound which is commonly associated with Moorish music."
  },
  "Altered": {
    "intervals": [0,1,3,4,6,8,10],
    "temp": 12,
    "description": ""
  },
  "Augmented": {
    "intervals": [0,3,4,7,8,11],
    "temp": 12,
    "description": ""
  },
  "Bebop Dominant": {
    "intervals": [0,2,4,5,7,9,10,11],
    "temp": 12,
    "description": ""
  },
  "Blues": {
    "intervals": [0,3,5,6,7,10],
    "temp": 12,
    "description": ""
  },
  "Chromatic": {
    "intervals": [0,1,2,3,4,5,6,7,8,9,10,11],
    "temp": 12,
    "description": ""
  },
  "Dorian": {
    "intervals": [0,2,3,5,7,9,10],
    "temp": 12,
    "description": ""
  },
  "Double Harmonic": {
    "intervals": [0,1,4,5,7,8,11],
    "temp": 12,
    "description": ""
  },
  "Enigmatic": {
    "intervals": [0,1,4,6,8,10,11],
    "temp": 12,
    "description": ""
  },
  "Flamenco": {
    "intervals": [0,1,4,5,7,8,11],
    "temp": 12,
    "description": ""
  },
  "Gypsy": {
    "intervals": [0,2,3,6,7,8,10],
    "temp": 12,
    "description": ""
  },
  "Half Diminished": {
    "intervals": [0,2,3,5,6,8,10],
    "temp": 12,
    "description": ""
  },
  "Harmonic Major": {"intervals": [0,2,4,5,7,8,11],
    "temp": 12,
    "description": ""
  },
  "Harmonic Minor": {
    "intervals": [0,2,3,5,7,8,11],
    "temp": 12,
    "description": ""
  },
  "Hirajoshi": {"intervals": [0,2,3,7,8],
    "temp": 12,
    "description": ""
  },
  "Hungarian Gypsy": {
    "intervals": [0,2,3,6,7,8,11],
    "temp": 12,
    "description": ""
  },
  "Hungarian Minor": {
    "intervals": [0,2,3,6,7,8,11],
    "temp": 12,
    "description": ""
  }, //TODO: check - is same as gypsy
  "Insen": {
    "intervals": [0,1,5,7,10],
    "temp": 12,
    "description": ""
  },
  "Major": {
    "intervals": [0,2,4,5,7,9,11],
    "temp": 12,
    "description": ""
  },
  "Istrian": {
    "intervals": [0,1,3,4,6,7],
    "temp": 12,
    "description": ""
  },
  "Iwato": {
    "intervals": [0,1,5,6,10],
    "temp": 12,
    "description": ""
  },
  "Just Major": {
    "frequencies": [261.6255653006, 294.328760963175, 327.03195662575, 348.8340870674666, 392.4383479509, 436.04260883433335, 490.54793493862496],
    "description": "Major scale using 'just' tuning. The frequencies of notes are related by ratios of small whole numbers. Any interval tuned in this way is called a pure or just interval. Pure intervals are important in music because they naturally tend to be perceived by humans as consonant: pleasing or satisfying. This differs from Equal Temperament where an octave is divided into 12 equal parts."
  },
  "Locrian": {
    "intervals": [0,1,3,5,6,8,10],
    "temp": 12,
    "description": ""
  },
  "Lydian Augmented": {
    "intervals": [0,2,4,6,8,9,11],
    "temp": 12,
    "description": ""
  },
  "Lydian": {
    "intervals": [0,2,4,6,7,9,11],
    "temp": 12,
    "description": ""
  },
  "Major Bepop": {
    "intervals": [0,2,4,5,7,8,9,11],
    "temp": 12,
    "description": ""
  },
  "Major Locrian": {
    "intervals": [0,2,4,5,6,8,10],
    "temp": 12,
    "description": ""
  },
  "Major Pentatonic": {
    "intervals": [0,2,4,7,9],
    "temp": 12,
    "description": ""
  },
  "Melodic Minor": {
    "intervals": [0,2,3,5,7,8,9,10,11],
    "temp": 12,
    "description": ""
  },
  "Melodic Minor Ascending": {
    "intervals": [0,2,3,5,7,9,11],
    "temp": 12,
    "description": ""
  },
  "Minor Pentatonic": {
    "intervals": [0,3,5,7,10],
    "temp": 12,
    "description": ""
  },
  "Minyō": {
    "intervals": [0,2,5,7,9],
    "temp": 12,
    "description": ""
  },
  "Mixolydian": {
    "intervals": [0,2,4,5,7,9,10],
    "temp": 12,
    "description": ""
  },
  "Neapolitan Major": {
    "intervals": [0,1,3,5,7,9,11],
    "temp": 12,
    "description": ""
  },
  "Neapolitan Minor": {
    "intervals": [0,1,3,5,7,8,11],
    "temp": 12,
    "description": ""
  },
  "Octatonic": {
    "intervals": [0,2,3,5,6,8,9,11],
    "temp": 12,
    "description": ""
  },
  "Persian": {
    "intervals": [0,1,4,5,6,8,11],
    "temp": 12,
    "description": ""
  },
  "Phrygian Dominant": {
    "intervals": [0,1,4,5,7,8,10],
    "temp": 12,
    "description": ""
  }, //https://en.wikipedia.org/wiki/Phrygian_dominant_scale
  "Phrygian": {
    "intervals": [0,1,3,5,7,8,10],
    "temp": 12,
    "description": ""
  },
  "Prometheus": {
    "intervals": [0,2,4,6,9,10],
    "temp": 12,
    "description": ""
  },
  "Tritone": {
    "intervals": [0,1,4,6,7,10],
    "temp": 12,
    "description": ""
  },
  "Ukranian Dorian": {
    "intervals": [0,2,3,6,7,9,10],
    "temp": 12,
    "description": ""
  },
  "Whole Tone": {
    "intervals": [0,2,4,6,8,10],
    "temp": 12,
    "description": ""
  },
  "Major Triad": {
    "intervals": [0,4,7],
    "temp": 12,
    "description": "The three notes that make up a major chord include the root note, a major third and a perfect fifth. It is one of the basic building blocks of tonal music, the Western common practice period and Western pop, folk and rock music."
  },
  "Minor Triad": {
    "intervals": [0,3,7],
    "temp": 12,
    "description": "The minor chord, along with the major chord, is one of the basic building blocks of tonal music. In comparison with a major chord, minor has a darker and sadder sound."
  },
}

//12-tone Equal Temp Scales/Modes


//MICROTONAL SCALES
//TODO: Maqam https://en.wikipedia.org/wiki/Arabic_maqam
//TODO: Slendro https://en.wikipedia.org/wiki/Slendro
//TODO: Pelog https://en.wikipedia.org/wiki/Pelog
//TODO: Raga https://en.wikipedia.org/wiki/Raga
//TODO: Gamma https://en.wikipedia.org/wiki/Gamma_scale
//TODO: Alpha https://en.wikipedia.org/wiki/Alpha_scale
//TODO: Beta https://en.wikipedia.org/wiki/Beta_scale
//TODO: Delta https://en.wikipedia.org/wiki/Delta_scale
//TODO: Euler https://en.wikipedia.org/wiki/Euler%E2%80%93Fokker_genus
//TODO: Bohlen-Pierce https://en.wikipedia.org/wiki/Bohlen%E2%80%93Pierce_scale

export const ScaleList = {
  "just": {
    "frequencies": [261.6255653006, 261.6255653006*(9/8), 261.6255653006*(5/4), 261.6255653006*(4/3), 261.6255653006*(3/2), 261.6255653006*(5/3), 261.6255653006*(15/8)],
    "description": "5 out of 19-tET",
  },
  "EqualTemp": {
    "frequencies": [tET(0),
      tET(2),
      tET(4),
      tET(5),
      tET(7),
      tET(9),
      tET(11),
    ],
    "description": "5 out of 19-tET"
  },

  "olympos": {
    "frequencies": [
      261.6255653006,
      279.06726965397,
      348.83408706747,
      372.08969287196,
      465.11211608996
    ],
    "description": "Scale of ancient Greek flutist Olympos, 6th century BC as reported by Partch"
  },
  "badings1": {
    "frequencies": [
      261.6255653006,
      294.32876096318,
      327.03195662575,
      359.73515228832,
      392.4383479509,
      425.14154361347,
      457.84473927605
    ],
    "description": "Henk Badings, harmonic scale, Lydomixolydisch"
  },
  "bolivia": {
    "frequencies": [
      261.6255653006,
      315.83481057014,
      401.62159853282,
      478.71605466184,
      581.25458464818,
      714.36935367713,
      884.07587347381,
      1042.8816384286
    ],
    "description": "Observed scale from pan-pipe from La Paz. 1/1=171 Hz."
  },
  "breed-blues1": {
    "frequencies": [
      261.6255653006,
      296.76515515861,
      326.18384711731,
      336.62443200122,
      394.05926325844,
      433.12283887627,
      446.9863572706
    ],
    "description": "Graham Breed's blues scale in 22-tET"
  },
  "breed-kleismic": {
    "frequencies": [
      261.6255653006,
      272.15636435185,
      314.21163216373,
      326.8590947849,
      377.36736126409,
      392.55693131015,
      453.21723193171
    ],
    "description": "Kleismic temperament, g=317.080, 5-limit"
  },
  "burma3": {
    "frequencies": [
      261.6255653006,
      287.71029735626,
      317.68827763215,
      350.39147881787,
      389.32370520689,
      429.81331927092,
      476.14308821464
    ],
    "description": "Burmese scale, von Hornbostel"
  },
  "burt11": {
    "frequencies": [
      261.6255653006,
      344.24416486921,
      347.6866065179,
      351.12904816659,
      354.57148981529,
      358.01393146398,
      371.78369805875,
      385.55346465352,
      495.71159741166,
      502.59648070905,
      509.48136400643,
      516.36624730382
    ],
    "description": "W. Burt's 19enhharm #11"
  },
  "burt3": {
    "frequencies": [
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
    "description": "W. Burt's 13enhharm #3"
  },
  "burt_primes": {
    "frequencies": [
      261.6255653006,
      267.75741448733,
      273.88926367407,
      277.97716313189,
      280.0211128608,
      284.10901231862,
      290.24086150535,
      298.416660421,
      302.50455987882,
      304.54850960773,
      308.63640906555,
      310.68035879446,
      320.90010743902,
      322.94405716793,
      327.03195662575,
      333.16380581248,
      335.20775554139,
      339.29565499922,
      341.33960472813,
      351.55935337268,
      353.60330310159,
      359.73515228832,
      363.82305174615,
      365.86700147506,
      369.95490093288,
      376.08675011961,
      384.26254903526,
      390.39439822199,
      392.4383479509,
      394.48229767981,
      396.52624740872,
      402.65809659545,
      406.74599605328,
      412.87784524001,
      421.05364415565,
      425.14154361347,
      431.27339280021,
      433.31734252912,
      437.40524198694,
      445.58104090258,
      455.80078954714,
      457.84473927605,
      461.93263873387,
      463.97658846278,
      468.0644879206,
      474.19633710734,
      476.24028683625,
      482.37213602298,
      488.50398520971,
      492.59188466754,
      498.72373385427,
      506.89953276991,
      513.03138195665,
      519.16323114338
    ],
    "description": "Warren Burt, primes until 251. \"Some Numbers\", Dec. 2002"
  },
  "bushmen": {
    "frequencies": [
      261.6255653006,
      347.0163224393,
      394.26624244126,
      453.9405988926
    ],
    "description": "Observed scale of South-African bushmen, almost (4 notes) equal pentatonic"
  },
  "degung1": {
    "frequencies": [
      261.6255653006,
      286.1303811777,
      319.28416942365,
      390.63652710512,
      420.90734643474
    ],
    "description": "Gamelan Degung, Kabupaten Sukabumi. 1/1=363 Hz"
  },
  "degung6": {
    "frequencies": [
      261.6255653006,
      273.29426590363,
      298.47415715355,
      379.54129348313,
      409.02013274169
    ],
    "description": "Gamelan Degung, Kacherbonan Cheribon. 1/1=426 Hz"
  },
  "diablack": {
    "frequencies": [
      261.6255653006,
      279.06726965397,
      294.32876096318,
      313.95067836072,
      331.11985608357,
      372.08969287196,
      392.4383479509,
      418.60090448096,
      441.49314144476,
      470.92601754108
    ],
    "description": "Unique 256/245&2048/2025 Fokker block"
  },
  "diamond_tetr": {
    "frequencies": [
      261.6255653006,
      271.31540105247,
      279.06726965397,
      327.03195662575,
      336.37572681506,
      339.14425131559,
      348.83408706747,
      358.80077526939
    ],
    "description": "Tetrachord Modular Diamond based on Archytas's Enharmonic"
  },
  "diaphonic_5": {
    "frequencies": [
      261.6255653006,
      299.00064605783,
      348.83408706747,
      392.4383479509,
      448.50096908674
    ],
    "description": "D5-tone Diaphonic Cycle"
  },
  "diaphonic_7": {
    "frequencies": [
      261.6255653006,
      285.40970760065,
      313.95067836072,
      348.83408706747,
      380.54627680087,
      418.60090448096,
      465.11211608996
    ],
    "description": "7-tone Diaphonic Cycle, disjunctive form on 4/3 and 3/2"
  },
  "diat15_inv": {
    "frequencies": [
      261.6255653006,
      279.06726965397,
      313.95067836072,
      348.83408706747,
      366.27579142084,
      383.71749577421,
      418.60090448096,
      453.48431318771
    ],
    "description": "Inverted Tonos-15 Harmonia, a harmonic series from 15 from 30."
  },
  "diat_enh": {
    "frequencies": [
      261.6255653006,
      269.29177952703,
      311.12698372208,
      349.22823143301,
      391.99543598175,
      403.48177901006,
      466.16376151809
    ],
    "description": "Diat. + Enharm. Diesis, Dorian Mode"
  },
  "diat_gold": {
    "frequencies": [
      261.6255653006,
      292.38332274669,
      326.75708630452,
      349.99258496952,
      391.13935185123,
      437.1232727958,
      488.51296691354
    ],
    "description": "Diatonic scale with ratio between whole and half tone the Golden Section"
  },
  "diat_hemchrom": {
    "frequencies": [
      261.6255653006,
      273.20871865617,
      311.12698372208,
      349.22823143301,
      391.99543598175,
      409.35055662695,
      466.16376151809
    ],
    "description": "Diat. + Hem. Chrom. Diesis, Another genus of Aristoxenos, Dorian Mode"
  },
  "didy_enh": {
    "frequencies": [
      261.6255653006,
      270.06509966514,
      279.06726965397,
      348.83408706747,
      392.4383479509,
      405.0976494977,
      418.60090448096
    ],
    "description": "Dorian mode of Didymos's Enharmonic"
  },
  "chin_huang": {
    "frequencies": [
      261.6255653006,
      331.11985608357,
      392.4383479509,
      441.49314144476,
      588.65752192635,
      662.23971216714
    ],
    "description": "Huang Zhong qin tuning"
  },
  "chin_lusheng": {
    "frequencies": [
      261.6255653006,
      316.38258506467,
      348.82502010853,
      389.28772571905,
      466.97226207056,
      520.53801357752
    ],
    "description": "Observed tuning of a small Lusheng, 1/1=d, OdC '97"
  },
  "zalzal2": {
    "frequencies": [
      261.6255653006,
      294.32876096318,
      331.11985608357,
      348.83408706747,
      387.59343007496,
      419.89288258121,
      465.11211608996
    ],
    "description": "Zalzal's Scale, a medieval Islamic with Ditone Diatonic & 10/9 x 13/12 x 72/65"
  },
  "xenakis_chrom": {
    "frequencies": [
      261.6255653006,
      274.52698453615,
      329.62755691287,
      349.22823143301,
      391.99543598175,
      411.32572372413,
      493.88330125613
    ],
    "description": "Xenakis's Byzantine Liturgical mode, 5 + 19 + 6 parts"
  },
  "xenakis_diat": {
    "frequencies": [
      261.6255653006,
      293.66476791741,
      326.46944327063,
      349.22823143301,
      391.99543598175,
      440,
      489.15147723638
    ],
    "description": "Xenakis's Byzantine Liturgical mode, 12 + 11 + 7 parts"
  },
  "xenakis_schrom": {
    "frequencies": [
      261.6255653006,
      279.86396690685,
      326.46944327063,
      349.22823143301,
      391.99543598175,
      419.32216217931,
      489.15147723638
    ],
    "description": "Xenakis's Byzantine Liturgical mode, 7 + 16 + 7 parts"
  },
  "mbira_zimb": {
    "frequencies": [
      261.6255653006,
      276.86260193655,
      305.95868600104,
      343.62544191138,
      379.08031027329,
      408.40584780369,
      453.41648894489,
      507.76825077597
    ],
    "description": "Shona mbira scale"
  },
  "sanza": {
    "frequencies": [
      261.6255653006,
      293.15632631094,
      308.97787266236,
      346.21547002486,
      390.18821123181,
      462.40922843744,
      524.46149515038,
      595.18445928535,
      620.10113226249
    ],
    "description": "African N'Gundi Sanza (idiophone; set of lamellas, thumb-plucked)"
  },
  "sanza2": {
    "frequencies": [
      261.6255653006,
      390.63923480058,
      465.35666077712,
      588.68812410589,
      663.45725712889,
      702.9084786129,
      783.08569314515
    ],
    "description": "African Baduma Sanza (idiophone, like mbira)"
  },
  "selisir": {
    "frequencies": [
      261.6255653006,
      278.78833362316,
      320.24370022528,
      380.8360868427,
      417.71053321823,
      524.76452349887
    ],
    "description": "Gamelan semara pagulingan, Bali. Pagan Kelod"
  },
  "turkish": {
    "frequencies": [
      261.6255653006,
      279.06726965397,
      327.03195662575,
      348.83408706747,
      392.4383479509,
      436.04260883433,
      465.11211608996
    ],
    "description": "Turkish, 5-limit from Palmer on a Turkish music record, harmonic minor inverse"
  },
  "tritriad26": {
    "frequencies": [
      261.6255653006,
      294.32876096318,
      301.87565226992,
      348.83408706747,
      392.4383479509,
      402.50086969323,
      452.81347840488
    ],
    "description": "Tritriadic scale of the 26:30:39 triad"
  },
  "tritriad7": {
    "frequencies": [
      261.6255653006,
      264.29521392612,
      323.02748368748,
      332.97799220076,
      336.37572681506,
      411.12588832951,
      428.11456140098
    ],
    "description": "Tritriadic scale of the 7:9:11 triad"
  },
  "tranh3": {
    "frequencies": [
      261.6255653006,
      317.68818643644,
      348.83408706747,
      392.4383479509,
      473.41768959156,
      476.53227965466
    ],
    "description": "Sa Mac Dan Tranh scale"
  },
  "tranh2": {
    "frequencies": [
      261.6255653006,
      290.69507255622,
      307.79478270659,
      392.4383479509,
      436.04260883433
    ],
    "description": "Dan Ca Dan Tranh Scale"
  },
  "tiby1": {
    "frequencies": [
      261.6255653006,
      295.66718139806,
      337.56154978455,
      348.04364484358,
      393.32961502355,
      444.50800708553,
      507.49227916989
    ],
    "description": "Tiby's 1st Byzantine Liturgical genus, 12 + 13 + 3 parts"
  },
  "tetratriad1": {
    "frequencies": [
      261.6255653006,
      290.69507255622,
      294.32876096318,
      327.03195662575,
      348.83408706747,
      392.4383479509,
      436.04260883433,
      441.49314144476,
      490.54793493862
    ],
    "description": "3:5:9 Tetratriadic scale"
  },
  "tartini_7": {
    "frequencies": [
      261.6255653006,
      294.32876096318,
      313.95067836072,
      367.91095120397,
      392.4383479509,
      418.60090448096,
      490.54793493862
    ],
    "description": "Tartini (1754) with 2 neochromatic tetrachords, 1/1=d, Minor Gipsy (Slovakia)"
  },
  "chimes_peck": {
    "frequencies": [
      261.6255653006,
      327.03195662575,
      392.4383479509,
      457.84473927605,
      588.65752192635,
      719.47030457665,
      850.28308722695,
      981.09586987725,
      1046.5022612024
    ],
    "description": "Kris Peck, 9-tone windchime tuning. TL 7-3-2001"
  },
  "chrom_soft3": {
    "frequencies": [
      261.6255653006,
      271.31540105247,
      281.75060878526,
      348.83408706747,
      392.4383479509,
      406.97310157871,
      422.62591317789
    ],
    "description": "Soft chromatic genus is from K. Schlesinger's modified Mixolydian Harmonia"
  },
  "cluster6i": {
    "frequencies": [
      261.6255653006,
      313.95067836072,
      366.27579142084,
      373.75080757229,
      439.53094970501,
      448.50096908674
    ],
    "description": "Six-Tone Triadic Cluster 5:6:7"
  },
  "cons8": {
    "frequencies": [
      261.6255653006,
      348.83408706747,
      392.4383479509,
      436.04260883433
    ],
    "description": "Set of intervals with num + den <= 8 not exceeding 2/1"
  },
  "cons9": {
    "frequencies": [
      261.6255653006,
      327.03195662575,
      348.83408706747,
      392.4383479509,
      436.04260883433
    ],
    "description": "Set of intervals with num + den <= 9 not exceeding 2/1"
  },
  "gunkali": {
    "frequencies": [
      261.6255653006,
      275.93321340298,
      282.55561052465,
      348.83408706747,
      392.4383479509,
      408.78994578219,
      418.60090448096
    ],
    "description": "Indian mode Gunkali, see Daniï¿½lou: Intr. to the Stud. of Mus. Scales, p.175"
  },
  "gumbeng": {
    "frequencies": [
      261.6255653006,
      305.03156112838,
      348.43777142572,
      394.8168394034,
      470.9259392365,
      525.62941881859
    ],
    "description": "Scale of gumbeng ensemble, Java. 1/1=440 Hz."
  },
  "farey3": {
    "frequencies": [
      261.6255653006,
      313.95067836072,
      348.83408706747,
      392.4383479509,
      418.60090448096
    ],
    "description": "Farey fractions between 0 and 1 until 3rd level, normalised by 2/1"
  },
  "finnamore": {
    "frequencies": [
      261.6255653006,
      277.97716313189,
      310.68035879446,
      348.83408706747,
      392.4383479509,
      416.96574469783,
      457.84473927605,
      466.02053819169
    ],
    "description": "David J. Finnamore, Tuning List 9 May '97. Tetrachordal scale, 17/16x19/17x64/57"
  },
  "enh14": {
    "frequencies": [
      261.6255653006,
      267.70988077271,
      274.08392555301,
      348.83408706747,
      392.4383479509,
      401.56482115906,
      411.12588832951
    ],
    "description": "14/11 Enharmonic"
  },
  "euler_enh": {
    "frequencies": [
      261.6255653006,
      267.90457886781,
      275.62199471997,
      348.83408706747,
      392.4383479509,
      401.85686830172,
      413.43299207996
    ],
    "description": "Euler's Old Enharmonic, From Tentamen Novae Theoriae Musicae"
  },
  "exptriad2": {
    "frequencies": [
      261.6255653006,
      306.59245933664,
      327.03195662575,
      367.91095120397,
      392.4383479509,
      459.88868900496,
      490.54793493862
    ],
    "description": "Two times expanded major triad"
  },
  "indian_e": {
    "frequencies": [
      261.6255653006,
      275.58617649731,
      323.21709932123,
      347.81902735497,
      393.58362272115,
      410.77171881178,
      488.21056770985
    ],
    "description": "Observed Indian mode"
  },
  "indian-raja": {
    "frequencies": [
      261.6255653006,
      294.32876096318,
      327.03195662575,
      348.83408706747,
      392.4383479509,
      490.54793493862
    ],
    "description": "A folk scale from Rajasthan, India"
  },
  "iraq": {
    "frequencies": [
      261.6255653006,
      290.3675288125,
      326.6631048533,
      348.83408706747,
      387.1561215731,
      435.55129321875,
      465.11211608996,
      516.20736538157
    ],
    "description": "Iraq 8-tone scale, Ellis"
  },
  "adjeng": {
    "frequencies": [
      261.6255653006,
      285.30470202322,
      305.78200836532,
      383.0422478503,
      417.71053321823
    ],
    "description": "Soeroepan adjeng"
  },
  "aeolic": {
    "frequencies": [
      261.6255653006,
      294.32876096318,
      310.07474405997,
      348.83408706747,
      392.4383479509,
      413.43299207996,
      465.11211608996
    ],
    "description": "Ancient Greek Aeolic, also tritriadic scale of the 54:64:81 triad"
  },
  "augmented": {
    "frequencies": [
      261.6255653006,
      312.71213182188,
      329.62755691287,
      393.99259743989,
      415.30469757995,
      496.39956701727
    ],
    "description": "Augmented temperament, g=91.2, oct=1/3, 5-limit"
  },
  "harm-doreninv1": {
    "frequencies": [
      261.6255653006,
      321.08592105074,
      327.03195662575,
      332.97799220076,
      380.54627680087,
      499.46698830115,
      511.35905945117
    ],
    "description": "1st Inverted Schlesinger's Enharmonic Dorian Harmonia"
  },
  "harm-dorinv1": {
    "frequencies": [
      261.6255653006,
      309.19384990071,
      321.08592105074,
      332.97799220076,
      380.54627680087,
      475.68284600109,
      499.46698830115
    ],
    "description": "1st Inverted Schlesinger's Chromatic Dorian Harmonia"
  },
  "harm11s": {
    "frequencies": [
      261.6255653006,
      65.40639132515,
      95.13656920022,
      104.65022612024,
      116.27802902249,
      130.8127826503,
      149.50032302891,
      174.41704353373,
      196.21917397545,
      209.30045224048,
      261.6255653006,
      327.03195662575,
      348.83408706747,
      392.4383479509,
      457.84473927605,
      588.65752192635,
      654.0639132515,
      719.47030457665,
      1046.5022612024
    ],
    "description": "Harm. 1/4-11/4 and subh. 4/1-4/11. Joseph Pehrson 1999"
  },
  "harm3": {
    "frequencies": [
      261.6255653006,
      327.03195662575,
      392.4383479509,
      457.84473927605
    ],
    "description": "Third octave of the harmonic overtone series"
  },
  "harm6": {
    "frequencies": [
      261.6255653006,
      294.32876096318,
      327.03195662575,
      359.73515228832,
      392.4383479509,
      457.84473927605
    ],
    "description": "Harmonics 6-12"
  },
  "harmd-hypol": {
    "frequencies": [
      261.6255653006,
      287.78812183066,
      313.95067836072,
      340.11323489078,
      366.27579142084,
      392.4383479509,
      418.60090448096,
      470.92601754108
    ],
    "description": "HarmD-Hypolydian"
  },
  "harrison_5": {
    "frequencies": [
      261.6255653006,
      279.06726965397,
      313.95067836072,
      392.4383479509,
      418.60090448096
    ],
    "description": "From Lou Harrison, a pelog style pentatonic"
  },
  "harrison_5_1": {
    "frequencies": [
      261.6255653006,
      285.40970760065,
      313.95067836072,
      392.4383479509,
      418.60090448096
    ],
    "description": "From Lou Harrison, a pelog style pentatonic"
  },
  "harrison_5_4": {
    "frequencies": [
      261.6255653006,
      279.06726965397,
      313.95067836072,
      392.4383479509,
      490.54793493862
    ],
    "description": "From Lou Harrison, a pelog style pentatonic"
  },
  "harrison_joy": {
    "frequencies": [
      261.6255653006,
      294.32876096318,
      327.03195662575,
      392.4383479509,
      436.04260883433,
      490.54793493862
    ],
    "description": "Lou Harrison's Joyous 6"
  },
  "hexany11": {
    "frequencies": [
      261.6255653006,
      294.32876096318,
      305.22982618403,
      343.38355445704,
      392.4383479509,
      457.84473927605
    ],
    "description": "1.3.7.9 Hexany on 1.3" //https://en.wikipedia.org/wiki/Hexany
  },
  "hexany15": {
    "frequencies": [
      261.6255653006,
      327.03195662575,
      348.83408706747,
      392.4383479509,
      418.60090448096
    ],
    "description": "1.3.5.15 2)4 hexany (1.15 tonic) degenerate, symmetrical pentatonic"
  },
  "hexany22": {
    "frequencies": [
      261.6255653006,
      276.76092858245,
      359.73515228832,
      380.54627680087,
      494.63583439645
    ],
    "description": "1.11.121.1331 Hexany, a degenerate pentatonic form"
  },
  "arist_diat": {
    "frequencies": [
      261.6255653006,
      293.66476791741,
      311.12698372208,
      349.22823143301,
      391.99543598175,
      440,
      466.16376151809
    ],
    "description": "Phrygian octave species on E, 12 + 6 + 12 parts"
  },
  "mboko_bow": {
    "frequencies": [
      261.6255653006,
      347.61817721989,
      375.37611551499
    ],
    "description": "African Mboko Mouth Bow (chordophone, single string, plucked)"
  }
}