import MultiTouch from './MultiTouch';
import {Omni} from '../index';
import {getCoordinateFromEventAsPercentageWithinElement} from '../Utils/CanvasUtils';
import {getDegreeWithin12} from '../Utils/Audio/scales';
import {nodeListToArray} from '../Utils/array'


class PitchConstellation {

  lines: number = 32;
  octavesToDisplay = 5;
  _currentNote = -1;

  constructor(private el: HTMLElement, private bassViewEl: HTMLElement) {
    if (!this.el) return;

    new MultiTouch(this.el, {
			onMouseDown: this.onPointerDown.bind(this),
      onTouchStart: this.onPointerDown.bind(this),
			onMouseUp: this.onPointerUp.bind(this),
			onMouseMove: this.onPointerMove.bind(this),
			onTouchEnd: this.onPointerUp.bind(this),
			onTouchMove: this.onPointerMove.bind(this),
		});
  }

  distanceFromCenter(pos) {
    const x = (pos.x - 0.5) * 2
    const y = (pos.y - 0.5) * 2
    return {x, y}
  }

  getQuadrant({x,y}) {
    if (x >= 0 && y >= 0) {
      return 1;
    } else if (x >= 0 && y < 0) {
       return 2;
    } else if (x < 0 && y < 0) {
      return 3;
    } else {
      return 4
    }
  }

  //TODO: could simplify this
  /**
   * Takes a position and returns closest hour make on clock face
   */
  getDodrant({x,y}) {
    const quadrant = this.getQuadrant({x,y});
    let dodtrant = 0;
    let dxy = x/y
    if (quadrant === 1 || quadrant === 3) {
      // quadrant = 1
       if (dxy > 4) {
        dodtrant = 3
      } else if (dxy > 1) {
        dodtrant = 2
      } else if (dxy > 0.25) {
        dodtrant = 1
      } else {
        dodtrant = 0
      }
    } else if (quadrant === 2 || quadrant === 4) {
      if (dxy > -0.25) {
        dodtrant = 6
      } else if (dxy > -1) {
        dodtrant = 5
      } else if (dxy > -4) {
        dodtrant = 4
      } else {
        dodtrant = 3
      }
    }

    return ((quadrant > 2) ? dodtrant + 6 : dodtrant) % 12
  }

  onPointerDown(e: MouseEvent, id) {
    const pos = this.distanceFromCenter(getCoordinateFromEventAsPercentageWithinElement(e, this.el));
    const note = this.getDodrant(pos);
    Omni.audio.bassNoteOn(note)
    this.setToBassView();
    this._currentNote = note;
  }

  onPointerUp(e, id) {
    Omni.audio.bassNotesOff()
    this.setToConstellationView();
    this._currentNote = -1;
  }

  onPointerMove(e: MouseEvent, id) {
    const pos = this.distanceFromCenter(getCoordinateFromEventAsPercentageWithinElement(e, this.el));
    const note = this.getDodrant(pos);
    if (this._currentNote !== note) {
      Omni.audio.bassNotesOff()
      Omni.audio.bassNoteOn(note);
    }
    this._currentNote = note;
  }

  setToBassView() {
    this.bassViewEl.style.display = "block";
    this.setLinesOpacity(0);
  }

  setToConstellationView() {
    this.bassViewEl.style.display = "none";
    this.setLinesOpacity(1);
  }

  setLinesOpacity(opacity: number) {
    const currentLinesArray = nodeListToArray(this.el.children);
    currentLinesArray.forEach(line => {
      line.style.opacity = opacity.toString();
    })
  }

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