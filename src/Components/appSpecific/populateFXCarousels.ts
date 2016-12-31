import {$} from '../../Utils/selector'


export function populateFXCarousels(state, effects) {

  const fxCarousels = $('.js-fx-carousel');

  for (let i = 0; i < fxCarousels.length; i++) {
    const fxCarousel = fxCarousels[i];
    const id = fxCarousel.dataset['carousel'];
    if (id === 'yEffect') {
      fxCarousel.dataset['val'] = state.yEffect.toString()
    } else if (id === 'xEffect') {
      fxCarousel.dataset['val'] = state.xEffect.toString()
    }
    const ul = fxCarousel.children[1];
    ul.innerHTML = getHTMLToAppend(effects, fxCarousel.dataset['val']);
  }
}

function getHTMLToAppend(effects, val) {
  let textToAppend = '';
  for (let i = 0; i < effects.length; i++) {
    const fx = effects[i];
    textToAppend += `<li class="${i === parseInt(val, 10) ? 'is-selected' : ''}" data-val="${i}">${fx.name}</li>`
  }

  return textToAppend;
}

