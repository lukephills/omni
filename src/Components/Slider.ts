import MultiTouch from './MultiTouch';
import {
  getPixelRatio,
  getCoordinateFromEventAsPercentageWithinElement,
  canvasRenderAtPixelRatio
} from '../Utils/CanvasUtils';


class Slider {

	_value = 0.5;
  buttonSize = 30;
  buttonColor = '#FF6969';
  sliderColor = '#2F6969';

  // The value that element has been zoom by using css
  zoom = 1;

  onChange: (value: number) => void = () => {}
  private pixelRatio: number = getPixelRatio();


	constructor(private canvas: HTMLCanvasElement){

    canvasRenderAtPixelRatio(this.canvas);

    new MultiTouch(this.canvas, {
			onMouseDown: this.onPointerDown.bind(this),
			onMouseUp: this.onPointerUp.bind(this),
			onMouseMove: this.onPointerMove.bind(this),
			onTouchStart: this.onPointerDown.bind(this),
			onTouchEnd: this.onPointerUp.bind(this),
			onTouchMove: this.onPointerMove.bind(this),
		});

    this.draw();
	}


	private draw() {
	  const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

		const w: number = this.canvas.width / this.pixelRatio;
		const h: number = this.canvas.height / this.pixelRatio;
		const cy = h/2;
		const sliderLength = (w/100) * this._value;

		// Clear everything
		ctx.clearRect(0, 0, w, h);

		// Slider bar
		ctx.fillStyle = this.sliderColor;
		ctx.fillRect(0, 0, sliderLength, h);

		// Diamond
		const diamondSize = 4;
		ctx.moveTo(sliderLength, h/2);
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.moveTo(sliderLength, cy + diamondSize);
		ctx.lineTo(sliderLength + diamondSize, cy);
		ctx.lineTo(sliderLength, cy - diamondSize);
		ctx.lineTo(sliderLength - diamondSize, cy);
		ctx.closePath();
		ctx.fill();
	}

  render() {
    this.draw();
    this.onChange(this.value)
  }

  set value(val) {
    this._value = val;
    this.render();
  }

  get value() {
    return this._value;
  }


	//TODO: add slider step functionality
	// private calculateStep(x: number) {
	// 	let step = this.props.step ? this.props.step : 0;
	// 	x = Math.ceil(x / step) * step;
	// 	return x;
	// }

	onPointerDown(e, id) {
    const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas, this.zoom);
		this.value = (e.shiftKey)? pos.x / 2 : pos.x;
	}

	onPointerUp(e, id) {
		const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas, this.zoom);
		this.value = (e.shiftKey)? pos.x / 2 : pos.x;
	}

	onPointerMove(e, id) {
		const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas, this.zoom);
		this.value = (e.shiftKey)? pos.x / 2 : pos.x;
	}



}

export default Slider;
