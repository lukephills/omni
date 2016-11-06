/**
 * Keyboard note values
 * Organised into rows of alphanumeric keys and computer control keys at the bottom
 *
 * Rows 3 - 1 are harp notes (20+)
 * Row 4 is drone notes (0 - 9)
 */
export const keyboardCodeMap: KeyboardCodes = {

  // Row 1
  Backquote: 44,
  Digit1: 45,
  Digit2: 46,
  Digit3: 47,
  Digit4: 48,
  Digit5: 49,
  Digit6: 50,
  Digit7: 51,
  Digit8: 52,
  Digit9: 53,
  Digit0: 54,
  Minus: 55,
  Equal: 56,
  Backspace: 57,

  // Row 2
  KeyQ: 31,
  KeyW: 32,
  KeyE: 33,
  KeyR: 34,
  KeyT: 35,
  KeyY: 36,
  KeyU: 37,
  KeyI: 38,
  KeyO: 39,
  KeyP: 40,
  BracketLeft: 41,
  BracketRight: 42,
  Backslash: 43,

  // Row 3
  KeyA: 20,
  KeyS: 21,
  KeyD: 22,
  KeyF: 23,
  KeyG: 24,
  KeyH: 25,
  KeyJ: 26,
  KeyK: 27,
  KeyL: 28,
  Semicolon: 29,
  Quote: 30,

  // Row 4 - Drone toggles
  KeyZ: 0,
  KeyX: 1,
  KeyC: 2,
  KeyV: 3,
  KeyB: 4,
  KeyN: 5,
  KeyM: 6,
  Comma: 7,

  Period: 100, // Purge - Stop all sounds
  Slash: 110, // Record / Overdub



  //
  // Misc keys
  //

  // Arrows to switch scale
  ArrowUp: 101,
  ArrowRight: 101,
  ArrowDown: 102,
  ArrowLeft: 102,

  // Tab to switch between fav scales (TODO: add shift tab to switch back)
  Tab: 105,

  // Start / Stop recording playback
  Space: 111,
  Enter: 111,

  // Numpad to switch octave ?
  NumpadAdd: 106,
  NumpadSubtract: 107,

  // Switch between scale constellation and xy pad
  CapsLock: 108,


  // Control keys
  ControlLeft: 200,
  MetaLeft: 201,
  MetaRight: 201,
  AltLeft: 202,
  AltRight: 202,
  ShiftLeft: 203,
  ShiftRight: 203,


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


export type KeyType = 'harp' | 'drone' | 'control';
/**
 * Returns the type of key control using the key binding number
 */
export function getKeyType(key: number): KeyType {
  let type: KeyType;

  if (key >= 0 && key <= 9) {
    type = 'drone';
  } else if (key >= 20 && key <= 60) {
    type = 'harp';
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
  ShiftLeft: number;
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
  ShiftRight: number;

  // Row 5
  ControlLeft: number;
  MetaLeft: number;
  AltLeft: number;
  Space: number;
  MetaRight: number;
  AltRight: number;
  ArrowUp: number;
  ArrowRight: number;
  ArrowDown: number;
  ArrowLeft: number;

  // Extra keys
  NumpadAdd: number;
  NumpadSubtract: number;
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
  16: keyboardCodeMap.ShiftLeft,
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
  // 16: keyboardCodeMap.ShiftRight, // keyCode is the same for both shift keys

  // Row 5
  17: keyboardCodeMap.ControlLeft,
  18: keyboardCodeMap.AltLeft,
  91: keyboardCodeMap.MetaLeft,
  32: keyboardCodeMap.Space,
  93: keyboardCodeMap.MetaRight,
  // 18: keyboardCodeMap.AltRight, // keyCode is the same for both alt keys
  38: keyboardCodeMap.ArrowUp,
  37: keyboardCodeMap.ArrowLeft,
  40: keyboardCodeMap.ArrowDown,
  39: keyboardCodeMap.ArrowRight,
};