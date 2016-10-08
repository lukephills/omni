import {IdentifierIndexMap} from '../Utils/utils';
import {getPixelRatio, getCoordinateFromEventAsPercentageWithinElement} from '../Utils/CanvasUtils';
import MultiTouch from './MultiTouch';
import Synth from './Audio/Synth'
import {palette} from '../Constants/Defaults'
import {getItemFromArrayPool} from '../Utils/array';
import {canvasRenderAtPixelRatio} from '../Utils/CanvasUtils';
import {getPerfectFifthIndex, getPerfectFourthIndex} from '../Utils/Audio/scales';

class Harp {
  public audio: Synth
  public lines: number = 32;
  public octavesToDisplay = 3;
  private touches: IdentifierIndexMap;
	private activeTouches: any = {};
  private pixelRatio: number = getPixelRatio();

  private colors: any[] = [];

  constructor(private canvas) {

    canvasRenderAtPixelRatio(this.canvas);

    this.audio = new Synth();


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
  }

  draw(): void {
		// this._DrawAnimationFrame = requestAnimationFrame(this.draw.bind(this));
		console.log('DRAW');

		const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
		const w: number = this.canvas.width / this.pixelRatio;
		const h: number = this.canvas.height / this.pixelRatio;
		const {lines} = this;
    const colors = Object.keys(palette).map(key => palette[key]);
		const lineWidth = w / lines;

		// console.log(this.audio.scale.length);

		ctx.clearRect(0, 0, w, h);

		// DRAW THE LINES
		for (let i = 0; i < lines; i++) {
			ctx.fillStyle = getItemFromArrayPool(i, colors);
			ctx.fillRect(lineWidth * i, 0, lineWidth + 1, h); // +1 is for overlap to avoid nasty small white lines
		}
	}

  onPointerDown(e, id: number): void {
		const index = this.touches.Add(id);
		const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
		const noteIndex = this._getNoteIndexFromPosition(pos.x);

		// store the current noteIndex in activeTouches
		this.activeTouches[id] = noteIndex;
		// Play the note
		this.audio.NoteOn(noteIndex, pos.y, index);
	}

	onPointerUp(e, id: number): void {
		// delete this noteIndex from active touches
		delete this.activeTouches[id];
	}

	onPointerMove(e, id: number): void {
		const index = this.touches.GetIndexFromIdentifier(id);
		const {x, y} = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
		const noteIndex = this._getNoteIndexFromPosition(x);

		// If noteIndex hasn't changed (note is the same)
		if (this.activeTouches[id] === noteIndex) {
      // Update the notes position on the note
      this.audio.updateNote(x, y, index);

    } else {
      // Changed to a new note

      // Update the current noteIndex in activeTouches
      this.activeTouches[id] = noteIndex;

      // Stop previous note
      this.audio.NoteOff(index);

      // Play the new note
      this.audio.NoteOn(noteIndex, y, index);
    }
	}

  onResize() {
    canvasRenderAtPixelRatio(this.canvas);
  }

  updateScale(scale) {
		const len = scale.length;
		const p5 = getPerfectFifthIndex(scale);
		const p4 = getPerfectFourthIndex(scale);

		let colors = [];
		colors[0] = palette.grey;
		colors[p5] = palette.pink;
		colors[p4] = palette.peach;
		for (let i = 0; i < len; i++) {
			if (!colors[i]) {
				colors[i] = (i % 2 === 0) ? palette.green : palette.blue;
			}
		}
		console.log(colors);

		this.lines = (len * this.octavesToDisplay) + 1; // add 1 to include top octave note

		this.colors = colors;
		this.audio.scale = scale;
		this.draw();
	}

	private _getNoteIndexFromPosition(x: number): number {
		return Math.floor(x / (100 / this.lines));
	}

}

export default Harp;