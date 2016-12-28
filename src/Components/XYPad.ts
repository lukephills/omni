import MultiTouch from './MultiTouch';
import {getPixelRatio, getCoordinateFromEventAsPercentageWithinElement} from '../Utils/CanvasUtils';
import {numberWithinRange} from '../Utils/number';
import {canvasRenderAtPixelRatio} from '../Utils/CanvasUtils';

class XYPad {

  x = 0.5;
  y = 0.3;
  buttonSize = 30;
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

  set xPos(val) {
    this.x = val;
    this.render();
  }

  set yPos(val) {
    this.y = val;
    this.render();
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) return;

		const w: number = this.canvas.width / this.pixelRatio;
		const h: number = this.canvas.height / this.pixelRatio;
    ctx.clearRect(0, 0, w, h);

    const buttonSize = this.buttonSize;
    const buttonSizeHalved = buttonSize/2;
    const x =  numberWithinRange(w * this.x, buttonSizeHalved, w - buttonSizeHalved)
    const y =  numberWithinRange(h * (1- this.y), buttonSizeHalved, h - buttonSizeHalved)

    ctx.fillStyle = this.buttonColor;

    ctx.beginPath();
    ctx.moveTo(x, y - buttonSizeHalved);
    ctx.lineTo(x + buttonSizeHalved, y);
    ctx.lineTo(x, y + buttonSizeHalved);
    ctx.lineTo(x - buttonSizeHalved, y);
    ctx.closePath();
    ctx.fill();
  }

  render() {
    this.draw();
    this.onChange(this.x, this.y)
  }

  onPointerDown(e, id) {
    const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
    if (!e.shiftKey) this.x = pos.x;
    if (!e.metaKey) this.y = pos.y;
    this.render()
  }

  onPointerUp(e, id) {
   const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
    if (!e.shiftKey) this.x = pos.x;
    if (!e.metaKey) this.y = pos.y;
    this.render()
  }

  onPointerMove(e: MouseEvent, id) {
    const pos = getCoordinateFromEventAsPercentageWithinElement(e, this.canvas);
    if (!e.shiftKey) this.x = pos.x;
    if (!e.metaKey) this.y = pos.y;
    this.render()
  }

  onResize() {
    canvasRenderAtPixelRatio(this.canvas);
  }

}

export default XYPad;