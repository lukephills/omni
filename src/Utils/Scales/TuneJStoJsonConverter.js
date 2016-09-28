const fs = require('fs');

function readWriteAsync() {
  fs.readFile('./app/Utils/Scales/scales.ts', 'utf-8', function(err, data){
    if (err) throw err;

    //TODO
    // import ScaleList
    // for each object in scale list
    // get name
    // get frequencies
    // get description


    //REFORMAT to JSON
    // create an array
    // for each object in scale list
    // var name = name
    // var frequencies = frequencies
    // var description = description
    // var tags = []

    // Remove the duplicate octave note
    var newValue = data.replace(/, 523.2511306012/g, '');

    var middleC = 261.6255653006;
    // if first frequency is 261.6255653006
    // remove 523.2511306012 as it's the octave above (first note doubled)

    function removeOctaveAbove(scale) {
      if (scale[0] === (scale[scale.length-1] / 2)) {
        scale.pop();
      }
      return scale;
    }

    // else first freq is not 261.6255653006  (example 79-159)
    // translate entire scale to start on 261.6255653006
    // convert this scales frequencies to start on middle C
    function convertScaleToStartFromFrequency(scale, freq){
      var ratio = freq / scale[0]
      for (var i = 0; i<scale.length; i++) {
        scale[i] *= ratio;
      }
      return scale;
    }


    // add tags
    // heptatonic has 7 notes

    // hexatonic has 6 notes

    // pentatonic has 5 notes

    // octatonic has 8 notes

    // diatonic uses whole-tone/semitone intervals (check intervals)

    // chromatic has 12 notes

    // enharmonic/ microtonal - can uses intervals smaller than semitone.. uses dieses (divisions) nonexistent on most keyboards

    // equal temperament - dividing the octave into a number equal steps - test differences between all frequencies
    //12-tET or 12-ET means 12-tone equal temperament
    //72-tET or 72-ET means 72-tone equal temperament

    // whole-tone - divided into equal whole tones & 6 notes

    // chords,
    // 3 note chords
    //todo: add major, minor, diminished, augmented,
    // 4 note chord
    //todo: add 7, maj7, 9, maj9
    // 5 note chords





    // draw pitch constellation






    fs.writeFile('updated-scales.ts', newValue, 'utf-8', function (err) {
      if (err) throw err;
      console.log('filelistAsync complete');
    });
  });
}

readWriteAsync()