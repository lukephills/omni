// import {Omni} from '../index.ts'

// TODO: switch to short list
import {scales} from '../Utils/Scales/scales-shortlist';

class ScaleSelector {

  private activeScaleListItem: Element;
	private activeScaleClassName: string =  'scale-list-item--active';
  private prevBtnEl = document.getElementById('scaleSelectPrevBtn');
  private nextBtnEl = document.getElementById('scaleSelectNextBtn');
  private scaleNameEl = document.getElementById('scaleName');
  private scaleNameList = [];
  private scaleIdx: number = 0;

  constructor() {

    // this.appendScaleChoices();
    // this.scaleNameEl.innerHTML = scales

    for (let scaleName in scales) {
			if (scaleName) {
        this.scaleNameList.push(scaleName);
		  }
    }

    console.log(this.scaleNameList);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);

    this.prevBtnEl.addEventListener('click', this.prev);
    this.nextBtnEl.addEventListener('click', this.next);

    // this.prevBtnEl.addEventListener('mousedown', this.pointerDown.bind(this));



    this.render();
  }

  // TODO: scroll faster when pointer is down and holding
  pointerDown() {

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
  }

  /**
   * add scales to carousel
   */
	// appendScaleChoices() {
	// 	// append list items to the container
	// 	let listItems = '';
	// 	for (let key in Scales) {
	// 		if (key) {
  //       listItems += `<li class="scale-list-item ${key}" data-scale="${key}">${key}</li>`;
	// 	  }
  //   }
	// 	this.container.innerHTML = listItems;
	// 	this.container.addEventListener('click', this.handleScaleChange.bind(this), false);
	// }


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