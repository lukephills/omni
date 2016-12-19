
const show = (el) => {
  el.classList.add('is-active');
}

const hide = (el) => {
  el.classList.remove('is-active');
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

export const initViewController = () => {

  // SETTINGS MENU OVERLAY
  initSettingsMenuControls();

  // INTRO SPLASH
  playIntroScene();

  // ADD OTHER VIEWS BELOW

}



