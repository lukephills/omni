import {IdentifierIndexMap} from '../Utils/utils';
import {getPixelRatio, getCoordinateFromEventAsPercentageWithinElement} from '../Utils/CanvasUtils';
import MultiTouch from './MultiTouch';
import Synth from './Audio/Synth'
import {palette} from '../Constants/Defaults'
// import {getItemFromArrayPool} from '../Utils/array';
import {canvasRenderAtPixelRatio} from '../Utils/CanvasUtils';
import {getPerfectFifthIndex} from '../Utils/Audio/scales';

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

  draw(scale): void {
		// this._DrawAnimationFrame = requestAnimationFrame(this.draw.bind(this));
		console.log('DRAW');

		const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
		const w: number = this.canvas.width / this.pixelRatio;
		const h: number = this.canvas.height / this.pixelRatio;
		const {lines} = this;
    // const colors = Object.keys(palette).map(key => palette[key]);
		const lineWidth = w / lines;
    // some of this doesn't need to be called every draw loop
    const borderWidth = 3;


		ctx.clearRect(0, 0, w, h);

    const p5 = getPerfectFifthIndex(scale);
		const color1 = '#FF6969';
		const color2 = '#FFC3C3';




		// DRAW THE LINES
		for (let i = 0; i < lines; i++) {

      // Root note
      if (i % scale.length === 0) {
        ctx.fillStyle = color1;
        ctx.fillRect(i * lineWidth, 0, lineWidth + 1, h);
      }

      // Perfect 5th note
      if (i % scale.length === p5) {
        ctx.fillStyle = color2;
        ctx.fillRect(i * lineWidth, 0, lineWidth + 1, h); // +1 is for overlap to avoid nasty small gaps
      }

      // All line borders

      ctx.fillStyle = 'white';
      ctx.fillRect(i * lineWidth, 0,   borderWidth, h);

      // // Only show line borders inbetween root and perfect 5 notes
      // if (!(
      //   i % (scale.length) === 0 ||
      //   i % (scale.length) === 1 ||
      //   i % (scale.length) === p5 ||
      //   i % (scale.length) === p5 + 1
      // )) {
      //   ctx.fillStyle = 'white';
      //   ctx.fillRect(i * lineWidth, 0,   borderWidth, h);
      // }
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

  onKeyDown(key: number) {
    this.audio.NoteOn(key, undefined, -1);
  }

  onResize() {
    canvasRenderAtPixelRatio(this.canvas);
  }

  updateScale(scale, rootNoteIdx = 0) {

    console.log(scale);

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
		console.log(colors);

		this.lines = (len * this.octavesToDisplay) + 1; // add 1 to include top octave note

		this.colors = colors;
		this.audio.scale = scale;
    this.audio.rootNoteIdx = rootNoteIdx;
		this.draw(scale);
	}

	private _getNoteIndexFromPosition(x: number): number {
		return Math.floor(x / (100 / this.lines));
	}

}

export default Harp;