import {Omni} from '../index'

class ScaleSelector {

  // private activeScaleListItem: Element;
	// private activeScaleClassName: string =  'scale-list-item--active';

  private scaleNameEl = document.getElementById('scaleName');
  private scaleNameList: string[] = [];
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

    console.log(this.scaleNameList);

    this.render();
  }

  prev() {
    if (this.scaleIdx === 0) {
      this.scaleIdx = this.scaleNameList.length - 1;
    } else {
      this.scaleIdx--;
    }

    this.render();
  }

  next() {
    if (this.scaleIdx === this.scaleNameList.length - 1) {
      this.scaleIdx = 0;
    } else {
      this.scaleIdx++;
    }

    this.render();
  }

  render() {
    if (this.scaleNameEl) {
      this.scaleNameEl.innerHTML = this.scaleNameList[this.scaleIdx];
      Omni.setScale(this.scaleIdx);
    }
  }
}

export default ScaleSelector;