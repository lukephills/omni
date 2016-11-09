import {nodeListToArray} from '../Utils/array';
import {Omni} from '../index';

class RootNoteSelector {

  readonly rootNoteSelectorContainerEl = document.getElementById('pitch-constellation-letters');
  private rootNoteEls: Element[] = [];
  keyIdx = 0;
  readonly rootNoteLetters = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  readonly isSelectedClass = 'is-selected';

  constructor() {

    // this.drone = new Drone()

    this.onPointerDown = this.onPointerDown.bind(this);

    this.addEventListeners();

    if (this.rootNoteSelectorContainerEl) {
      this.rootNoteEls = nodeListToArray(this.rootNoteSelectorContainerEl.children);
    }
  }

  setKey(idx: number) {
    // Omni.state.droneIdx = idx;
    this.keyIdx = idx;

    if (idx >= 0 && idx < this.rootNoteLetters.length) {
      // Set harp key
      console.log('set key', this.rootNoteLetters[idx])

      Omni.setRootNote(idx);

      // add 'is-selected' class
      this.addActiveClass(idx);
    }
  }

  getBtnPressedIdx(el: Element) {
    return parseInt(el.id.split('n')[1], 10);
  }

  addEventListeners() {
    if (this.rootNoteSelectorContainerEl) {
      this.rootNoteSelectorContainerEl.addEventListener('mousedown', this.onPointerDown);
      this.rootNoteSelectorContainerEl.addEventListener('touchstart', this.onPointerDown);
    }
  }

  onPointerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault();

    const idx = this.getBtnPressedIdx((<Element>e.target));
    this.setKey(idx);
  }


  addActiveClass(idx: number) {
    this.removeAllActiveClasses();
    if (this.rootNoteSelectorContainerEl && this.rootNoteEls.length === this.rootNoteLetters.length) {
      this.rootNoteEls[idx].classList.add(this.isSelectedClass);
    }
  }

  removeAllActiveClasses() {
    // find and remove all is-selected classes from buttons
    if (this.rootNoteSelectorContainerEl) {
      this.rootNoteEls.forEach(el => el.classList.remove(this.isSelectedClass));
    }
  }

}

export default RootNoteSelector;