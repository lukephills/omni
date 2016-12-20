
import {$} from '../Utils/selector'
import {nodeListToArray} from '../Utils/array'
import {incrementWithinRange, decrementWithinRange} from '../Utils/number'
import {Omni} from '../index';


enum direction {prev, next}

class SettingsCarouselManager {

  constructor() {
    const carousels = $('[data-carousel]')

    carousels.forEach(carousel => {
      carousel.children[0].addEventListener('click', this.onChangeBtn.bind(this, carousel, direction.prev))
      carousel.children[carousel.children.length-1].addEventListener('click', this.onChangeBtn.bind(this, carousel, direction.next))
    })
  }

  onChangeBtn(container, dir: direction) {
    const carousel = $('[data-carousel='+container.dataset.carousel+']')[0];
    const items = nodeListToArray(carousel.children[1].children);

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.classList.contains('is-selected')) {
        item.classList.remove('is-selected');

        // get the next item index depending on direction
        const updateIdx = dir === direction.next ? incrementWithinRange : decrementWithinRange;
        const newIdx = updateIdx(i, 0, items.length - 1);
        items[newIdx].classList.add('is-selected');
        this.carouselDidUpdate(carousel.dataset['carousel'], items[newIdx].dataset['val'])
        break;
      }
    }
  }

  carouselDidUpdate(carousel: string, value: string) {
    // do something with the new
    switch (carousel) {
      case 'xEffect':
        Omni.setXEffect(parseInt(value, 10))
      break;
      case 'yEffect':
        Omni.setYEffect(parseInt(value, 10))
      break;
    }
  }

}


export default SettingsCarouselManager;