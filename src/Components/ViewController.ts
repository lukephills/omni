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
  const middleSection = document.getElementById('middle-section');
  const middleSwitch = document.getElementById('middle-switch');

  if (!middleSwitch|| !middleSection) return;

  middleSwitch.addEventListener('click', function(e) {
    middleSection.classList.toggle('middle-section--2');
    middleSwitch.classList.toggle('icon-constellation');
    middleSwitch.classList.toggle('icon-xy');
  });

}


export const initViewController = () => {

  // SETTINGS MENU OVERLAY
  initSettingsMenuControls();

  // Buttons to show and hide pitch contellation and/or XYPad views
  initEffectPanelSwitcher();

  // INTRO SPLASH
  playIntroScene();

  // ADD OTHER VIEWS BELOW

}



