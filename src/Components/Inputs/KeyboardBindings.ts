/**
 * Keyboard note values
 * Organised into rows of alphanumeric keys and computer control keys at the bottom
 *
 * Rows 2 - 4 are harp notes
 * Row 1 is root key changes (1 to '=')
 */
export const keyboardCodeMap: KeyboardCodes = {

  // Row 1 - Root note changes
  Digit1: 40,
  Digit2: 41,
  Digit3: 42,
  Digit4: 43,
  Digit5: 44,
  Digit6: 45,
  Digit7: 46,
  Digit8: 47,
  Digit9: 48,
  Digit0: 49,
  Minus: 50,
  Equal: 51,


  // Row 2
  KeyQ: 21,
  KeyW: 22,
  KeyE: 23,
  KeyR: 24,
  KeyT: 25,
  KeyY: 26,
  KeyU: 27,
  KeyI: 28,
  KeyO: 29,
  KeyP: 30,
  BracketLeft: 31,
  BracketRight: 32,
  Backslash: 33,

  // Row 3
  KeyA: 10,
  KeyS: 11,
  KeyD: 12,
  KeyF: 13,
  KeyG: 14,
  KeyH: 15,
  KeyJ: 16,
  KeyK: 17,
  KeyL: 18,
  Semicolon: 19,
  Quote: 20,

  // Row 4
  KeyZ: 0,
  KeyX: 1,
  KeyC: 2,
  KeyV: 3,
  KeyB: 4,
  KeyN: 5,
  KeyM: 6,
  Comma: 7,
  Period: 8,
  Slash: 9,



  //
  // Misc keys
  //

  // Arrows up & down to switch scale
  ArrowUp: 101,
  ArrowDown: 102,

  // Arrows left & right to switch between favourite scales
  ArrowLeft: 103,
  ArrowRight: 104,

  // Tab to switch between fav scales (TODO: add shift tab to switch back)
  Tab: 105,


  Backspace: 100, // Purge - Stop all sounds

  Backquote: 110, // Record / Overdub
  Space: 111, // Start / Stop recording playback
  Enter: 111, // Start / Stop recording playback

  // Switch between scale constellation and xy pad
  CapsLock: 108,


};


/**
 * Returns the key binding in the keyboardCodeMap or returns 0 if no binding exists
 * @param KeyboardEvent
 */
export function getKeyBinding(e: KeyboardEventLatest): number {
  if (e.code) {
    return keyboardCodeMap[e.code] || 0;
  } else {
    return _keyboardCodeMapFallback[e.keyCode] || 0;
  }
}


export type KeyType = 'harp' | 'rootNote' | 'control';
/**
 * Returns the type of key control using the key binding number
 */
export function getKeyType(key: number): KeyType {
  let type: KeyType;

  if (key >= 0 && key <= 39) {
    type = 'harp';
  } else if (key >= 40 && key <= 52) {
    type = 'rootNote';
  } else {
    type = 'control';
  }

  return type;
}




// Extent KeyboardEvent to include new code & key properties
export interface KeyboardEventLatest extends KeyboardEvent {

  /**
   * represents a physical key on the keyboard
   */
  code: string;

  /**
   *  value of a key pressed by the user
   */
  key: string;
}



/**
 * Types for KeyboardEvent.code bindings
 * https://w3c.github.io/uievents-code/
 */
export interface KeyboardCodes {

  // Row 1
  Backquote: number;
  Digit1: number;
  Digit2: number;
  Digit3: number;
  Digit4: number;
  Digit5: number;
  Digit6: number;
  Digit7: number;
  Digit8: number;
  Digit9: number;
  Digit0: number;
  Minus: number;
  Equal: number;
  Backspace: number;

  // Row 2
  Tab: number;
  KeyQ: number;
  KeyW: number;
  KeyE: number;
  KeyR: number;
  KeyT: number;
  KeyY: number;
  KeyU: number;
  KeyI: number;
  KeyO: number;
  KeyP: number;
  BracketLeft: number;
  BracketRight: number;
  Backslash: number;

