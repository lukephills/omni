
const show = (el) => {
  el.classList.add('is-active');
}

const hide = (el) => {
  el.classList.remove('is-active');
}

const toggle = (el: HTMLElement) => {
el.classList.toggle('is-hidden');
}

const playIntroScene = () => {
  const splashOverlay = document.getElementById('splashOverlay');
  if (!splashOverlay) return;
  show(splashOverlay);
}

const initSettingsMenuControls = () => {
  const menuBtn = document.getElementById('menuBtn');
  const closeMenuBtn = document.getElementById('closeBtn');
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

export const initViewController = () => {

  // SETTINGS MENU OVERLAY
  initSettingsMenuControls();

  // Buttons to show and hide pitch contellation and/or XYPad views
  initEffectPanelSwitcher();

  // INTRO SPLASH
  playIntroScene();

  // ADD OTHER VIEWS BELOW

}



