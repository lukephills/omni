import {nodeListToArray} from '../Utils/array'
import {IScale} from '../Utils/Scales/scales-shortlist';

import {Omni} from '../index';


class FavScaleSelector {

  private favScaleSelectorEl = document.getElementById('fav-scale-buttons');
  private addButtonEl = document.getElementById('addFavScaleBtn');
  private favScaleBtnId = 'fav-selector-btn';

  /**
   * An array containing the scaleIdx's corresponding to the favourite scales
   */
  favourites: number[] = [];

  /**
   * Max amount of favourites to store
   */
  maxAmount = 3;

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
    }

    // Cap amount of favourites to the maximum amount
    if (this.favourites.length > this.maxAmount) {
      this.favourites.splice(0,1);
    }

    console.log(this.favourites);

    this.render();

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
    const scaleIdx = this.getBtnPressedIdx((<Element>e.target));
    Omni.scaleSelector.setTo(scaleIdx);
  }

  // addActiveClass(el) {
  //   this.removeAllActiveClasses();
  //   el.classList.add('is-selected');
  // }

  // removeAllActiveClasses() {
  //   // find and remove all is-selected classes from buttons
  //   this.droneSelectorBtnEls.forEach(el => el.classList.remove('is-selected'));
  // }

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
    }
  }

  get favScaleBtnElsList() {
    let buttonList = '';
    const favsLength = this.favourites.length;
    for (let i = 0; i < favsLength; i++) {
      buttonList += `<li id="${this.favScaleBtnId}-${this.favourites[i]}">${Omni.scaleSelector.scaleNameList[this.favourites[i]]}</li>`
    }

    return buttonList;
  }


  render() {
    this.updateFavScaleButtons();
  }

}

export default FavScaleSelector;