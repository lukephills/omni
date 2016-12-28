import {nodeListToArray} from '../Utils/array'


class DroneSelector {

  private droneBtnElId = 'drone-selector-btn';
  private droneSelectorEl = document.getElementById('drone-selector-buttons');
  private droneLabels = ['1', '5'];
  private droneSelectorBtnEls: Element[] = [];
  // drone: Drone;
  droneIdx = -1;

  constructor() {

    // this.drone = new Drone()

    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.addEventListeners();

    this.render();
  }

  setDrone(idx: number) {
    // Omni.state.droneIdx = idx;
    this.droneIdx = idx;

    if (idx >= 0) {
      // start drone on note idx
      // this.drone.noteOn(Omni.state.scale[idx])
      console.log('start drone', idx +1)
    } else {
      // stop drone
      // this.drone.noteOff()
      console.log('stop drone')
    }
  }

  getBtnPressedIdx(el: Element) {
    return parseInt(el.id.split(`${this.droneBtnElId}-`)[1], 10);
  }

  onPointerUp(e: MouseEvent | TouchEvent) {
    if (this.droneSelectorEl) {
      this.droneSelectorEl.removeEventListener('mousemove', this.onMouseMove)
      this.droneSelectorEl.removeEventListener('touchmove', this.onTouchMove)
    }
  }

  onPointerDown(e: MouseEvent | TouchEvent) {
    // let idx = this.getBtnPressedIdx(e);
    e.preventDefault();

    if (this.droneSelectorEl) {
      this.droneSelectorEl.addEventListener('mousemove', this.onMouseMove)
      this.droneSelectorEl.addEventListener('touchmove', this.onTouchMove)
    }

    const el = (<Element>e.target)
    const id = el.id;

    // only handle events on a button element
    if (!id.startsWith(this.droneBtnElId)) return;

    if (el.classList.contains('is-selected')) {
      // already selected, turn off
      this.setDrone(-1)

      // remove 'is-selected' class
      this.removeAllActiveClasses()

    } else {
      // not selected yet, turn on
      const idx = this.getBtnPressedIdx(el)
      this.setDrone(idx)

      // add 'is-selected' class
      this.addActiveClass(el)
    }
  }

  onTouchMove(e: TouchEvent) {
    e.preventDefault();
    e.stopPropagation();

    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const id = el.id;

    this.pointerMove(el, id);

  }

  onMouseMove(e: MouseEvent) {
    e.preventDefault();

    const el = (<Element>e.target)
    const id = el.id;

    this.pointerMove(el, id);
  }

  /**
   * mousemove and touchmove get the current target element differently
   * then they both call this function
   */
  pointerMove(el, id) {
    // only handle events on a button element
    if (!id.startsWith(this.droneBtnElId)) return;

    if (!el.classList.contains('.is-selected')) {
      // not selected yet, turn on
      const idx = this.getBtnPressedIdx(el)
      this.setDrone(idx)

      // add 'is-selected' class
      this.addActiveClass(el)
    }
  }

  addActiveClass(el) {
    this.removeAllActiveClasses();
    el.classList.add('is-selected');
  }

  removeAllActiveClasses() {
    // find and remove all is-selected classes from buttons
    this.droneSelectorBtnEls.forEach(el => el.classList.remove('is-selected'));
  }

  addEventListeners() {
    if (this.droneSelectorEl) {
      this.droneSelectorEl.addEventListener('mousedown', this.onPointerDown)
      this.droneSelectorEl.addEventListener('touchstart', this.onPointerDown)
      this.droneSelectorEl.addEventListener('mouseup', this.onPointerUp)
      this.droneSelectorEl.addEventListener('touchend', this.onPointerUp)
    }
  }

  appendDroneButtons() {
    if (this.droneSelectorEl) {
      // append the <li> drone buttons
      this.droneSelectorEl.innerHTML = this.getDroneElsList();
      // store each btn in cache for querying
      this.droneSelectorBtnEls = nodeListToArray(this.droneSelectorEl.childNodes)
    }


  }

  getDroneElsList() {
    let buttonList = '';
    const numberOfDroneNotes = this.droneLabels.length;

    for (let i = 0; i < numberOfDroneNotes; i++) {
      buttonList += `<li id="drone-selector-btn-${i}">${this.droneLabels[i]}</li>`
    }

    return buttonList;
  }



  render() {
    this.appendDroneButtons();
  }

}

export default DroneSelector;