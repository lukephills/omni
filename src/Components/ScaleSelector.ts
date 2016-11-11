import {Omni} from '../index';

class ScaleSelector {

  scaleNameList: string[] = [];

  private scaleNameEl = document.getElementById('scaleName');
  private scaleIdx: number = 0;

  constructor() {

    // this.appendScaleChoices();
    // this.scaleNameEl.innerHTML = scales
    console.log(Omni.scales)

    this.scaleNameList = Omni.scales.map(scale => scale.name)



    // for (let scaleName in Omni.scales) {
		// 	if (scaleName) {
    //     this.scaleNameList.push(scaleName);
		//   }
    // }

    this.render();
  }

  setTo(idx: number) {
    this.scaleIdx = idx;
    this.render();
  }

  prev() {
    if (this.scaleIdx === 0) {
      this.setTo(this.scaleNameList.length - 1);
    } else {
      this.setTo(this.scaleIdx - 1);
    }
  }

  next() {
    if (this.scaleIdx === this.scaleNameList.length - 1) {
      this.setTo(0);
    } else {
      this.setTo(this.scaleIdx + 1);
    }
  }

  render() {
    Omni.setScale(this.scaleIdx);
    if (this.scaleNameEl) {
      this.scaleNameEl.innerHTML = this.scaleNameList[this.scaleIdx];
    }
  }
}

export default ScaleSelector;