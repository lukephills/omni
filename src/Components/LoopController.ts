import { Omni } from '../index';

class LoopController {

  constructor(private recordBtnEl: HTMLElement, private playBtnEl: HTMLElement, private downloadBtnEl) {

    this.onRecordPressed = this.onRecordPressed.bind(this);
    this.onPlayPressed = this.onPlayPressed.bind(this);
    this.onDownloadPressed = this.onDownloadPressed.bind(this);

    this.addEventListeners();

    this.render();
  }

  onRecordPressed() {
    Omni.audio.looper.recordBtnPressed();
    this.render();
  }

  onPlayPressed() {
    Omni.audio.looper.playBtnPressed();
    this.render();
  }

  onDownloadPressed() {
    Omni.audio.looper.exportWav(blob => {
      console.log(blob);
      const oldLink = document.getElementById('downloadLink');
      if (!oldLink) {
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.id = 'downloadLink'
        a.style.position = 'absolute'
        a.style.left = '0';
        a.style.top = '0';
        a.style.zIndex = '999';
        a.download = 'omni';
        a.innerText = 'download me'
        document.body.appendChild(a);
      } else {
        (oldLink as HTMLAnchorElement).href = window.URL.createObjectURL(blob);
      }

    })
  }

  private addEventListeners() {
      this.recordBtnEl.addEventListener('touchstart', this.onRecordPressed);
      this.recordBtnEl.addEventListener('mousedown', this.onRecordPressed);
      this.playBtnEl.addEventListener('touchstart', this.onPlayPressed);
      this.playBtnEl.addEventListener('mousedown', this.onPlayPressed);
      this.downloadBtnEl.addEventListener('touchstart', this.onDownloadPressed);
      this.downloadBtnEl.addEventListener('mousedown', this.onDownloadPressed);
  }

  resetClasses() {
    this.recordBtnEl.classList.remove('is-playing', 'is-recording', 'is-overdubbing')
    this.playBtnEl.classList.remove('is-playing', 'is-stopped')
  }

  render() {
    const state = Omni.audio.looper.state;
    this.resetClasses();
    switch (state) {
      case 'recording':
        this.recordBtnEl.classList.add('is-recording')
        console.log('is-recording')
      break;
      case 'overdubbing':
        this.recordBtnEl.classList.add('is-overdubbing')
        console.log('is-overdubbing')
      break;
      case 'playing':
        this.recordBtnEl.classList.add('is-playing')
        this.playBtnEl.classList.add('is-playing')
        console.log('is-playing')
      break;
      case 'stopped':
        // this.playBtnEl.classList.add('is-stopped')
        console.log('is-stopped')
      break;
      default:
      console.log('no state found');
    }
    console.log(state);
  }

}

export default LoopController;
