import {Omni} from '../index';
import {$} from '../Utils/selector'
import {doubled, round} from '../Utils/number'

class ScaleSelector {

  scaleNames: string[] = [];
  scaleDescriptions: string[] = [];

  private scaleNameEls = $('.js-scale-name');
  private scaleDescriptionEl = $('#scaleDescription')[0];
  private scaleFrequenciesListEl = $('#scaleFrequencies')[0];
  private scaleIdx: number;

  constructor() {

    this.scaleNames = Omni.scales.map(scale => scale.name)
    this.scaleDescriptions = Omni.scales.map(scale => scale.description)


    console.log(Omni.scales)

    // By default set to first scale
    this.setTo(0);
  }

  setTo(idx: number) {
    this.scaleIdx = idx;
    this.render();
  }

  prev() {
    if (this.scaleIdx === 0) {
      this.setTo(this.scaleNames.length - 1);
    } else {
      this.setTo(this.scaleIdx - 1);
    }
  }

  next() {
    if (this.scaleIdx === this.scaleNames.length - 1) {
      this.setTo(0);
    } else {
      this.setTo(this.scaleIdx + 1);
    }
  }

  render() {
    Omni.setScale(this.scaleIdx);
    this.renderScaleName();
    this.renderScaleDescription();
    this.renderScaleFrequencyList();
  }

  renderScaleName() {
    if (this.scaleNameEls.length) {
      this.scaleNameEls.forEach(el => el.innerHTML = this.scaleNames[this.scaleIdx].toLowerCase());
    }
  }

  renderScaleDescription() {
    if (this.scaleDescriptionEl) {
      this.scaleDescriptionEl.innerHTML = this.scaleDescriptions[this.scaleIdx]
    }
  }

  renderScaleFrequencyList() {
    if (this.scaleFrequenciesListEl) {
      let stringToAppend = '';
      const frequencies = Omni.state.scale.frequencies
      if (frequencies) {
        for (let i = 0; i < frequencies.length; i++) {
          stringToAppend += `<li>${round(doubled(frequencies[i]), 1)}</li>`;
        }
      }
      this.scaleFrequenciesListEl.innerHTML = stringToAppend;
    }
  }
}


export default ScaleSelector;