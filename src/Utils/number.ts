export const round = (n: number, dp: number) => +((<any>Math.round)(n + 'e+'+dp)  + 'e-'+dp);

export const multiply = (n: number) => n2 => n * n2;

export const doubled = (n: number) => multiply(n)(2);

export const plus = (x: number) => (y: number) => x + y;

export const minus = (x: number) => (y: number) => y - x;

export const decrement = minus(1);

export const increment = plus(1);

export const numberWithinRange = (num: number, min: number, max: number) => {
	num = num > max ? max : num;
	num = num < min ? min : num;
	return num;
}

/**
 * used for incrementing and decrementing within a range only
 * for forcing a number withing a range use `numberWithinRange`
 */
const _withinBounds = (num: number, min: number, max: number) => {
  if (num > max) {
    num = min;
  } else if (num < min) {
    num = max
  }
  return num;
}

export const incrementWithinRange = (num: number, min: number, max: number) => {
  return _withinBounds(increment(num), min, max);
}

export const decrementWithinRange = (num: number, min: number, max: number) => {
  return _withinBounds(decrement(num), min, max);
}

export const incrementIfWithinRange = (num: number, max: number) => {
  if (num >= max) return max;
  return increment(num);
}

export const decrementIfWithinRange = (num: number, min: number) => {
  if (num <= min) return min;
  return decrement(num);
}

export const randomIntBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)