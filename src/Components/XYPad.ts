import MultiTouch from './MultiTouch';
import {getPixelRatio, getCoordinateFromEventAsPercentageWithinElement, numberWithinRange} from '../Utils/CanvasUtils';
import {canvasRenderAtPixelRatio} from '../Utils/CanvasUtils';

class XYPad {

  x = 0.5;
  y = 0.3;
  buttonSize = 10;
  buttonColor = '#FF6969';
  onChange: (x, y) => void = () => {}
  private pixelRatio: number = getPixelRatio();

  constructor(private canvas: HTMLCanvasElement) {

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

  draw() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

		const w: number = this.canvas.width / this.pixelRatio;
		const h: number = this.canvas.height / this.pixelRatio;
    ctx.clearRect(0, 0, w, h);

    const buttonSize = this.buttonSize;
    const x =  numberWithinRange(w * this.x, 0, w - buttonSize)
    const y =  numberWithinRange(h * (1- this.y), 0, h - buttonSize)



    ctx.fillStyle = this.buttonColor;
    ctx.beginPath();
    ctx.moveTo(x + buttonSize/2, y);
    ctx.lineTo(x + buttonSize, y + buttonSize/2);
    ctx.lineTo(x + buttonSize/2, y + buttonSize);
    ctx.lineTo(x, y + buttonSize/2);
    // ctx.lineTo(x + buttonSize/2, y);
    ctx.closePath();
    ctx.fill();


    // ctx.fillRect(x, y, buttonSize, buttonSize);

    this.onChange(this.x, this.y)
  }


  onPointerDown(e, id) {
    const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
    this.x = pos.x;
    this.y = pos.y;
    this.draw()
  }

  onPointerUp(e, id) {
   const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
    this.x = pos.x;
    this.y = pos.y;
    this.draw()
  }

  onPointerMove(e, id) {
    const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
    this.x = pos.x;
    this.y = pos.y;
    this.draw()
  }

  onResize() {
    canvasRenderAtPixelRatio(this.canvas);
  }

}

export default XYPad

const withinBounds = (n: number) => {
  return n;
}