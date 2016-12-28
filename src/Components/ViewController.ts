import {$} from '../Utils/selector'

const show = (el: HTMLElement) => {
  el.classList.add('is-active');
}

const hide = (el: HTMLElement) => {
  el.classList.remove('is-active');
}

const toggle = (el: HTMLElement) => {
el.classList.toggle('is-hidden');
}

const playIntroScene = () => {
  const splashOverlay = document.getElementById('splashOverlay');
  if (!splashOverlay) return;
  show(splashOverlay);

  setTimeout(() => {
    splashOverlay.classList.add('anim-ended')
  }, 1500)

  setTimeout(() => {
    splashOverlay.style.display = 'none'
  }, 2500)

}

const initSettingsMenuControls = () => {
  const menuBtn = document.getElementById('menuBtn');
  const closeMenuBtn = document.getElementById('closeBtnSettings');
  const settingsOverlay = document.getElementById('settingsOverlay');

  if (!menuBtn || !settingsOverlay || !closeMenuBtn) return;

  menuBtn.addEventListener('click', function(e) {
    show(settingsOverlay);
  });

  closeMenuBtn.addEventListener('click', function(e) {
    hide(settingsOverlay);
  });
}

const initEffectPanelSwitcher = () => {
  const pitchConstellationToggle = document.getElementById('constellationToggle');
  const xyPadToggle = document.getElementById('xyPadToggle');
  const pitchConstellationView = document.getElementById('pitchConstellationView');
  const xyPadView = document.getElementById('xyPadView');

  if (!pitchConstellationToggle || !xyPadToggle || !pitchConstellationView || !xyPadView) return;

  pitchConstellationToggle.addEventListener('click', function(e) {
    toggle(pitchConstellationView);
  });

  xyPadToggle.addEventListener('click', function(e) {
    toggle(xyPadView);
  });

}

const initEffectChoiceSwitcher = () => {
  const effectChoiceTriggerEls = $('.js-fx-name')
  const effectsChoiceOverlay = document.getElementById('effectsChoiceOverlay')
  const closeBtn = document.getElementById('closeBtnEffects')
  if (!effectChoiceTriggerEls.length || !effectsChoiceOverlay || !closeBtn) return;

  // TODO use a class selector to group these two together
  effectChoiceTriggerEls.forEach(el => {
    el.addEventListener('click', function(e) {
      show(effectsChoiceOverlay);
    })
  })

  closeBtn.addEventListener('click', function(e) {
    hide(effectsChoiceOverlay);
  });


}

export const initViewController = () => {

  // SETTINGS MENU OVERLAY
  initSettingsMenuControls();

  // Buttons to show and hide pitch contellation and/or XYPad views
  initEffectPanelSwitcher();

  // Buttons to show hide XYPad effect choices
  initEffectChoiceSwitcher();

  // INTRO SPLASH
  playIntroScene();

  // ADD OTHER VIEWS BELOW

}



