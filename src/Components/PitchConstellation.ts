import {IdentifierIndexMap} from '../Utils/utils';
import {getPixelRatio} from '../Utils/CanvasUtils';
import MultiTouch from './MultiTouch';
import Synth from './Audio/Synth'
import {palette} from '../Constants/Defaults'
import {getItemFromArrayPool} from '../Utils/array';
import {canvasRenderAtPixelRatio} from '../Utils/CanvasUtils';

import {nodeListToArray} from '../Utils/array.ts'

class PitchConstellation {
  public audio: Synth
  public lines: number = 32;
  public octavesToDisplay = 5;
  private touches: IdentifierIndexMap;
	private activeTouches: any = {};
  private pixelRatio: number = getPixelRatio();

  private colors: any[] = [];

  constructor(private el: HTMLElement) {
    this.drawLines(12);
  }

  drawLines(newNumberOfLines: number): void {

		console.log('Draw Pitch Constellation');


		// DRAW THE LINES


    const currentLinesArray = nodeListToArray(this.el.children);
    const currentNumberOfLines = currentLinesArray.length;


    // Omni.state.scale.frequencies.length
    // const newNumberOfLines = 3; // todo get this from chosen frequencies.length
    const angle = 360 / newNumberOfLines;
    console.dir(currentLinesArray)
    console.log('new angle', angle)

    // if we have too many lines already delete the spares
    if (newNumberOfLines < currentNumberOfLines) {
      const diff = currentNumberOfLines - newNumberOfLines;
      let i = diff;
      while (i--) {
        console.log(i)
        currentLinesArray[i].remove();
        currentLinesArray.splice(i, 1);
      }

      // for (let i = 0; i < diff; i++) {
      //   currentLinesArray[i].remove();
      //   currentLinesArray.splice(i);
      // }
    }

    for (let i = 0; i < newNumberOfLines; i++) {

      // if we have a line already, update its rotation
      if (currentLinesArray[i]) {
        console.log(`set ${i} to ${(i+1) *angle}`);
        (currentLinesArray[i]).style.transform = `rotate(${(i+1) * angle}deg)`
      } else {
        //create a new line, append it and then set rotation
        const div = document.createElement('div');
        this.el.appendChild(div);
        console.log(`set ${i} to ${i*angle}`);
        div.style.transform = `rotate(${i * angle}deg)`
      }

    }
	}

}

export default PitchConstellation;