import { nodeListToArray } from '../Utils/array'
import { IScale } from '../Utils/Scales/scales-shortlist';

import { Omni } from '../index';


class FavScaleSelector {

  private favScaleSelectorEl = document.getElementById('fav-scale-buttons');
  private addButtonEl = document.getElementById('addFavScaleBtn');
  private favScaleBtnId = 'fav-selector-btn';
  private favScaleBtnEls: Element[] = [];

  /**
   * An array containing the scaleIdx's corresponding to the favourite scales
   */
  favourites: number[] = [];

  /**
   * Max amount of favourites to store
   */
  maxAmount = 3;

  /**
   * Current active favourite scale index. Set to -1 if none are active
   */
  private _activeFavIdx = -1;

  constructor() {

    this.onAddButtonPressed = this.onAddButtonPressed.bind(this);
    this.onScalePressed = this.onScalePressed.bind(this);

    this.addEventListeners();

    this.render();
  }

  addScaleToFavourites(scaleIdx: number) {
    // don't add scale again if it's already in favourites
    if (this.favourites.indexOf(scaleIdx) === -1) {
      this.favourites.push(scaleIdx);

      // Cap amount of favourites to the maximum amount
      if (this.favourites.length > this.maxAmount) {
        this.favourites.splice(0, 1);
      }

      this.render();
    }
  }


  getBtnPressedIdx(el: Element) {
    return parseInt(el.id.split(`${this.favScaleBtnId}-`)[1], 10);
  }

  onAddButtonPressed(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.addScaleToFavourites(Omni.state.scaleIdx);
  }

  onScalePressed(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    const el = (<Element>e.target)
    const scaleIdx = this.getBtnPressedIdx(el);
    Omni.scaleSelector.setTo(scaleIdx);
  }

  next() {
    // switch to next favourite
    this._incrementActiveIdx();
    console.log('change to ', this._activeFavIdx)
    Omni.scaleSelector.setTo(this.favourites[this._activeFavIdx]);
  }

  prev() {
    // switch to prev favourite
    this._decrementActiveIdx();
    console.log('change to ', this._activeFavIdx)
    Omni.scaleSelector.setTo(this.favourites[this._activeFavIdx]);
  }

  setActiveClass(scaleIdx) {
    this.removeAllActiveClasses();
    const idx = this.favourites.indexOf(scaleIdx)

    // if the current scale is a fav pick
    if (idx !== -1) {
      const el = document.getElementById(`${this.favScaleBtnId}-${scaleIdx}`)
      if (el) el.classList.add('is-selected');
    }

    // make sure the active favourite idx is updated (-1 if not a current favourite)
    this._activeFavIdx = idx;
  }

  removeAllActiveClasses() {
    // find and remove all is-selected classes from buttons
    this.favScaleBtnEls.forEach(el => el.classList.remove('is-selected'));
  }

  addEventListeners() {
    // Add button
    if (this.addButtonEl) {
      this.addButtonEl.addEventListener('mousedown', this.onAddButtonPressed);
      this.addButtonEl.addEventListener('touchstart', this.onAddButtonPressed);
    }

    // Favourite scale choice buttons
    if (this.favScaleSelectorEl) {
      this.favScaleSelectorEl.addEventListener('mousedown', this.onScalePressed)
      this.favScaleSelectorEl.addEventListener('touchstart', this.onScalePressed);
    }
  }

  updateFavScaleButtons() {
    if (this.favScaleSelectorEl) {
      // append the <li> drone buttons
      this.favScaleSelectorEl.innerHTML = this.favScaleBtnElsList;

      // store each btn in cache for querying
      this.favScaleBtnEls = nodeListToArray(this.favScaleSelectorEl.childNodes)
    }
  }

  get favScaleBtnElsList() {
    let buttonList = '';
    const favsLength = this.favourites.length;
    for (let i = 0; i < favsLength; i++) {
      buttonList += `<li id="${this.favScaleBtnId}-${this.favourites[i]}">${Omni.scaleSelector.scaleNames[this.favourites[i]]}</li>`
    }

    return buttonList;
  }


  render() {
    this.updateFavScaleButtons();
    this.setActiveClass(Omni.state.scaleIdx);
  }

  private _incrementActiveIdx() {
    if (this._activeFavIdx >= this.favourites.length - 1) {
      this._activeFavIdx = 0
    } else {
      this._activeFavIdx++;
    }
  }

  private _decrementActiveIdx() {
    if (this._activeFavIdx <= 0) {
      this._activeFavIdx = this.favourites.length - 1
    } else {
      this._activeFavIdx--;
    }
  }

}

export default FavScaleSelector;