
interface CallbackOptions {
  onKeyDown: (e: KeyboardEvent) => any;
  onKeyUp: (e: KeyboardEvent) => any;
}

export class KeyboardManager {

  keysDown: Set<string>

  constructor(private callbacks: CallbackOptions) {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
    this.keysDown = new Set()
  }

  onKeyDown(e: KeyboardEvent) {

    // Ignore if command, shift, alt or ctrl are down
    if (e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) return;

    // If key isn't already down fire event and add to list
    if (!this.keysDown.has(e.key)) {
      this.callbacks.onKeyDown(e)
      this.keysDown.add(e.key)
    }
  }

  onKeyUp(e: KeyboardEvent) {

    // Ignore if command, shift, alt or ctrl are down
    if (e.metaKey || e.shiftKey || e.altKey || e.ctrlKey) return;

    // Fire event
    this.callbacks.onKeyUp(e);

    // Delete key from list
    this.keysDown.delete(e.key);
  }

}