import {numberWithinRange} from './number'

/**
 * Gets the devices pixel ratio
 * @type {number}
 */
export function getPixelRatio(): number {
	return window.devicePixelRatio;
}

/**
 * Resize the canvas using the devices pixel ratio
 * @param canvas
 * @param width
 * @param height
 * @returns {HTMLCanvasElement}
 */
export function canvasResize(
    canvas: HTMLCanvasElement,
    width: number = canvas.clientWidth,
    height: number = canvas.clientHeight
  ): HTMLCanvasElement {

	const ratio: number = getPixelRatio();
	canvas.width = width * ratio;
	canvas.height = height * ratio;
	canvas.style.width = width + 'px';
	canvas.style.height = height + 'px';

  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
	return canvas;
}

/**
 * Resets the size of the canvas based on the devices pixel ratio
 */
export function canvasRenderAtPixelRatio(
    canvas: HTMLCanvasElement,
    width: number = canvas.clientWidth,
    height: number = canvas.clientHeight
  ): HTMLCanvasElement {

  const ratio: number = getPixelRatio();
	canvas.width = width * ratio;
	canvas.height = height * ratio;
  const ctx = canvas.getContext('2d');
  if (ctx) {
	  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
	return canvas;
}

/**
 * Creates a device pixel ratio canvas
 * @param width
 * @param height
 * @returns {HTMLCanvasElement}
 */
export function createCanvas(width: number, height: number): HTMLCanvasElement {
	const canvas: HTMLCanvasElement = document.createElement('canvas');
	return canvasResize(canvas, width, height);
}



export interface Coordinate {
	x: number;
	y: number;
}

export interface Area {
	x: number;
	y: number;
	width: number;
	height: number;
}





/**
 * Takes a coordinate and forces it to be within an area
 * @param coordinate
 * @param area
 * @returns {Coordinate}
 */
export function coordinateWithinArea(coordinate: Coordinate, area: Area):  Coordinate {
	return {
		x: numberWithinRange(coordinate.x, area.x, area.x + area.width),
		y: numberWithinRange(coordinate.y, area.y, area.y + area.height),
	};
}

/**
 * Get an Area from a dom element
 * @param el: Element
 * @returns {{x: number, y: number, width: number, height: number}}: Area
 */
export function getElementArea(el: HTMLElement): Area {
  const boundingClientRect = el.getBoundingClientRect();
	return {
		x: boundingClientRect.left,
		y: boundingClientRect.top,
		width: boundingClientRect.width,
		height: boundingClientRect.height,
	}
}

export function getCoordinateFromPointerEvent(e: MouseEvent | Touch): Coordinate {
	return {
		x: e.pageX,
		y: e.pageY,
	}
}

export function getPositionAsPercentageInArea(coordinate: Coordinate, area: Area): Coordinate {
	return {
		x: (coordinate.x - area.x) / area.width,
		y: 1 - ((coordinate.y - area.y) / area.height),
	}
}

//TODO: does this need rounding?
export function getCoordinateFromEventAsPercentageWithinElement(e: MouseEvent | Touch, el: HTMLElement): Coordinate {
	const area = getElementArea(el);
	return getPositionAsPercentageInArea(coordinateWithinArea(getCoordinateFromPointerEvent(e),area),area);
}


//This was used previously to getCoordinateFromEventAsPercentageWithinElement
// export function getPercentagePosition(e: any): Coordinate {
// 	const _round = require('lodash/round');
// 	let x = numberWithinRange(_round(((e.pageX - e.target.offsetLeft) / e.target.offsetWidth) * 100, 2), 0, 100);
// 	let y = numberWithinRange(_round((100 - ((e.pageY - e.target.offsetTop) / e.target.offsetHeight) * 100), 2), 0, 100);
// 	return {x, y}
// }


export function getPercentageBetweenRange(x: number, min: number, max: number) {
	return (100 * x)/(max - min);
}

export function getValueFromPercentageRange(x: number, min: number, max: number) {
	return ((max - min)/100) * x;
}

export function hitTest(x: number, y: number, targetX: number, targetY: number, targetWidth: number, targetHeight: number) {
	return (
		x >= targetX &&
		x <= targetX + targetWidth &&
		y >= targetY &&
		y <= targetY + targetHeight
	);
}