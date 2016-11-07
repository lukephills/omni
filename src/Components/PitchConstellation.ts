import Synth from './Audio/Synth';
import {getDegreeWithin12} from '../Utils/Audio/scales';
import {nodeListToArray} from '../Utils/array'

class PitchConstellation {

  public audio: Synth;
  public lines: number = 32;
  public octavesToDisplay = 5;

  constructor(private el: HTMLElement | null) {}

  /**
   * Takes an array of frequencies and draws the resulting lines
   */
  drawLines(frequencies: number[]): void {

    const newNumberOfLines = frequencies.length;

    if (!this.el) return;

    const currentLinesArray = nodeListToArray(this.el.children);
    const currentNumberOfLines = currentLinesArray.length;

    // if we have too many lines already delete the spares
    if (newNumberOfLines < currentNumberOfLines) {
      const diff = currentNumberOfLines - newNumberOfLines;
      let i = diff;
      while (i--) {
        currentLinesArray[i].remove();
        currentLinesArray.splice(i, 1);
      }
    }


    for (let i = 0; i < newNumberOfLines; i++) {

      // get note degree within 12 using the frequency
      // mulitply by 30 to span within the 360 degree range (360/12 === 30)
      const angle = getDegreeWithin12(frequencies[i]) * 30;

      // if we have a line already, update its rotation
      if (currentLinesArray[i]) {
        (currentLinesArray[i]).style.transform = `rotate(${angle}deg)`
      } else {
        //create a new line, append it and then set rotation
        const div = document.createElement('div');
        this.el.appendChild(div);
        div.style.transform = `rotate(${angle}deg)`
      }

    }

	}

}

export default PitchConstellation;