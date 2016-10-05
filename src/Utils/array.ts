/**
 * Removes duplicate numbers from an array
 * @param a
 * @returns {number[]}
 */
export function uniq(a: number[]): number[] {
	let seen = {};
	return a.filter(function(item) {
		return seen.hasOwnProperty(item) ? false : (seen[item] = true);
	});
}


/**
 * Takes an array index and an array length and returns the amount of loops through the array
 * // Example
 * let arr = [1, 5, 12]
 * getIteration(2, arr.length); // 0
 * getIteration(5, arr.length); // 1
 * getIteration(9, arr.length); // 3
 * @param index
 * @param length - array length
 * @returns {number}
 */
export function getIteration(index: number, length: number): number {
	return Math.floor(index / length);
}


/**
 * Returns the index from an array using the position
 * Example
 * let arr = [1, 5, 12]
 * getIndexFromArray(1, arr); // 1
 * getIndexFromArray(3); // 0 - Because there are only 3 items in the array we loop round and the index is 0
 * getIndexFromArray(5); // 2 - Loop round twice and end on 12 which is the index 2
 * @param position
 * @param array
 * @returns {number}
 */
export function getIndexFromArray(position: number, array: any[]): number {
	return position % array.length;
}


/**
 * Gets the item from an array pool. If item number is higher than pool length it loops round.
 * @param pool: T<array>
 * @param item: number
 * @returns {T}
 */
export function getItemFromArrayPool<T>(item: number, pool: T[]): T {
	return pool[getIndexFromArray(item, pool)];
}


/**
 * Converts a nodelist into an array
 */
export function nodeListToArray(els: NodeList): Element[] {
  if (els.length) {
    return Array.prototype.slice.call(els);
  } else {
    return [];
  }
}