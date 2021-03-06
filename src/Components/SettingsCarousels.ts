
import { $ } from '../Utils/selector'
import { nodeListToArray } from '../Utils/array'
import { incrementWithinRange, decrementWithinRange, incrementIfWithinRange, decrementIfWithinRange } from '../Utils/number'
import { Omni } from '../index';


enum direction { prev, next }

class SettingsCarouselManager {

  constructor() {
    const carousels = $('[data-carousel]')

    carousels.forEach(carousel => {
      carousel.children[0].addEventListener('click', this.onChangeBtn.bind(this, carousel, direction.prev))
      carousel.children[carousel.children.length - 1].addEventListener('click', this.onChangeBtn.bind(this, carousel, direction.next))
    })
  }

  onChangeBtn(container, dir: direction) {
    const carousel = $('[data-carousel=' + container.dataset.carousel + ']')[0];
    const items = nodeListToArray(carousel.children[1].children);

    const rotate = (carousel.dataset['carouselRotate'] === 'false') ? false : true;

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.classList.contains('is-selected')) {
        item.classList.remove('is-selected');

        // get the next item index depending on direction
        let newIdx: number;

        // if rotate incrementing the last number will rotate to the first number
        if (rotate) {
          const updateIdx = dir === direction.next ? incrementWithinRange : decrementWithinRange;
          newIdx = updateIdx(i, 0, items.length - 1);
        } else {
          if (dir === direction.next) {
            newIdx = incrementIfWithinRange(i, items.length - 1);
          } else {
            newIdx = decrementIfWithinRange(i, 0);
          }
        }

        carousel.dataset['val'] = newIdx.toString();
        items[newIdx].classList.add('is-selected');

        if (this.isCorrespondingDuplicate(carousel)) {
          return this.onChangeBtn(container, dir)
        }

        return this.carouselDidUpdate(this.getCarouselName(carousel), items[newIdx].dataset['val'])
      }
    }
  }

  private isCorrespondingDuplicate(carousel) {
    const correspondingCarousel = this.getCorrespondingCarousel(carousel)
    if (correspondingCarousel && correspondingCarousel.dataset['val'] === carousel.dataset['val']) {
      return true;
    }
    return false;
  }

  private getCorrespondingCarousel(carousel) {
    const carouselGroupID = carousel.dataset['carouselGroup']
    if (carouselGroupID) {
      const groupedCarousels = $(`[data-carousel-group="${carouselGroupID}"]`);
      for (let i = 0; i < groupedCarousels.length; i++) {
        if (this.getCarouselName(groupedCarousels[i]) !== this.getCarouselName(carousel)) {
          return groupedCarousels[i];
        }
      }
    }
  }

  getCarouselName(carousel): string {
    return carousel.dataset['carousel']
  }

  carouselDidUpdate(carousel: string, value: string) {
    switch (carousel) {
      case 'voices':
        Omni.setVoice(parseInt(value, 10))
        break;
      case 'xEffect':
        Omni.setXEffect(parseInt(value, 10))
        break;
      case 'yEffect':
        Omni.setYEffect(parseInt(value, 10))
        break;
      case 'octave':
        Omni.setHarpOctaves(parseInt(value, 10))
        break;
      case 'octaveOffset':
        Omni.setHarpOctaveOffset(parseInt(value, 10) - 1)
        break;
    }
  }

}


export default SettingsCarouselManager;