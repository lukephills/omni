import { IdentifierIndexMap } from '../Utils/utils';
import { getPixelRatio, getCoordinateFromEventAsPercentageWithinElement } from '../Utils/CanvasUtils';
import MultiTouch from './MultiTouch';

import { palette } from '../Constants/Defaults'
import { canvasRenderAtPixelRatio } from '../Utils/CanvasUtils';
import { getPerfectFifthIndex } from '../Utils/Audio/scales';

import { Omni } from '../index';

const ROOT_NOTE_MIN_ALPHA = 0.15;

class Harp {
  // public audio: Synth
  public lines: number = 32;
  public octavesToDisplay = 3;
  private touches: IdentifierIndexMap;
  private activeTouches: any = {};
  private pixelRatio: number = getPixelRatio();
  _DrawAnimationFrame;
  private colors: any[] = [];
  activeNoteStates: {noteIndex: number, val: number}[] = [];

  constructor(private canvas: HTMLCanvasElement) {

    canvasRenderAtPixelRatio(this.canvas);

    // Initialize touch and pointer listeners
    this.touches = new IdentifierIndexMap();
    new MultiTouch(this.canvas, {
      onMouseDown: this.onPointerDown.bind(this),
      onMouseUp: this.onPointerUp.bind(this),
      onMouseMove: this.onPointerMove.bind(this),
      onTouchStart: this.onPointerDown.bind(this),
      onTouchEnd: this.onPointerUp.bind(this),
      onTouchMove: this.onPointerMove.bind(this),
    });

    let start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      let progress = timestamp - start;
      if (progress < 2000) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }


  decrementAlpha = (alpha, noteIndex, scale) => {
    if (alpha <= 0) return 0;
    const decreaseAmount = 0.04;
    if (noteIndex % scale.length === 0) {
      return alpha > (ROOT_NOTE_MIN_ALPHA + decreaseAmount) ?
        alpha - decreaseAmount : ROOT_NOTE_MIN_ALPHA;
    }
    return alpha - decreaseAmount;
  }

  init = () => {
    // drawing every frame - better to only draw when notes are playing
    this._DrawAnimationFrame = requestAnimationFrame(this.animate);
  }

  animate = () => {
    this._DrawAnimationFrame = requestAnimationFrame(this.animate);
    this.draw();
  }

  draw = () => {
    const scale = Omni.state.scale.frequencies;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

    const w: number = this.canvas.width / this.pixelRatio;
    const h: number = this.canvas.height / this.pixelRatio;
    const { lines } = this;
    // const colors = Object.keys(palette).map(key => palette[key]);
    const lineWidth = w / lines;
    // some of this doesn't need to be called every draw loop
    const borderWidth = 1;

    ctx.clearRect(0, 0, w, h);

    // const p5 = getPerfectFifthIndex(scale);
    const color1 = [236, 114, 110, 1];
    const colorBorder = 'rgba(255, 105, 105, 1)';

    // fill active notes
    if (this.activeNoteStates.length) {

      this.activeNoteStates = this.activeNoteStates.map(n => {
        return {
          noteIndex: n.noteIndex,
          val: this.decrementAlpha(n.val, n.noteIndex, scale),
        }
      }).filter(n => {
        if (n.noteIndex % scale.length === 0) {
          return n.val > ROOT_NOTE_MIN_ALPHA;
        }
        return n.val > 0;
      });
    }

    // DRAW THE LINES
    for (let i = 0; i < lines; i++) {

      if (this.activeNoteStates.length && this.activeNoteStates.some(n => n.noteIndex === i)) {

        const note = this.activeNoteStates.find(n => n.noteIndex === i);

        // if (i % scale.length !== 0) {
          ctx.fillStyle = `rgba(${color1[0]},${color1[1]},${color1[2]},${note.val})`;
        // }
        ctx.fillRect(i * lineWidth, 0, lineWidth + 1, h);

      } else if (i % scale.length === 0) {
        // Root note string
        ctx.fillStyle = `rgba(${color1[0]},${color1[1]},${color1[2]}, ${ROOT_NOTE_MIN_ALPHA})`;
        ctx.fillRect(i * lineWidth, 0, lineWidth + 1, h);
      }

      // All line borders
      ctx.fillStyle = colorBorder;
      ctx.fillRect(i * lineWidth, 0, borderWidth, h);
    }

    // last line border
    ctx.fillStyle = colorBorder;
    ctx.fillRect(w -1, 0, borderWidth, h);
  }

  highlightHarpKey(noteIndex: number) {
    const alreadyActiveIndex = this.activeNoteStates.findIndex(n => n.noteIndex === noteIndex)
    if (alreadyActiveIndex > -1) {
      // note already playing so update it instead
      this.activeNoteStates[alreadyActiveIndex] = {
        noteIndex,
        val: 1,
      }
    } else {
      this.activeNoteStates.push({
        noteIndex,
        val: 1,
      });
    }
  }

  onPointerDown(e, id: number) {
    const index = this.touches.Add(id);
    const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
    const noteIndex = this._getNoteIndexFromPosition(pos.x);

    // store the current noteIndex in activeTouches
    this.activeTouches[id] = noteIndex;
    // Play the note
    Omni.audio.harpNoteOn(noteIndex, pos.y, index);
    this.highlightHarpKey(noteIndex)
  }

  onPointerUp(e, id: number): void {
    // delete this noteIndex from active touches
    delete this.activeTouches[id];
  }

  onPointerMove(e, id: number): void {
    const index = this.touches.GetIndexFromIdentifier(id);
    const { x, y } = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
    const noteIndex = this._getNoteIndexFromPosition(x);


    // If noteIndex hasn't changed (note is the same)
    if (this.activeTouches[id] === noteIndex) {
      // Update the notes position on the note
      // Omni.audio.harp.updateNote(x, y, index); //TODO: do we need this

    } else {
      // Changed to a new note

      // Update the current noteIndex in activeTouches
      this.activeTouches[id] = noteIndex;

      // Stop previous note
      Omni.audio.harpNoteOff(index);

      // Play the new note
      Omni.audio.harpNoteOn(noteIndex, y, index);
      this.highlightHarpKey(noteIndex)
    }
  }

  onKeyDown(key: number) {
    this.highlightHarpKey(key);
    Omni.audio.harpNoteOn(key, undefined, -1);
  }

  updateScale(scale, rootNoteIdx = 0) {

    const len = scale.length;
    const p5 = getPerfectFifthIndex(scale);


    let colors: string[] = [];
    // colors[0] = palette.grey;
    // colors[0] = 'fff';
    // colors[p5] = palette.pink;
    colors[0] = 'FF6969';
    colors[p5] = 'FFC3C3';
    for (let i = 0; i < len; i++) {
      if (!colors[i]) {
        colors[i] = (i % 2 === 0) ? palette.green : palette.blue;
      }
    }

    this.lines = (len * this.octavesToDisplay) + 1; // add 1 to include top octave note

    this.colors = colors;
    Omni.audio.scale = scale;
    Omni.audio.rootNoteIdx = rootNoteIdx;
    this.draw();
  }

  private _getNoteIndexFromPosition(x: number): number {
    return Math.floor(x * this.lines);
  }

}

export default Harp;