import * as CanvasUtils from '../Utils/CanvasUtils';
import MultiTouch from './MultiTouch';
import Audio from './Audio';
import {IdentifierIndexMap, isCordovaIOS} from '../Utils/utils';
import {getItemFromArrayPool} from '../Utils/array';

const URL: any = require('domurl'); // TODO: make typescript definitions

// TODO: switch to short list
import {ScaleList as Scales} from '../Utils/Scales/updated-scales';
// import {Scales} from '../Utils/Scales/scales-shortlist';

import {UpdateURL} from '../Utils/Urls';
import {getPerfectFifthIndex, getPerfectFourthIndex} from '../Utils/Audio/scales';

class App {

	public audio: Audio;
	public canvas: HTMLCanvasElement;
	private touches: IdentifierIndexMap;
	private _DrawAnimationFrame: number;
	public pixelRatio: number = CanvasUtils.getPixelRatio();
	// public colors: string[] = [
	// 	'rgb(198,199,192)', //grey
	// 	'rgb(215,251,247)', //light blue
	// 	'rgb(248,204,228)', //pink
	// 	'rgb(222,250,214)', //green
	// 	'rgb(181,195,229)', //purple
	// 	'rgb(252,224,204)', //peach
	// 	'rgb(194,227,252)', //blue
	// 	'rgb(250,230,176)', //yellow
	// ];
	public colors: string[] = [
		'rgb(198,199,192)', // grey
		'rgb(222,250,214)', // green
		'rgb(194,227,252)', // blue
		'rgb(252,224,204)', // peach
		'rgb(248,204,228)', // pink
		'rgb(222,250,214)', // green
		'rgb(194,227,252)', // blue
	];
	public palette = {
		grey: 'rgb(198,199,192)', // grey
		green: 'rgb(222,250,214)', // green
		blue: 'rgb(194,227,252)', // blue
		peach: 'rgb(252,224,204)', // peach
		pink: 'rgb(248,204,228)', // pink
		lightBlue: 'rgb(215,251,247)', // light blue
		yellow: 'rgb(250,230,176)', // yellow
		white: 'rgb(254,254,245)', // white-cream
	};

	public lines: number = 48;
	public URLManager;
	private activeTouches: any = {};
	private activeScaleListItem: Element;
	private activeScaleClassName: string =  'scale-list-item--active';
	private octavesToDisplay = 5;
	private keyCanvas: HTMLCanvasElement;



	init() {
		console.log('INITIALIZED APP');

		// left menu width has a max width of 350 or 1/3 window width
		const leftMenuWidth = (window.innerWidth / 3 <= 350) ?  window.innerWidth / 3 : 350;

		this.canvas = CanvasUtils.createCanvas(window.innerWidth, window.innerHeight);
		this.keyCanvas = CanvasUtils.createCanvas(leftMenuWidth, window.innerHeight / 2);
		document.getElementById('app').appendChild(this.canvas);
		// document.getElementById('keyLetters').appendChild(this.keyCanvas);

		this.appendScaleChoices();


		// Inititalize URL manager
		this.URLManager = new URL();

		// get scale from URL query string or the default scale
		const scaleName = this.URLManager.query.s || 'xenakis_chrom';
		document.getElementsByClassName(scaleName)[0].classList.add(this.activeScaleClassName);
		this.activeScaleListItem = document.getElementsByClassName(scaleName)[0];
		// on resize event listener
		window.addEventListener('resize', this.handleResize.bind(this));

		// initialize audio
		this.audio = new Audio();

		// set the current scale and draw
		this.updateScale(Scales[scaleName].frequencies);

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

	appendScaleChoices() {
		let scaleListContainer = document.getElementById('scaleListContainer');

		// append list items to the container
		let listItems = '';
		for (let key in Scales) {
			if (key) {
        listItems += `<li class="scale-list-item ${key}" data-scale="${key}">${key}</li>`;
		  }
    }
		scaleListContainer.innerHTML = listItems;
		scaleListContainer.addEventListener('click', this.handleScaleChange.bind(this), false);
	}

	handleScaleChange(e): void {
		if (e.target !== e.currentTarget) {
			let scaleId = e.target.dataset.scale;
			console.log('changed to:', scaleId);

			this.activeScaleListItem.classList.remove(this.activeScaleClassName);
			this.activeScaleListItem = e.target;
			this.activeScaleListItem.classList.add(this.activeScaleClassName);

			this.updateScale(Scales[scaleId].frequencies);
			this.URLManager.query.s = scaleId;
			UpdateURL(`?${this.URLManager.query}`);
		}
		e.stopPropagation();
	}

	handleResize() {
		const leftMenuWidth = (window.innerWidth / 3 <= 350) ?  window.innerWidth / 3 : 350;
		CanvasUtils.canvasResize(this.canvas, window.innerWidth, window.innerHeight);
		CanvasUtils.canvasResize(this.keyCanvas, leftMenuWidth, window.innerHeight / 2);
		this.draw();
	}

	updateScale(scale) {
		const len = scale.length;
		const p5 = getPerfectFifthIndex(scale);
		const p4 = getPerfectFourthIndex(scale);

		let colors = [];
		colors[0] = this.palette.grey;
		colors[p5] = this.palette.pink;
		colors[p4] = this.palette.peach;
		for (let i = 0; i < len; i++) {
			if (!colors[i]) {
				colors[i] = (i % 2 === 0) ? this.palette.green : this.palette.blue;
			}
		}
		console.log(colors);

		this.lines = (len * this.octavesToDisplay) + 1; // add 1 to include top octave note

		this.colors = colors;
		this.audio.scale = scale;
		this.draw();
	}


	draw(): void {
		// this._DrawAnimationFrame = requestAnimationFrame(this.draw.bind(this));
		console.log('DRAW');

		const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
		const w: number = this.canvas.width / this.pixelRatio;
		const h: number = this.canvas.height / this.pixelRatio;
		const {colors, lines} = this;
		const lineWidth = w / lines;

		console.log(this.audio.scale.length);

		ctx.clearRect(0, 0, w, h);

		// DRAW THE LINES
		for (let i = 0; i < lines; i++) {
			ctx.fillStyle = getItemFromArrayPool(i, colors);
			ctx.fillRect(lineWidth * i, 0, lineWidth + 1, h); // +1 is for overlap to avoid nasty small white lines
		}
	}

	onPointerDown(e, id: number): void {
		const index = this.touches.Add(id);
		const pos = CanvasUtils.getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
		const noteIndex = this._getNoteIndexFromPosition(pos.x);

		// store the current noteIndex in activeTouches
		this.activeTouches[id] = noteIndex;
		// Play the note
		this.audio.NoteOn(noteIndex, pos.y, index);

		// TODO flash the line triggered played

	}

	onPointerUp(e, id: number): void {
		// delete this noteIndex from active touches
		delete this.activeTouches[id];
	}

	onPointerMove(e, id: number): void {
		const index = this.touches.GetIndexFromIdentifier(id);
		const {x, y} = CanvasUtils.getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
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

	private _getNoteIndexFromPosition(x: number): number {
		return Math.floor(x / (100 / this.lines));
	}

}

export default App;



