export const MOUSE_ID = -999;

export interface MultiTouchCallbacks {
	onMouseDown(event, id): void;
	onMouseUp(event, id): void;
	onMouseMove(event, id): void;
	onTouchStart(event, id): void;
	onTouchEnd(event, id): void;
	onTouchMove(event, id): void;
}

class MultiTouch {

	public callbacks: MultiTouchCallbacks;
	private _pointers;

	constructor(el, callbacks: MultiTouchCallbacks) {
		this.callbacks = callbacks;
		this._pointers = {};
		
		// Bind listeners
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);

		el.addEventListener('mousedown', this.onMouseDown);
		el.addEventListener('touchstart', this.onTouchStart.bind(this));
		el.addEventListener('touchend', this.onTouchEnd.bind(this));
		el.addEventListener('touchmove', this.onTouchMove.bind(this));
	}

	onMouseDown(e){
		window.addEventListener('mouseup', this.onMouseUp);
		window.addEventListener('mousemove', this.onMouseMove);

		// save the pointer
		this._pointers[MOUSE_ID] = true;

		if (this.callbacks.onMouseDown) {
			this.callbacks.onMouseDown(e, MOUSE_ID);
		}
	}

	onTouchStart(e: TouchEvent){
		e.preventDefault();

		const touches = e.changedTouches;
		for (let i = 0; i < touches.length; i++) {
			const touch = touches[i];
			this._pointers[touch.identifier] = true;
			if (this.callbacks.onTouchStart) {
				this.callbacks.onTouchStart(touch, touch.identifier);
			}
		}
	}

	onMouseUp(e: MouseEvent) {
		e.preventDefault();
		// if this pointer exists
		if (this._pointers[MOUSE_ID]) {
			if (this.callbacks.onMouseUp){
				this.callbacks.onMouseUp(e, MOUSE_ID);
			}
			delete this._pointers[MOUSE_ID];
		}
		
		window.removeEventListener('mouseup', this.onMouseUp)
		window.removeEventListener('mousemove', this.onMouseMove)
	}

	onTouchEnd(e: TouchEvent) {
		e.preventDefault();
		const touches = e.changedTouches;
		for (let i = 0; i < touches.length; i++) {
			const touch = touches[i];
			if (this.callbacks.onTouchEnd) {
				this.callbacks.onTouchEnd(touch, touch.identifier);
			}
			delete this._pointers[touch.identifier];
		}
	}

	onMouseMove(e: MouseEvent) {
		e.preventDefault();

		// if this pointer is down
		if (this._pointers[MOUSE_ID]) {
			if (this.callbacks.onMouseMove) {
				this.callbacks.onMouseMove(e, MOUSE_ID);
			}
		}
	}

	onTouchMove(e: TouchEvent) {
		e.preventDefault();
		const touches = e.changedTouches;
		for (let i = 0; i < touches.length; i++) {
			const touch: any = touches[i];
			if (this._pointers[touch.identifier]) {
				// if (isTouchInBounds && this._pointers[touch.identifier]) {
				if (this.callbacks.onTouchMove) {
					this.callbacks.onTouchMove(touch, touch.identifier);
				}
			}
		}
	}
}

export default MultiTouch;