  // Row 3
  KeyA: number;
  KeyS: number;
  KeyD: number;
  KeyF: number;
  KeyG: number;
  KeyH: number;
  KeyJ: number;
  KeyK: number;
  KeyL: number;
  Semicolon: number;
  Quote: number;
  Enter: number;

  // Row 4
  KeyZ: number;
  KeyX: number;
  KeyC: number;
  KeyV: number;
  KeyB: number;
  KeyN: number;
  KeyM: number;
  Comma: number;
  Period: number;
  Slash: number;

  // Row 5
  Space: number;
  ArrowUp: number;
  ArrowRight: number;
  ArrowDown: number;
  ArrowLeft: number;

  // Extra keys
  CapsLock: number;

}



/**
 * KeyboardEvent.keyCode fallback
 * This is used for browsers that haven't implemented KeyboardEvent.code yet.
 *
 * TODO: remove this once Microsoft Edge & Webkit supports it
 */
const _keyboardCodeMapFallback = {

  // Row 1
  192: keyboardCodeMap.Backquote,
  49: keyboardCodeMap.Digit1,
  50: keyboardCodeMap.Digit2,
  51: keyboardCodeMap.Digit3,
  52: keyboardCodeMap.Digit4,
  53: keyboardCodeMap.Digit5,
  54: keyboardCodeMap.Digit6,
  55: keyboardCodeMap.Digit7,
  56: keyboardCodeMap.Digit8,
  57: keyboardCodeMap.Digit9,
  48: keyboardCodeMap.Digit0,
  189: keyboardCodeMap.Minus,
  187: keyboardCodeMap.Equal,

  // Row 2
  9: keyboardCodeMap.Tab,
  81: keyboardCodeMap.KeyQ,
  87: keyboardCodeMap.KeyW,
  69: keyboardCodeMap.KeyE,
  82: keyboardCodeMap.KeyR,
  84: keyboardCodeMap.KeyT,
  89: keyboardCodeMap.KeyY,
  85: keyboardCodeMap.KeyU,
  73: keyboardCodeMap.KeyI,
  79: keyboardCodeMap.KeyO,
  80: keyboardCodeMap.KeyP,
  219: keyboardCodeMap.BracketLeft,
  221: keyboardCodeMap.BracketRight,
  220: keyboardCodeMap.Backslash,

  // Row 3
  20: keyboardCodeMap.CapsLock,
  65: keyboardCodeMap.KeyA,
  83: keyboardCodeMap.KeyS,
  68: keyboardCodeMap.KeyD,
  70: keyboardCodeMap.KeyF,
  71: keyboardCodeMap.KeyG,
  72: keyboardCodeMap.KeyH,
  74: keyboardCodeMap.KeyJ,
  75: keyboardCodeMap.KeyK,
  76: keyboardCodeMap.KeyL,
  186: keyboardCodeMap.Semicolon,
  222: keyboardCodeMap.Quote,
  13: keyboardCodeMap.Enter,

  // Row 4
  90: keyboardCodeMap.KeyZ,
  88: keyboardCodeMap.KeyX,
  67: keyboardCodeMap.KeyC,
  86: keyboardCodeMap.KeyV,
  66: keyboardCodeMap.KeyB,
  78: keyboardCodeMap.KeyN,
  77: keyboardCodeMap.KeyM,
  188: keyboardCodeMap.Comma,
  190: keyboardCodeMap.Period,
  191: keyboardCodeMap.Slash,

  // Row 5
  32: keyboardCodeMap.Space,
  38: keyboardCodeMap.ArrowUp,
  37: keyboardCodeMap.ArrowLeft,
  40: keyboardCodeMap.ArrowDown,
  39: keyboardCodeMap.ArrowRight,
};