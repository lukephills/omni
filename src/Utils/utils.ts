const Map = require('es6-map');

// Empty function
export const noOp: any = () => {};

export class IdentifierIndexMap {
	private identifiers: Map<number, number> = new Map();

	public GetIndexFromIdentifier(identifier: number): number {
		return this.identifiers.get(identifier) || 0;
	}

	public Remove(identifier: number): void {
		this.identifiers.delete(identifier);
	}

	public Add(identifier: number): number {
		let num: number = 0;
		// loop through values stored
		for (let value of this.identifiers.values() as any) {
			if (value === num) {
				num++;
			}
		}
		this.identifiers.set(identifier, num);
		return num;
	}
}


export function isCordovaIOS(): boolean {
	return !!(window as any).cordova && (window as any).cordova.platformId === 'ios';
}


export function throttle(callback, wait, immediate = false) {
  let timeout = null
  let initialCall = true

  return function() {
    const callNow = immediate && initialCall
    const next = () => {
      callback.apply(this, arguments)
      timeout = null
    }

    if (callNow) {
      initialCall = false
      next()
    }

    if (!timeout) {
      timeout = setTimeout(next, wait)
    }
  }
}
