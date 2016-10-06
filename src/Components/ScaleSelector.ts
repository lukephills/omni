import {Omni} from '../index.ts'

class ScaleSelector {

  private activeScaleListItem: Element;
	private activeScaleClassName: string =  'scale-list-item--active';

  private scaleNameEl = document.getElementById('scaleName');
  private scaleNameList = [];
  private scaleIdx: number = 0;

  constructor() {

    // this.appendScaleChoices();
    // this.scaleNameEl.innerHTML = scales

    for (let scaleName in Omni.scales) {
			if (scaleName) {
        this.scaleNameList.push(scaleName);
		  }
    }

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
    this.scaleNameEl.innerHTML = this.scaleNameList[this.scaleIdx];
    Omni.setScale(this.scaleNameList[this.scaleIdx]);
  }

  /**
   * on scale changed
   */
	handleScaleChange(e): void {
		if (e.target !== e.currentTarget) {
			let scaleId = e.target.dataset.scale;
			console.log('changed to:', scaleId);

			this.activeScaleListItem.classList.remove(this.activeScaleClassName);
			this.activeScaleListItem = e.target;
			this.activeScaleListItem.classList.add(this.activeScaleClassName);

			// this.onUpdate(this.scales[scaleId].frequencies);
		}
		e.stopPropagation();
	}


}

export default ScaleSelector;