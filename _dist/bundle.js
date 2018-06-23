webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Omni", function() { return Omni; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_normalize_css__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Styles_styles_scss__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Styles_styles_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Styles_styles_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_app__ = __webpack_require__(62);



let Omni = new __WEBPACK_IMPORTED_MODULE_2__Components_app__["a" /* default */]();
const startApp = () => {
    Omni.init();
    document.body.classList.add('app-active');
};
startApp();


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = uniq;
/* harmony export (immutable) */ __webpack_exports__["b"] = getIteration;
/* harmony export (immutable) */ __webpack_exports__["a"] = getIndexFromArray;
/* unused harmony export getItemFromArrayPool */
/* harmony export (immutable) */ __webpack_exports__["c"] = nodeListToArray;
function uniq(a) {
    let seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
function getIteration(index, length) {
    return Math.floor(index / length);
}
function getIndexFromArray(position, array) {
    return position % array.length;
}
function getItemFromArrayPool(item, pool) {
    return pool[getIndexFromArray(item, pool)];
}
function nodeListToArray(els) {
    if (els.length) {
        return Array.prototype.slice.call(els);
    }
    else {
        return [];
    }
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const round = (n, dp) => +(Math.round(n + 'e+' + dp) + 'e-' + dp);
/* harmony export (immutable) */ __webpack_exports__["g"] = round;

const multiply = (n) => n2 => n * n2;
/* unused harmony export multiply */

const doubled = (n) => multiply(n)(2);
/* harmony export (immutable) */ __webpack_exports__["c"] = doubled;

const plus = (x) => (y) => x + y;
/* unused harmony export plus */

const minus = (x) => (y) => y - x;
/* unused harmony export minus */

const decrement = minus(1);
/* unused harmony export decrement */

const increment = plus(1);
/* unused harmony export increment */

const numberWithinRange = (num, min, max) => {
    num = num > max ? max : num;
    num = num < min ? min : num;
    return num;
};
/* harmony export (immutable) */ __webpack_exports__["f"] = numberWithinRange;

const _withinBounds = (num, min, max) => {
    if (num > max) {
        num = min;
    }
    else if (num < min) {
        num = max;
    }
    return num;
};
const incrementWithinRange = (num, min, max) => {
    return _withinBounds(increment(num), min, max);
};
/* harmony export (immutable) */ __webpack_exports__["e"] = incrementWithinRange;

const decrementWithinRange = (num, min, max) => {
    return _withinBounds(decrement(num), min, max);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = decrementWithinRange;

const incrementIfWithinRange = (num, max) => {
    if (num >= max)
        return max;
    return increment(num);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = incrementIfWithinRange;

const decrementIfWithinRange = (num, min) => {
    if (num <= min)
        return min;
    return decrement(num);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = decrementIfWithinRange;

const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
/* unused harmony export randomIntBetween */



/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = scaleFromRoot12Idx;
/* unused harmony export scaleFromRoot */
/* unused harmony export scaleFromRoots */
/* unused harmony export combineScales */
/* harmony export (immutable) */ __webpack_exports__["b"] = getFrequencyFromNoteIndexInScale;
/* unused harmony export getFrequency */
/* unused harmony export getDegree */
/* harmony export (immutable) */ __webpack_exports__["a"] = getDegreeWithin12;
/* harmony export (immutable) */ __webpack_exports__["c"] = getFrequencyTET;
/* unused harmony export getFrequencyFromRootAndOctave */
/* unused harmony export getOvertones */
/* unused harmony export getUndertones */
/* unused harmony export getRatio */
/* harmony export (immutable) */ __webpack_exports__["d"] = getPerfectFifthIndex;
/* unused harmony export getPerfectFourthIndex */
/* unused harmony export getNoteIndexWithRatio */
/* unused harmony export isNumberCloseBy */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array__ = __webpack_require__(5);

const equalTempRatio12 = 1.0594645048603144;
/* unused harmony export equalTempRatio12 */

const middleC = 261.6255653006;
/* unused harmony export middleC */

function scaleFromRoot12Idx(scale, rootIdx, octave = 0) {
    return scaleFromRoot(scale, getFrequencyTET(rootIdx, getFrequencyFromRootAndOctave(middleC, octave)));
}
function scaleFromRoot(scale, root) {
    const multi = root / scale[0];
    let newScale = [];
    for (let i = 0, len = scale.length; i < len; i++) {
        newScale[i] = +(scale[i] * multi).toFixed(4);
    }
    return newScale;
}
function scaleFromRoots(scale, roots) {
    const newScales = [];
    for (let i = 0, l = roots.length; i < l; i++) {
        newScales[i] = scaleFromRoot(scale, roots[i]);
    }
    return combineScales(newScales);
}
function combineScales(array) {
    return Object(__WEBPACK_IMPORTED_MODULE_0__array__["d" /* uniq */])([0].concat(...array).sort((a, b) => a - b));
}
function getFrequencyFromNoteIndexInScale(noteIndex, scale, octaveModifier = 0) {
    let note = scale[Object(__WEBPACK_IMPORTED_MODULE_0__array__["a" /* getIndexFromArray */])(noteIndex, scale)];
    let octave = Object(__WEBPACK_IMPORTED_MODULE_0__array__["b" /* getIteration */])(noteIndex, scale.length) + octaveModifier;
    return getFrequencyFromRootAndOctave(note, octave);
}
function getFrequency(root, degree, ratio = equalTempRatio12) {
    return root * Math.pow(ratio, degree);
}
function getDegree(frequency, root, ratio = equalTempRatio12) {
    return Math.log(frequency / root) / Math.log(ratio);
}
function getDegreeWithin12(frequency, root = middleC) {
    return getDegree(frequency, root) % 12;
}
function getFrequencyTET(degree, root = middleC) {
    return getFrequency(root, degree, equalTempRatio12);
}
function getFrequencyFromRootAndOctave(root, octave) {
    return getFrequency(root, octave, 2);
}
function getOvertones(freq, amount) {
    let harmonics = [];
    for (let i = 0; i < amount; i++) {
        harmonics[i] = freq * (i + 2);
    }
    return harmonics;
}
function getUndertones(freq, amount) {
    let subharmonics = [];
    for (let i = 0; i < amount; i++) {
        subharmonics[i] = freq / (i + 2);
    }
    return subharmonics;
}
function getRatio(note1, note2) {
    return note1 / note2;
}
const justInnotationRatios = [1, 25 / 24, 9 / 8, 6 / 5, 5 / 4, 4 / 3, 45 / 32, 3 / 2, 8 / 5, 5 / 3, 9 / 5, 15 / 8];
/* unused harmony export justInnotationRatios */

function getPerfectFifthIndex(scale, accuracy = 1.01) {
    return getNoteIndexWithRatio(scale, justInnotationRatios[7], accuracy);
}
function getPerfectFourthIndex(scale, accuracy = 1.01) {
    return getNoteIndexWithRatio(scale, justInnotationRatios[5], accuracy);
}
function getNoteIndexWithRatio(scale, ratio, accuracy = 1.01) {
    let targetFreq = scale[0] * ratio;
    let diff = scale[0] - (scale[0] / accuracy);
    for (let i = 1, len = scale.length; i < len; i++) {
        if (isNumberCloseBy(scale[i], targetFreq, diff)) {
            return i;
        }
    }
    return -1;
}
function isNumberCloseBy(num, num2, maxDist) {
    return ((num + maxDist) > num2) && ((num - maxDist) <= num2);
}


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_webAudioDefinitionOverrides__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_webAudioDefinitionOverrides___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__helpers_webAudioDefinitionOverrides__);

AudioNode.prototype._nativeConnect = AudioNode.prototype.connect;
AudioNode.prototype.connect = function (B, outNum, inNum) {
    if (B.input) {
        this.connect(B.input, outNum, inNum);
    }
    else {
        try {
            if (B instanceof AudioNode) {
                this._nativeConnect(B, outNum, inNum);
            }
            else {
                this._nativeConnect(B, outNum);
            }
        }
        catch (e) {
            throw new Error("error connecting to node: " + e);
        }
    }
};
class AudioNodeBase {
    constructor(ctx) {
        this.ctx = ctx;
        this.input = this.ctx.createGain();
        this.output = this.ctx.createGain();
    }
    connect(destination, output, input) {
        this.output.connect.apply(this.output, arguments);
    }
    disconnect(destination, output, input) {
        this.output.disconnect.apply(this.output, arguments);
    }
    get volume() {
        return this.output.gain.value;
    }
    set volume(level) {
        this.output.gain.value = level;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (AudioNodeBase);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const connectSeries = (...nodes) => {
    const len = nodes.length;
    if (len > 0) {
        for (let i = 0; i < len - 1; i++) {
            nodes[i].connect(nodes[i + 1]);
        }
    }
    return nodes;
};
/* harmony export (immutable) */ __webpack_exports__["c"] = connectSeries;

const connectOneToMany = (firstNode, ...nodes) => {
    const len = nodes.length;
    if (len > 0) {
        for (let i = 0; i < len; i++) {
            firstNode.connect(nodes[i]);
        }
    }
    return firstNode;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = connectOneToMany;

const connectManyToOne = (lastNode, ...nodes) => {
    const len = nodes.length;
    if (len > 0) {
        for (let i = 0; i < len; i++) {
            nodes[i].connect(lastNode);
        }
    }
    return lastNode;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = connectManyToOne;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = getPixelRatio;
/* unused harmony export canvasResize */
/* harmony export (immutable) */ __webpack_exports__["a"] = canvasRenderAtPixelRatio;
/* unused harmony export createCanvas */
/* unused harmony export coordinateWithinArea */
/* unused harmony export getElementArea */
/* unused harmony export getCoordinateFromPointerEvent */
/* unused harmony export getPositionAsPercentageInArea */
/* harmony export (immutable) */ __webpack_exports__["b"] = getCoordinateFromEventAsPercentageWithinElement;
/* unused harmony export getPercentageBetweenRange */
/* unused harmony export getValueFromPercentageRange */
/* unused harmony export hitTest */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number__ = __webpack_require__(6);

function getPixelRatio() {
    return window.devicePixelRatio;
}
function canvasResize(canvas, width = canvas.clientWidth, height = canvas.clientHeight) {
    const ratio = getPixelRatio();
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
function canvasRenderAtPixelRatio(canvas, width = canvas.clientWidth, height = canvas.clientHeight) {
    const ratio = getPixelRatio();
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    return canvas;
}
function createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    return canvasResize(canvas, width, height);
}
function coordinateWithinArea(coordinate, area) {
    return {
        x: Object(__WEBPACK_IMPORTED_MODULE_0__number__["f" /* numberWithinRange */])(coordinate.x, area.x, area.x + area.width),
        y: Object(__WEBPACK_IMPORTED_MODULE_0__number__["f" /* numberWithinRange */])(coordinate.y, area.y, area.y + area.height),
    };
}
function getElementArea(el, zoom = 1) {
    const boundingClientRect = el.getBoundingClientRect();
    return {
        x: boundingClientRect.left * zoom,
        y: boundingClientRect.top * zoom,
        width: boundingClientRect.width * zoom,
        height: boundingClientRect.height * zoom,
    };
}
function getCoordinateFromPointerEvent(e) {
    return {
        x: e.pageX,
        y: e.pageY,
    };
}
function getPositionAsPercentageInArea(coordinate, area) {
    return {
        x: (coordinate.x - area.x) / area.width,
        y: 1 - ((coordinate.y - area.y) / area.height),
    };
}
function getCoordinateFromEventAsPercentageWithinElement(e, el, zoom = 1) {
    const area = getElementArea(el, zoom);
    return getPositionAsPercentageInArea(coordinateWithinArea(getCoordinateFromPointerEvent(e), area), area);
}
function getPercentageBetweenRange(x, min, max) {
    return (100 * x) / (max - min);
}
function getValueFromPercentageRange(x, min, max) {
    return ((max - min) / 100) * x;
}
function hitTest(x, y, targetX, targetY, targetWidth, targetHeight) {
    return (x >= targetX &&
        x <= targetX + targetWidth &&
        y >= targetY &&
        y <= targetY + targetHeight);
}


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg width='26px' height='4px' viewBox='0 0 26 4' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 40 (33762) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3ERemoveScaleFromFavs%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='UI' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='square'%3E %3Cg id='Version-6-fonts' transform='translate(-1137.000000, -244.000000)' stroke='%23555' stroke-width='1'%3E %3Cg id='Scale-Title' transform='translate(868.460620, 118.536311)'%3E %3Cg id='RemoveScaleFromFavs' transform='translate(270.539380, 116.150592)'%3E %3Cpath d='M0.223975004,11.7938137 L22.1735245,11.7938137' id='Line'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AudioNodeBase__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_number__ = __webpack_require__(6);


class AudioEffect extends __WEBPACK_IMPORTED_MODULE_0__AudioNodeBase__["a" /* default */] {
    constructor(context) {
        super(context);
        this.context = context;
        this.fxIn = this.ctx.createGain();
        this.fxOut = this.ctx.createGain();
        this._mix = 0.5;
        this._dry = this.context.createGain();
        this._wet = this.context.createGain();
        this.input.connect(this._dry);
        this.input.connect(this._wet);
        this._dry.connect(this.output);
        this._wet.connect(this.fxIn);
        this.fxOut.connect(this.output);
    }
    connect(destination, output, input) {
        this.output.connect.apply(this.output, arguments);
    }
    disconnect(destination, output, input) {
        this.output.disconnect.apply(this.output, arguments);
    }
    get mix() {
        return this._mix;
    }
    set mix(mix) {
        mix = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_number__["f" /* numberWithinRange */])(mix, 0, 1);
        this._mix = mix;
        this._dry.gain.value = Math.abs(mix - 1);
        this._wet.gain.value = mix;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (AudioEffect);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MOUSE_ID = -999;
/* unused harmony export MOUSE_ID */

class MultiTouch {
    constructor(el, callbacks) {
        this.callbacks = callbacks;
        this._pointers = {};
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        el.addEventListener('mousedown', this.onMouseDown);
        el.addEventListener('touchstart', this.onTouchStart.bind(this));
        el.addEventListener('touchend', this.onTouchEnd.bind(this));
        el.addEventListener('touchmove', this.onTouchMove.bind(this));
    }
    onMouseDown(e) {
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
        this._pointers[MOUSE_ID] = true;
        if (this.callbacks.onMouseDown) {
            this.callbacks.onMouseDown(e, MOUSE_ID);
        }
    }
    onTouchStart(e) {
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
    onMouseUp(e) {
        e.preventDefault();
        if (this._pointers[MOUSE_ID]) {
            if (this.callbacks.onMouseUp) {
                this.callbacks.onMouseUp(e, MOUSE_ID);
            }
            delete this._pointers[MOUSE_ID];
        }
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
    }
    onTouchEnd(e) {
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
    onMouseMove(e) {
        e.preventDefault();
        if (this._pointers[MOUSE_ID]) {
            if (this.callbacks.onMouseMove) {
                this.callbacks.onMouseMove(e, MOUSE_ID);
            }
        }
    }
    onTouchMove(e) {
        e.preventDefault();
        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];
            if (this._pointers[touch.identifier]) {
                if (this.callbacks.onTouchMove) {
                    this.callbacks.onTouchMove(touch, touch.identifier);
                }
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (MultiTouch);


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array__ = __webpack_require__(5);

const $ = (selector) => {
    return Object(__WEBPACK_IMPORTED_MODULE_0__array__["c" /* nodeListToArray */])(document.querySelectorAll(selector));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = $;



/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg width='26px' height='26px' viewBox='0 0 26 26' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 40 (33762) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EAddScaleToFavs%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='UI' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='square'%3E %3Cg id='Version-6-fonts' transform='translate(-1137.000000, -233.000000)' stroke='%23555' stroke-width='1'%3E %3Cg id='Scale-Title' transform='translate(868.460620, 118.536311)'%3E %3Cg id='AddScaleToFavs' transform='translate(270.539380, 116.150592)'%3E %3Cpath d='M0.223975004,11.7938137 L22.1735245,11.7938137' id='Line'%3E%3C/path%3E %3Cpath d='M11.6467,22.3731086 L11.6467,0.664547794' id='Line'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AudioNodeBase__ = __webpack_require__(10);

class ADSR extends __WEBPACK_IMPORTED_MODULE_0__AudioNodeBase__["a" /* default */] {
    constructor(ctx) {
        super(ctx);
        this.ctx = ctx;
        this.attack = 0.01;
        this.release = 0.01;
        this.velocity = 1;
        this._minLevel = 0.00001;
        this.input.gain.value = this._minLevel;
        this.input.connect(this.output);
    }
    triggerAttack(time = this.ctx.currentTime, velocity = this.velocity, attack = this.attack) {
        this.input.gain.cancelScheduledValues(time);
        this.input.gain.setValueAtTime(this.input.gain.value, time);
        this.input.gain.exponentialRampToValueAtTime(velocity, time + attack);
    }
    ;
    triggerAttackRelease(time = this.ctx.currentTime, velocity = this.velocity, attack = this.attack, release = this.release) {
        this.input.gain.cancelScheduledValues(time);
        this.input.gain.setValueAtTime(this._minLevel, time);
        this.input.gain.exponentialRampToValueAtTime(velocity, time + attack);
        this.input.gain.exponentialRampToValueAtTime(this._minLevel, time + attack + release);
    }
    triggerRelease(time = this.ctx.currentTime, release = this.release) {
        this.input.gain.cancelScheduledValues(time);
        this.input.gain.setValueAtTime(this.input.gain.value, time);
        this.input.gain.exponentialRampToValueAtTime(this._minLevel, time + release);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ADSR);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = createEmptyBuffer;
/* harmony export (immutable) */ __webpack_exports__["a"] = appendBuffer;
/* harmony export (immutable) */ __webpack_exports__["c"] = weakenBuffer;
function createEmptyBuffer(context) {
    const buffer = context.createBuffer(1, 1, 22050);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(context.currentTime);
    return source;
}
function appendBuffer(oldBuffer, newBuffer = oldBuffer, audioContext) {
    if (!oldBuffer && newBuffer) {
        return newBuffer;
    }
    else if (!newBuffer && oldBuffer) {
        return oldBuffer;
    }
    const numOfChannels = Math.min(oldBuffer.numberOfChannels, newBuffer.numberOfChannels);
    const joinedLength = (oldBuffer.length + newBuffer.length);
    const joinedBuffer = audioContext.createBuffer(numOfChannels, joinedLength, oldBuffer.sampleRate);
    for (var i = 0; i < numOfChannels; i++) {
        var channel = joinedBuffer.getChannelData(i);
        channel.set(oldBuffer.getChannelData(i), 0);
        channel.set(newBuffer.getChannelData(i), oldBuffer.length);
    }
    return joinedBuffer;
}
;
function weakenBuffer(buffer, volume, audioContext) {
    volume = Math.min(1, volume);
    const newBuffer = audioContext.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
    for (let channel = 0, c = buffer.numberOfChannels; channel < c; channel++) {
        let oldData = buffer.getChannelData(channel);
        let newData = newBuffer.getChannelData(channel);
        for (var j = 0; j < oldData.length; j++) {
            newData[j] = oldData[j] * volume;
        }
    }
    return newBuffer;
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module  is-audio-buffer
 */


module.exports = function isAudioBuffer (buffer) {
	//the guess is duck-typing
	return buffer != null
	&& typeof buffer.length === 'number'
	&& typeof buffer.sampleRate === 'number' //swims like AudioBuffer
	&& typeof buffer.getChannelData === 'function' //quacks like AudioBuffer
	// && buffer.copyToChannel
	// && buffer.copyFromChannel
	&& typeof buffer.duration === 'number'
};


/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 45 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(47);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(49);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(46)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./styles.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(50);
exports = module.exports = __webpack_require__(45)(false);
// imports


// module
exports.push([module.i, "*,:after,:before{box-sizing:border-box}body,html{height:100%}body{overflow:hidden}div.fixed-window{height:100%;overflow:hidden}body{font-family:Roboto,Times New Roman,Times,serif;font-size:15px;font-style:italic;background:#fff8dc;color:#797979;letter-spacing:.5px;line-height:1.5}@media only screen and (min-width:767px){body{font-size:17px}}h1,h2,h3{font-family:Roboto,Arial,Helvetica,sans-serif;font-weight:300;color:#ff6969}h1{font-size:36px;line-height:34px;letter-spacing:1.5px;margin:0;text-transform:capitalize}@media only screen and (min-width:767px){h1{font-size:44px;line-height:38px;letter-spacing:2.2px}}@media only screen and (min-width:992px){h1{font-size:54px;line-height:48px}}h1 .omni-first-letter{display:inline-block;width:27px;height:27px;border-radius:50%;background-color:#ffe4cb;margin-right:3px;transition:background-color 1s ease}@media only screen and (min-width:767px){h1 .omni-first-letter{width:33px;height:33px}}@media only screen and (min-width:992px){h1 .omni-first-letter{width:40px;height:40px}}h2{font-size:25px}h3,h4{font-size:17px}h5{font-size:14px;font-weight:400}a{color:#ff6969}ul{margin:0;padding:0;list-style-type:none}ul.list-inline li{display:inline-block}li{width:50px;height:50px}.abs{position:absolute}.rel{position:relative}.drone-selector,.drone-selector li,.fav-scale-selector,.fav-scale-selector li,.flex,.pitch-constellation-section,.pitch-constellation-section .letters,.record-play-group,.scale-selector.inline,.settings-carousel ul,.splash-overlay,.xy-pad-section,.xy-pad-section .letters{display:flex}.flex-column{flex-direction:column}.space-between{justify-content:space-between}.drone-selector li,.fav-scale-selector li,.justify-center,.pitch-constellation-section,.pitch-constellation-section .letters,.settings-carousel ul,.splash-overlay,.xy-pad-section,.xy-pad-section .letters{justify-content:center}.btn{cursor:pointer}.text-center{text-align:center}.col-xs-12{width:100%}.col-xs-5{width:41.66667%}.col-xs-2{width:16.66667%}@media only screen and (min-width:992px){.col-md-6{float:left;width:50%}}[class*=col-]{float:left}[class*=icon]{display:block;width:50px;height:50px;cursor:pointer}@media only screen and (max-width:767px){[class*=icon]{transform:scale(.8)}}.icon-arrow-down,.icon-arrow-left,.icon-arrow-right,.icon-arrow-up{background:url(" + escape(__webpack_require__(51)) + ") 50% no-repeat;background-size:contain}.icon-arrow-down{transform:rotate(180deg) scale(.8)}@media only screen and (min-width:992px){.icon-arrow-down{transform:rotate(180deg)}}.icon-arrow-left{transform:rotate(270deg) scale(.8)}@media only screen and (min-width:992px){.icon-arrow-left{transform:rotate(270deg)}}.icon-arrow-right{transform:rotate(90deg) scale(.8)}@media only screen and (min-width:992px){.icon-arrow-right{transform:rotate(90deg)}}.btn-play,.icon-play{background:url(" + escape(__webpack_require__(52)) + ") 50% no-repeat;background-size:contain}.btn-record,.icon-record{background:url(" + escape(__webpack_require__(53)) + ") 50% no-repeat;background-size:contain}.icon-menu{background:url(" + escape(__webpack_require__(54)) + ") 50% no-repeat;background-size:contain}.icon-close{background:url(" + escape(__webpack_require__(55)) + ") 50% no-repeat;background-size:contain}.icon-constellation{background:url(" + escape(__webpack_require__(56)) + ") 50% no-repeat;background-size:contain}.icon-xy{background:url(" + escape(__webpack_require__(57)) + ") 50% no-repeat;background-size:contain}.btn-record.is-playing,.btn-record.is-recording,.icon-overdub{background:url(" + escape(__webpack_require__(58)) + ") 50% no-repeat;background-size:contain}.btn-play.is-playing,.btn-record.is-overdubbing,.icon-stop{background:url(" + escape(__webpack_require__(59)) + ") 50% no-repeat;background-size:contain}.icon-plus{background:url(" + escape(__webpack_require__(24)) + ") 50% no-repeat;background-size:contain}.icon-minus{background:url(" + escape(__webpack_require__(15)) + ") 50% no-repeat;background-size:contain}.icon-fb{background:url(" + escape(__webpack_require__(60)) + ") 50% no-repeat;background-size:40%}.icon-tw{background:url(" + escape(__webpack_require__(61)) + ") 50% no-repeat;background-size:40%}.is-recording{background:url(" + escape(__webpack_require__(24)) + ") 50% no-repeat}.is-overdubbing{background:url(" + escape(__webpack_require__(15)) + ") 50% no-repeat}.is-playing{background:url(" + escape(__webpack_require__(15)) + ") 50% no-repeat}.container{padding:0}@media only screen and (min-width:767px){.container{padding:0 8px}}.main-view{height:100%;flex-direction:column}.nav{padding-left:10px;display:flex;justify-content:space-between;align-items:center;height:58px}@media only screen and (min-width:767px){.nav{height:83px;margin-bottom:30px}}.nav h1{font-style:normal;color:#ffb2a3}.scale-selector{display:flex;justify-content:space-between;align-items:center;height:100px}@media only screen and (max-height:450px) and (orientation:landscape){.scale-selector{height:80px}}@media only screen and (min-width:767px){.scale-selector{margin-bottom:20px;justify-content:center}}@media only screen and (min-width:992px){.scale-selector{margin-bottom:60px}}@media only screen and (min-width:1200px){.scale-selector{margin-bottom:70px;margin-top:-40px}}.scale-selector .scale-text-container{display:flex;align-items:center;justify-content:center;text-align:center}@media only screen and (min-width:767px){.scale-selector .scale-text-container{padding:0 60px 0 50px;width:640px}}@media only screen and (min-width:992px){.scale-selector .scale-text-container h1{line-height:54px;font-size:60px}}@media only screen and (min-width:1200px){.scale-selector .scale-text-container h1{line-height:72px;font-size:78px}}.scale-selector .arrows{position:absolute}.scale-selector .arrows span{margin:4px 0 7px -5px}.scale-selector.inline{height:auto;align-items:center;justify-content:space-between;max-width:600px;margin:0 auto 30px;text-align:center}.nav-buttons{display:flex;justify-content:flex-end}.nav-buttons .btn{margin:5px;background-size:60%}@media only screen and (min-width:992px){.nav-buttons .btn{margin:0 16px;background-size:60%}}@media only screen and (max-height:450px) and (orientation:landscape){.nav-buttons .btn{margin:0 8px}}.record-play-group{justify-content:center}.record-play-group li{margin:27px 15px}@media only screen and (max-width:480px){.record-play-group{position:absolute;right:0;flex-direction:column}}.middle-section{flex:4;flex-direction:row-reverse;align-items:center;padding-bottom:40px}@media only screen and (min-width:992px){.middle-section{padding-bottom:100px}}@media only screen and (max-height:450px) and (orientation:landscape){.middle-section{display:none}}.middle-section--2 .pitch-constellation-section{position:absolute;left:-100%}@media only screen and (min-width:992px){.middle-section--2 .pitch-constellation-section{position:static;left:auto}}.middle-section--2 .xy-pad-section{display:flex;position:static;left:auto}.middle-switch{display:block;position:absolute;right:0;bottom:0}@media only screen and (min-width:767px){.middle-switch{bottom:10px}}@media only screen and (min-width:992px){.middle-switch{display:none;bottom:auto}}.pitch-constellation-section,.xy-pad-section{flex:1;min-width:auto}.pitch-constellation-section .pitch-constellation,.pitch-constellation-section .xy-pad,.xy-pad-section .pitch-constellation,.xy-pad-section .xy-pad{width:200px;height:200px;position:relative}@media only screen and (min-width:767px){.pitch-constellation-section .pitch-constellation,.pitch-constellation-section .xy-pad,.xy-pad-section .pitch-constellation,.xy-pad-section .xy-pad{width:300px;height:300px}}@media only screen and (max-height:770px){.pitch-constellation-section .pitch-constellation,.pitch-constellation-section .xy-pad,.xy-pad-section .pitch-constellation,.xy-pad-section .xy-pad{width:200px;height:200px}}.pitch-constellation-section .circle,.xy-pad-section .circle{width:100%;height:100%;border-radius:50%;background:hsla(0,100%,71%,.1);position:absolute;cursor:pointer}.pitch-constellation-section .circle div,.xy-pad-section .circle div{width:1px;height:50%;position:absolute;background:#ff6969;left:50%;transform-origin:bottom;transition:transform .1s ease}.pitch-constellation-section .letters,.xy-pad-section .letters{align-items:center;height:100%}.pitch-constellation-section span,.xy-pad-section span{font-size:12px}@media only screen and (min-width:767px){.pitch-constellation-section span,.xy-pad-section span{font-size:18px}}@media only screen and (max-height:770px){.pitch-constellation-section span,.xy-pad-section span{font-size:12px}}@media only screen and (min-width:767px){.pitch-constellation-section,.xy-pad-section{min-width:50%}}@media only screen and (min-width:992px){.pitch-constellation-section,.xy-pad-section{min-width:auto}}.pitch-constellation span{position:absolute;padding:30px;transform-origin:center;cursor:pointer;color:#797979;-moz-user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;user-select:none}.pitch-constellation span.is-selected{font-size:20px;color:#ff6969}@media only screen and (min-width:767px){.pitch-constellation span.is-selected{font-size:30px}}@media only screen and (max-height:770px){.pitch-constellation span.is-selected{font-size:20px}}.pitch-constellation span.n0{transform:translateY(-133px)}@media only screen and (min-width:767px){.pitch-constellation span.n0{transform:translateY(-183px)}}@media only screen and (max-height:770px){.pitch-constellation span.n0{transform:translateY(-133px)}}.pitch-constellation span.n1{transform:translate(71px,-114px)}@media only screen and (min-width:767px){.pitch-constellation span.n1{transform:translate(91px,-154px)}}@media only screen and (max-height:770px){.pitch-constellation span.n1{transform:translate(71px,-114px)}}.pitch-constellation span.n2{transform:translate(119px,-69px)}@media only screen and (min-width:767px){.pitch-constellation span.n2{transform:translate(159px,-89px)}}@media only screen and (max-height:770px){.pitch-constellation span.n2{transform:translate(119px,-69px)}}.pitch-constellation span.n3{transform:translate(133px,2px)}@media only screen and (min-width:767px){.pitch-constellation span.n3{transform:translate(183px,2px)}}@media only screen and (max-height:770px){.pitch-constellation span.n3{transform:translate(133px,2px)}}.pitch-constellation span.n4{transform:translate(112px,69px)}@media only screen and (min-width:767px){.pitch-constellation span.n4{transform:translate(152px,89px)}}@media only screen and (max-height:770px){.pitch-constellation span.n4{transform:translate(112px,69px)}}.pitch-constellation span.n5{transform:translate(67px,113px)}@media only screen and (min-width:767px){.pitch-constellation span.n5{transform:translate(87px,153px)}}@media only screen and (max-height:770px){.pitch-constellation span.n5{transform:translate(67px,113px)}}.pitch-constellation span.n6{transform:translate(2px,125px)}@media only screen and (min-width:767px){.pitch-constellation span.n6{transform:translate(2px,175px)}}@media only screen and (max-height:770px){.pitch-constellation span.n6{transform:translate(2px,125px)}}.pitch-constellation span.n7{transform:translate(-68px,115px)}@media only screen and (min-width:767px){.pitch-constellation span.n7{transform:translate(-88px,155px)}}@media only screen and (max-height:770px){.pitch-constellation span.n7{transform:translate(-68px,115px)}}.pitch-constellation span.n8{transform:translate(-116px,72px)}@media only screen and (min-width:767px){.pitch-constellation span.n8{transform:translate(-156px,92px)}}@media only screen and (max-height:770px){.pitch-constellation span.n8{transform:translate(-116px,72px)}}.pitch-constellation span.n9{transform:translate(-126px,2px)}@media only screen and (min-width:767px){.pitch-constellation span.n9{transform:translate(-176px,2px)}}@media only screen and (max-height:770px){.pitch-constellation span.n9{transform:translate(-126px,2px)}}.pitch-constellation span.n10{transform:translate(-119px,-69px)}@media only screen and (min-width:767px){.pitch-constellation span.n10{transform:translate(-159px,-89px)}}@media only screen and (max-height:770px){.pitch-constellation span.n10{transform:translate(-119px,-69px)}}.pitch-constellation span.n11{transform:translate(-69px,-113px)}@media only screen and (min-width:767px){.pitch-constellation span.n11{transform:translate(-89px,-153px)}}@media only screen and (max-height:770px){.pitch-constellation span.n11{transform:translate(-69px,-113px)}}.xy-pad-section{position:absolute;left:-100%;min-width:auto}@media only screen and (min-width:767px){.xy-pad-section{min-width:50%}}@media only screen and (min-width:992px){.xy-pad-section{display:flex;min-width:auto;position:static;left:auto}}.xy-pad{width:100%;height:100%;position:relative;border-bottom:1px solid #ff6969;border-left:1px solid #ff6969}.xy-pad .overflow-hidden{width:100%;height:100%;position:absolute;overflow:hidden}.xy-pad .triange{width:200%;height:200%;position:absolute;transform-origin:top left;transform:rotate(-45deg);background:hsla(0,100%,71%,.1)}.xy-pad canvas{height:100%;width:100%;cursor:pointer;position:absolute;z-index:1}.xy-pad .fx-name{padding:10px 20px}.xy-pad .x-name,.xy-pad .y-name{position:absolute;width:100%;text-align:center;color:#797979;display:flex;justify-content:space-between;align-items:center}.xy-pad .x-name .js-fx-switch,.xy-pad .y-name .js-fx-switch{background-size:30%;background-position-y:0}.xy-pad .x-name output,.xy-pad .y-name output{position:absolute;right:2px;color:#ffb2a3}.xy-pad .x-name{bottom:-48px}.xy-pad .x-name output{top:-20px}@media only screen and (max-height:770px){.xy-pad .x-name output{top:-13px;font-size:10px}}.xy-pad .y-name{bottom:0;left:0;transform-origin:left bottom;transform:rotate(270deg)}.xy-pad .y-name output{top:47px}@media only screen and (max-height:770px){.xy-pad .y-name output{top:49px;font-size:10px}}.mode-btn{position:absolute;width:50px;height:50px;top:0;left:0;overflow:hidden}.scale-info{text-align:center;max-width:580px;margin:0 auto 30px}.fav-scale-controller{position:absolute;right:-9px;top:5px}.fav-scale-controller .icon-plus{width:45px;height:45px;background-size:50%}.selector-section{position:relative;flex-flow:row wrap;align-content:flex-end}.drone-selector,.fav-scale-selector{flex-direction:column;justify-content:flex-end;width:100%;cursor:pointer}@media only screen and (min-width:767px){.drone-selector,.fav-scale-selector{width:50%}}.drone-selector h5,.fav-scale-selector h5{display:none;margin:8px 0}@media only screen and (min-width:992px){.drone-selector h5,.fav-scale-selector h5{display:block}}.drone-selector li,.fav-scale-selector li{align-items:center;flex:1;max-width:60px;height:45px;color:#797979;border-top:none;border-left:none;text-align:center;font-size:14px}@media only screen and (min-width:767px){.drone-selector li,.fav-scale-selector li{height:57px}}.drone-selector li:last-of-type,.fav-scale-selector li:last-of-type{border-right:none}.fav-scale-selector h5{text-align:right}.fav-scale-selector ul{justify-content:flex-end;padding-right:35px}.fav-scale-selector li{max-width:60px}@media only screen and (min-width:767px){.fav-scale-selector li{max-width:120px}}.fav-scale-selector li.is-selected{color:#ff6969}.harp{flex:2;border-top:none;border-left:none;border-right:none;cursor:pointer}@media only screen and (min-width:992px){.harp{flex:4}}.harp canvas{width:100%}.effects-choice-overlay{position:absolute;width:300px;height:0;top:0;left:0;background:#ffe3cb;overflow:hidden;text-align:center;transition:height .1s ease}.effects-choice-overlay.is-active{padding:24px 20px;height:300px}.effects-choice-overlay .btn-close{position:absolute;top:0;right:2px;background-size:70%}.effects-choice-overlay [class*=icon-arrow]{background-size:100%}.effects-choice-overlay h4{margin:30px 0 -5px}.settings-overlay{position:absolute;display:none;top:0;left:0;background:#ffe3cb;height:100vh;width:100%;z-index:500;overflow:auto}.settings-overlay.is-active{display:flex;flex-direction:column}.settings-overlay .omni-first-letter{background-color:#ffb2a3}.settings-overlay>footer,.settings-overlay>nav,.settings-overlay>section{flex-shrink:0}.settings-overlay>article{flex:1 0 auto;max-width:580px;margin:30px auto;text-align:center}@media only screen and (min-width:767px){.settings-overlay .scale-selector{margin-bottom:0}}@media only screen and (min-width:992px){.settings-overlay .scale-selector{margin-bottom:30px}}.freqs li{font-size:12px;height:auto}.settings{display:flex;flex-direction:row;justify-content:space-around;flex-wrap:wrap;margin-bottom:30px}.settings .setting{margin:20px 0}.settings .setting h4{margin:0}.btn-download{display:none;border:1px solid;padding:0 20px;margin-right:9px;line-height:50px}.btn-download.has-loop{display:block}.settings-carousel{width:260px;margin:auto;align-items:center;border-bottom:1px solid #ffa699;margin:0 auto 30px;padding:20px 0}.settings-carousel ul{line-height:50px;width:100%}.settings-carousel ul li{width:100%;display:none}.settings-carousel ul li.is-selected{display:block}.slider{max-width:500px;height:50px}.app-active .startOverlay,.is-hidden{display:none}.app-active .loading-spinner{display:none;animation:none}.splash-overlay{z-index:100;background:#fff8dc;opacity:1;transition:opacity 1s ease .3s}.splash-overlay img{width:80%;max-width:960px;opacity:0;transition:opacity 3s ease}.splash-overlay.is-active img{opacity:1}.splash-overlay.is-active.anim-ended img{transition:opacity .5s ease;opacity:0}.splash-overlay.anim-ended{opacity:0}footer{justify-content:space-between;width:100%}.share,footer{display:flex;align-items:center}.share{padding-right:20px}.get-the-app{display:flex;position:relative;flex-direction:column;padding:0 45px 0 0;cursor:pointer;max-width:225px}.get-the-app h2{margin-left:20px}.get-the-app h2:after{font-style:normal;content:\"\\2303\";position:absolute;margin-left:10px;margin-top:6px}.get-the-app .app-store-links{display:none}.get-the-app.is-open h2:after{transform:rotate(180deg);transform-origin:50% 36%}.get-the-app.is-open .app-store-links{display:flex;flex-direction:column;position:absolute;background:#ffffffba;bottom:80px;width:100%}.get-the-app.is-open .app-store-links a{border-bottom:1px solid #ff6969;border-right:1px solid #ff6969;padding:20px;text-decoration:none;position:relative}.get-the-app.is-open .app-store-links a:after{content:\"\\203A\";position:absolute;margin-left:10px}", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg width='39px' height='24px' viewBox='0 0 39 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 41.2 (35397) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EPath 1%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='UI' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='constellation-active' transform='translate(-29.000000, -21.000000)' stroke-width='1' stroke='rgba(255,105,105,1)'%3E %3Cg id='Scale-Title' transform='translate(30.000000, 21.000000)'%3E %3Cpolyline id='Path-1' transform='translate(18.413069, 12.220306) scale(-1, 1) rotate(-270.000000) translate(-18.413069, -12.220306) ' points='28.2867581 -5.53631084 8.53938008 12.1700194 28.2867581 29.9769223'%3E%3C/polyline%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg width='31px' height='38px' viewBox='0 0 31 38' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 40 (33762) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EPlay%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='UI' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='Version-6-fonts' transform='translate(-1028.000000, -22.000000)' stroke-width='1' stroke='%23ffb2a3'%3E %3Cg id='SettingsCondensed' transform='translate(922.000000, 25.000000)'%3E %3Cg id='Play' transform='translate(107.860840, 0.584700)'%3E %3Cpolygon id='Play-Button' transform='translate(13.270844, 15.478494) rotate(90.000000) translate(-13.270844, -15.478494) ' points='13.2708444 2.7493385 28.7493385 28.2076498 -2.20764978 28.2076498'%3E%3C/polygon%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg width='50px' height='50px' viewBox='0 0 50 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch --%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='star' stroke='%23ffb2a3'%3E %3Ccircle id='Oval' cx='25' cy='25' r='24'%3E%3C/circle%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg width='30px' height='24px' viewBox='0 0 30 24' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3Cg id='UI' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='Version-6-fonts' transform='translate(-1124.000000, -29.000000)' stroke='%23ffb2a3' stroke-width='1'%3E %3Cg id='SettingsCondensed' transform='translate(922.000000, 25.000000)'%3E %3Cg id='Other-settings' transform='translate(201.000000, 1.000000)'%3E %3Cpath d='M1.6799471,24.7724154 L30.8776181,24.7724154' id='Path-3'%3E%3C/path%3E %3Cpath d='M1.6799471,14.8998557 L30.8776181,14.8998557' id='Path-3'%3E%3C/path%3E %3Cpath d='M1.6799471,5.02729601 L30.8776181,5.02729601' id='Path-3'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3Csvg width='32px' height='31px' viewBox='0 0 32 31' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3Cg id='UI' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='square'%3E %3Cg id='Version-6-fonts---menu-open' transform='translate(-1130.000000, -27.000000)' stroke='%23555' stroke-width='1'%3E %3Cg id='Hamburger-Menu-Open' transform='translate(0.000000, -1.000000)'%3E %3Cg id='Close-Icon' transform='translate(1132.000000, 30.000000)'%3E %3Cpath d='M27.2378428,26.6029275 L1.68779819,1.05288285' id='Line'%3E%3C/path%3E %3Cpath d='M0.602045439,26.5350706 L26.1935817,0.943534396' id='Line'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg width='46px' height='50px' viewBox='0 0 46 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch --%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='square'%3E %3Cg id='star' stroke='%23979797'%3E %3Cpath d='M25,1 L25,49' id='Line-Copy-6'%3E%3C/path%3E %3Cpath d='M1,25 L25,25' id='Line-Copy-8'%3E%3C/path%3E %3Cpath d='M44.4164079,10.8931539 L5.58359214,39.1068461' id='Line-Copy-8'%3E%3C/path%3E %3Cpath d='M25.6123724,25.3535534 L45.7846097,37' id='Line-Copy-8'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg width='50px' height='50px' viewBox='0 0 50 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch --%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='square'%3E %3Cg id='star' stroke='%23979797'%3E %3Cpath d='M1,1 L1,49' id='Line'%3E%3C/path%3E %3Cpath d='M49,1 L49,49' id='Line'%3E%3C/path%3E %3Cpath d='M1,1 L49,1' id='Line'%3E%3C/path%3E %3Cpath d='M7.5,8.5 L41.3241161,42.1170094' id='Line-Copy-7'%3E%3C/path%3E %3Cpath d='M1,49 L49,49' id='Line-Copy'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg width='50px' height='50px' viewBox='0 0 50 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch --%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='star' stroke='%23ffb2a3'%3E %3Ccircle id='Oval' cx='25' cy='25' r='24'%3E%3C/circle%3E %3Cpath d='M25,35 L25,15' id='Line-Copy-6' stroke-linecap='square'%3E%3C/path%3E %3Cpath d='M15,25 L35,25' id='Line-Copy-6' stroke-linecap='square'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3Csvg width='50px' height='50px' viewBox='0 0 50 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 48.2 (47327) - http://www.bohemiancoding.com/sketch --%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='square'%3E %3Cg id='star' stroke='%23ffb2a3'%3E %3Cpath d='M1,1 L1,49' id='Line'%3E%3C/path%3E %3Cpath d='M49,1 L49,49' id='Line'%3E%3C/path%3E %3Cpath d='M1,1 L49,1' id='Line'%3E%3C/path%3E %3Cpath d='M1,49 L49,49' id='Line-Copy'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='iso-8859-1'?%3E %3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='96.124px' height='96.123px' viewBox='0 0 96.124 96.123' style='enable-background:new 0 0 96.124 96.123;' xml:space='preserve'%3E %3Cpath fill='%23ff6969' d='M72.089,0.02L59.624,0C45.62,0,36.57,9.285,36.57,23.656v10.907H24.037c-1.083,0-1.96,0.878-1.96,1.961v15.803 c0,1.083,0.878,1.96,1.96,1.96h12.533v39.876c0,1.083,0.877,1.96,1.96,1.96h16.352c1.083,0,1.96-0.878,1.96-1.96V54.287h14.654 c1.083,0,1.96-0.877,1.96-1.96l0.006-15.803c0-0.52-0.207-1.018-0.574-1.386c-0.367-0.368-0.867-0.575-1.387-0.575H56.842v-9.246 c0-4.444,1.059-6.7,6.848-6.7l8.397-0.003c1.082,0,1.959-0.878,1.959-1.96V1.98C74.046,0.899,73.17,0.022,72.089,0.02z'/%3E %3C/svg%3E\""

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='iso-8859-1'?%3E %3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 612 612' style='enable-background:new 0 0 612 612;' xml:space='preserve'%3E %3Cpath fill='%23ff6969' d='M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411 c-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513 c0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101 c0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104 c-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194 c-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485 c230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z'/%3E %3C/svg%3E\""

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AudioController__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Harp__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__XYPad__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PitchConstellation__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ScaleSelector__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DroneSelector__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__RootNoteSelector__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__FavScaleSelector__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__SettingsCarousels__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__LoopController__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Utils_Scales_scales_shortlist__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Utils_Audio_scales__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ViewController__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Utils_selector__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Utils_number__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Inputs_KeyboardManager__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Inputs_KeyboardBindings__ = __webpack_require__(105);















const SVGInjector = __webpack_require__(103);


class App {
    constructor() {
        this.scales = __WEBPACK_IMPORTED_MODULE_10__Utils_Scales_scales_shortlist__["a" /* scales */];
        this.prevScaleBtns = Object(__WEBPACK_IMPORTED_MODULE_13__Utils_selector__["a" /* $ */])('.js-scaleSelectPrevBtn');
        this.nextScaleBtns = Object(__WEBPACK_IMPORTED_MODULE_13__Utils_selector__["a" /* $ */])('.js-scaleSelectNextBtn');
        this.xEffectNameEl = Object(__WEBPACK_IMPORTED_MODULE_13__Utils_selector__["a" /* $ */])('#xAxisName')[0];
        this.yEffectNameEl = Object(__WEBPACK_IMPORTED_MODULE_13__Utils_selector__["a" /* $ */])('#yAxisName')[0];
        this.state = {
            droneIdx: -1,
            scaleIdx: 0,
            voiceIdx: 0,
            scale: {
                frequencies: [0],
                name: '',
                description: ''
            },
            rootNoteIdx: 0,
            octaveOffset: -1,
            octavesToDisplay: 2,
            yEffect: 2,
            xEffect: 3,
        };
        if (this.prevScaleBtns.length) {
            this.prevScaleBtns.forEach(el => el.addEventListener('click', e => this.onScaleChange('prev', e)));
        }
        if (this.nextScaleBtns.length) {
            this.nextScaleBtns.forEach(el => el.addEventListener('click', e => this.onScaleChange('next', e)));
        }
    }
    init() {
        window.addEventListener('resize', this.onResize.bind(this));
        this.harp = new __WEBPACK_IMPORTED_MODULE_1__Harp__["a" /* default */](document.getElementById('harp'));
        this.audio = new __WEBPACK_IMPORTED_MODULE_0__AudioController__["a" /* default */]();
        this.xyPad = new __WEBPACK_IMPORTED_MODULE_2__XYPad__["a" /* default */](document.getElementById('xyPad'));
        const xAxisOutputEl = Object(__WEBPACK_IMPORTED_MODULE_13__Utils_selector__["a" /* $ */])('#xAxisVal')[0];
        const yAxisOutputEl = Object(__WEBPACK_IMPORTED_MODULE_13__Utils_selector__["a" /* $ */])('#yAxisVal')[0];
        this.xyPad.onChange = (x, y) => {
            this.effects[this.state.xEffect].setVal(x);
            this.effects[this.state.yEffect].setVal(y);
            if (xAxisOutputEl && yAxisOutputEl) {
                xAxisOutputEl.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_14__Utils_number__["g" /* round */])(x * 100, 0).toString();
                yAxisOutputEl.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_14__Utils_number__["g" /* round */])(y * 100, 0).toString();
            }
        };
        this.pitchConstellation = new __WEBPACK_IMPORTED_MODULE_3__PitchConstellation__["a" /* default */](document.getElementById('pitchConstellation'));
        this.favScaleSelector = new __WEBPACK_IMPORTED_MODULE_7__FavScaleSelector__["a" /* default */]();
        this.scaleSelector = new __WEBPACK_IMPORTED_MODULE_4__ScaleSelector__["a" /* default */]();
        this.rootNoteSelector = new __WEBPACK_IMPORTED_MODULE_6__RootNoteSelector__["a" /* default */]();
        this.droneSelector = new __WEBPACK_IMPORTED_MODULE_5__DroneSelector__["a" /* default */]();
        this.settingsCarouselManager = new __WEBPACK_IMPORTED_MODULE_8__SettingsCarousels__["a" /* default */]();
        this.effects = [
            {
                name: 'feedback',
                setVal: (val) => this.audio.delay.feedback = val,
                getVal: () => this.audio.delay.feedback,
            },
            {
                name: 'distortion',
                setVal: (val) => this.audio.distortion.mix = val,
                getVal: () => this.audio.distortion.mix,
            },
            {
                name: 'delay time',
                setVal: (val) => this.audio.delay.delay = val,
                getVal: () => this.audio.delay.delay,
            },
            {
                name: 'reverb',
                setVal: (val) => this.audio.convolver.mix = val,
                getVal: () => this.audio.convolver.mix,
            },
            {
                name: 'sustain',
                setVal: (val) => this.audio.harp.release = val * 3 + 0.1,
                getVal: () => this.audio.harp.release / 3 - 0.1,
            }
        ];
        this.setXEffect(this.state.xEffect);
        this.setYEffect(this.state.yEffect);
        this.setupEffectsSwitch();
        const recBtnEl = document.getElementById('recordBtn');
        const playBtnEl = document.getElementById('playBtn');
        const downloadBtnEl = document.getElementById('downloadBtn');
        if (recBtnEl && playBtnEl) {
            this.loopController = new __WEBPACK_IMPORTED_MODULE_9__LoopController__["a" /* default */](recBtnEl, playBtnEl, downloadBtnEl);
        }
        Object(__WEBPACK_IMPORTED_MODULE_12__ViewController__["a" /* initViewController */])();
        this.draw();
        this.keyboardManager = new __WEBPACK_IMPORTED_MODULE_15__Inputs_KeyboardManager__["a" /* KeyboardManager */]({
            onKeyDown: this.onKeyDown.bind(this),
            onKeyUp: this.onKeyUp.bind(this),
        });
    }
    setupEffectsSwitch() {
        const effectChoiceTriggerEls = Object(__WEBPACK_IMPORTED_MODULE_13__Utils_selector__["a" /* $ */])('.js-fx-switch');
        if (!effectChoiceTriggerEls.length)
            return;
        effectChoiceTriggerEls.forEach(el => {
            el.addEventListener('click', this.handleFXChange.bind(this));
        });
    }
    handleFXChange(e) {
        const data = e.target.dataset;
        const fxLen = this.effects.length - 1;
        const yFx = this.state.yEffect;
        const xFx = this.state.xEffect;
        if (data.direction === "prev") {
            if (data.xy === 'y') {
                let idx = yFx === 0 ? fxLen : yFx - 1;
                if (xFx === idx) {
                    idx = xFx === 0 ? fxLen : xFx - 1;
                }
                this.setYEffect(idx);
            }
            else {
                let idx = xFx === 0 ? fxLen : xFx - 1;
                if (yFx === idx) {
                    idx = yFx === 0 ? fxLen : yFx - 1;
                }
                this.setXEffect(idx);
            }
        }
        else {
            if (data.xy === 'y') {
                let idx = yFx >= fxLen ? 0 : yFx + 1;
                if (xFx === idx) {
                    idx = xFx >= fxLen ? 0 : xFx + 1;
                }
                this.setYEffect(idx);
            }
            else {
                let idx = xFx >= fxLen ? 0 : xFx + 1;
                if (yFx === idx) {
                    idx = yFx >= fxLen ? 0 : yFx + 1;
                }
                this.setXEffect(idx);
            }
        }
    }
    onScaleChange(direction, e) {
        if (direction === 'prev')
            this.onScaleChangePrev(e);
        if (direction === 'next')
            this.onScaleChangeNext(e);
    }
    onScaleChangePrev(e) {
        this.scaleSelector.prev();
    }
    onScaleChangeNext(e) {
        this.scaleSelector.next();
    }
    setVoice(val) {
        this.state.voiceIdx = val;
    }
    setXEffect(val) {
        this.state.xEffect = val;
        this.xyPad.xPos = this.effects[val].getVal();
        if (this.xEffectNameEl) {
            this.xEffectNameEl.innerHTML = this.effects[val].name;
        }
    }
    setYEffect(val) {
        this.state.yEffect = val;
        this.xyPad.yPos = this.effects[val].getVal();
        if (this.yEffectNameEl) {
            this.yEffectNameEl.innerHTML = this.effects[val].name;
        }
    }
    isDuplicateXYPadChoice() {
        return this.state.yEffect === this.state.xEffect ? true : false;
    }
    setHarpOctaves(val) {
        this.state.octavesToDisplay = val;
        this.harp.octavesToDisplay = val;
        this.scaleDidChange();
    }
    setHarpOctaveOffset(val) {
        this.state.octaveOffset = val;
        this.setScale();
    }
    setScale(scaleIdx = this.state.scaleIdx, rootNoteIdx = this.state.rootNoteIdx, octave = this.state.octaveOffset) {
        this.state.scaleIdx = scaleIdx;
        this.state.scale = this.scales[scaleIdx];
        let freqs = this.state.scale.frequencies;
        if (freqs) {
            this.state.scale.frequencies = Object(__WEBPACK_IMPORTED_MODULE_11__Utils_Audio_scales__["e" /* scaleFromRoot12Idx */])(freqs, rootNoteIdx, this.state.octaveOffset);
        }
        this.scaleDidChange();
        this.favScaleSelector.setActiveClass(scaleIdx);
    }
    scaleDidChange() {
        if (this.state.scale.frequencies) {
            this.pitchConstellation.drawLines(this.state.scale.frequencies);
            this.harp.updateScale(this.state.scale.frequencies, this.state.rootNoteIdx);
        }
    }
    setRootNote(rootNoteIdx) {
        this.state.rootNoteIdx = rootNoteIdx;
        this.setScale();
    }
    onResize() {
        this.harp.onResize();
        this.xyPad.onResize();
        this.draw();
    }
    draw() {
        if (this.state.scale.frequencies) {
            this.harp.draw(this.state.scale.frequencies);
            this.xyPad.draw();
            this.pitchConstellation.drawLines(this.state.scale.frequencies);
        }
    }
    onKeyDown(e) {
        const key = Object(__WEBPACK_IMPORTED_MODULE_16__Inputs_KeyboardBindings__["a" /* getKeyBinding */])(e);
        const keyType = Object(__WEBPACK_IMPORTED_MODULE_16__Inputs_KeyboardBindings__["b" /* getKeyType */])(key);
        if (keyType === 'harp') {
            this.harp.onKeyDown(key - 10);
        }
        else if (keyType === 'bass') {
            this.audio.bassNoteOn(key);
        }
        else if (keyType === 'rootNote') {
            this.rootNoteSelector.setKey(key - 40);
        }
        else if (keyType === 'control') {
            this.emitKeyControlAction(key);
        }
    }
    onKeyUp(e) {
        const key = Object(__WEBPACK_IMPORTED_MODULE_16__Inputs_KeyboardBindings__["a" /* getKeyBinding */])(e);
        const keyType = Object(__WEBPACK_IMPORTED_MODULE_16__Inputs_KeyboardBindings__["b" /* getKeyType */])(key);
        if (keyType === 'bass') {
            this.audio.bassNoteOff(key);
        }
    }
    emitKeyControlAction(key) {
        switch (key) {
            case __WEBPACK_IMPORTED_MODULE_16__Inputs_KeyboardBindings__["c" /* keyboardCodeMap */].ArrowUp:
                this.scaleSelector.prev();
                break;
            case __WEBPACK_IMPORTED_MODULE_16__Inputs_KeyboardBindings__["c" /* keyboardCodeMap */].ArrowDown:
                this.scaleSelector.next();
                break;
            case __WEBPACK_IMPORTED_MODULE_16__Inputs_KeyboardBindings__["c" /* keyboardCodeMap */].ArrowLeft:
                this.favScaleSelector.prev();
                break;
            case __WEBPACK_IMPORTED_MODULE_16__Inputs_KeyboardBindings__["c" /* keyboardCodeMap */].ArrowRight:
                this.favScaleSelector.next();
                break;
            default:
                break;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (App);


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Audio_PluckedSynth__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_Audio_iOS__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bass__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Audio_CrappyDistortion__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Audio_FeedbackDelay__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Audio_Convolver__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Utils_Looper_Looper__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Utils_Audio_scales__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__index__ = __webpack_require__(3);









class AudioController {
    constructor(context = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_Audio_iOS__["a" /* createIOSSafeAudioContext */])(44100)) {
        this.context = context;
        this.rootNoteIdx = 0;
        this.octaveOffset = 0;
        this.harp = new __WEBPACK_IMPORTED_MODULE_0__Audio_PluckedSynth__["a" /* default */](this.context);
        this.harp.attack = 0.005;
        this.harp.release = 3;
        this.bass = new __WEBPACK_IMPORTED_MODULE_2__Bass__["a" /* default */](this.context);
        this.compressor = this.context.createDynamicsCompressor();
        this.distortion = new __WEBPACK_IMPORTED_MODULE_3__Audio_CrappyDistortion__["a" /* default */](this.context, 20, 'none');
        this.distortion.mix = 0;
        this.delay = new __WEBPACK_IMPORTED_MODULE_4__Audio_FeedbackDelay__["a" /* default */](this.context, 0.1, 0.6, 0.5);
        this.convolver = new __WEBPACK_IMPORTED_MODULE_5__Audio_Convolver__["a" /* default */](this.context, 0.25);
        this.recordingGain = this.context.createGain();
        this.masterVolume = this.context.createGain();
        this.synthOut = this.context.createGain();
        this.looper = new __WEBPACK_IMPORTED_MODULE_6__Utils_Looper_Looper__["a" /* default */](this.synthOut, this.recordingGain);
        this.scale = [261.6255653006, 274.52698453615, 329.62755691287, 349.22823143301, 391.99543598175, 411.32572372413, 493.88330125613];
        this.analysers = {
            live: this.context.createAnalyser(),
            recording: this.context.createAnalyser(),
        };
        this.routeSounds();
    }
    routeSounds() {
        this.masterVolume.gain.value = 0.5;
        this.harp.connect(this.distortion);
        this.bass.connect(this.synthOut);
        this.distortion.connect(this.delay);
        this.delay.connect(this.convolver);
        this.convolver.connect(this.compressor);
        this.compressor.connect(this.synthOut);
        this.synthOut.connect(this.analysers.live);
        this.analysers.live.connect(this.masterVolume);
        this.recordingGain.connect(this.analysers.recording);
        this.analysers.recording.connect(this.masterVolume);
        this.masterVolume.connect(this.context.destination);
    }
    harpNoteOn(noteIndex, volume = 1, index, octaveOffset = this.octaveOffset) {
        const frequency = Object(__WEBPACK_IMPORTED_MODULE_7__Utils_Audio_scales__["b" /* getFrequencyFromNoteIndexInScale */])(noteIndex, this.scale, octaveOffset);
        this.harp.NoteOn(frequency, volume, index);
    }
    harpNoteOff(index) {
        this.harp.NoteOff(index);
    }
    bassNoteOn(key) {
        const frequency = Object(__WEBPACK_IMPORTED_MODULE_7__Utils_Audio_scales__["b" /* getFrequencyFromNoteIndexInScale */])(key, __WEBPACK_IMPORTED_MODULE_8__index__["Omni"].state.scale.frequencies, -1);
        this.bass.noteOn(frequency, key);
    }
    bassNoteOff(key) {
        this.bass.noteOff(key);
    }
    bassNotesOff() {
        this.bass.purge();
    }
    onRecordPress() {
        this.looper.recordBtnPressed();
    }
    onPlaybackPress() {
        this.looper.playBtnPressed();
    }
    StopPlayback() {
        this.recording.stop(0);
    }
    Download(cb) {
        this.looper.exportWav((recording) => {
            setTimeout(cb(recording), 0);
        });
    }
    setupAnalysers() {
        if (this.analysers) {
            for (const analyser in this.analysers) {
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (AudioController);


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_audio_shim__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_audio_shim___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Utils_audio_shim__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Sine__ = __webpack_require__(66);


class PluckedSynth {
    constructor(context) {
        this.context = context;
        this.output = this.context.createGain();
        this.osc = new __WEBPACK_IMPORTED_MODULE_1__Sine__["a" /* default */](this.context);
        this.osc.connect(this.output);
    }
    connect(destination, output, input) {
        this.output.connect.apply(this.output, arguments);
    }
    NoteOn(frequency, volume = 1, index) {
        this.osc.frequency = frequency;
        this.osc.noteOn(volume);
    }
    NoteOff(index) { }
    set attack(val) {
        this.osc.attack = val;
    }
    get attack() {
        return this.osc.attack;
    }
    set release(val) {
        this.osc.release = val;
    }
    get release() {
        return this.osc.release;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PluckedSynth);


/***/ }),
/* 65 */
/***/ (function(module, exports) {

//borrowed from underscore.js
function isUndef(val){
    return val === void 0;
}

//borrowed from underscore.js
function isFunction(val){
    return typeof val === "function";
}

var audioContext;

//polyfill for AudioContext and OfflineAudioContext
if (isUndef(window.AudioContext)){
    window.AudioContext = window.webkitAudioContext;
}
if (isUndef(window.OfflineAudioContext)){
    window.OfflineAudioContext = window.webkitOfflineAudioContext;
}

if (!isUndef(AudioContext)){
    audioContext = new AudioContext();
} else {
    throw new Error("Web Audio is not supported in this browser");
}

//SHIMS////////////////////////////////////////////////////////////////////

if (!isFunction(AudioContext.prototype.createGain)){
    AudioContext.prototype.createGain = AudioContext.prototype.createGainNode;
}
if (!isFunction(AudioContext.prototype.createDelay)){
    AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode;
}
if (!isFunction(AudioContext.prototype.createPeriodicWave)){
    AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable;
}
if (!isFunction(AudioBufferSourceNode.prototype.start)){
    AudioBufferSourceNode.prototype.start = AudioBufferSourceNode.prototype.noteGrainOn;
}
if (!isFunction(AudioBufferSourceNode.prototype.stop)){
    AudioBufferSourceNode.prototype.stop = AudioBufferSourceNode.prototype.noteOff;
}
if (!isFunction(OscillatorNode.prototype.start)){
    OscillatorNode.prototype.start = OscillatorNode.prototype.noteOn;
}
if (!isFunction(OscillatorNode.prototype.stop)){
    OscillatorNode.prototype.stop = OscillatorNode.prototype.noteOff;
}
if (!isFunction(OscillatorNode.prototype.setPeriodicWave)){
    OscillatorNode.prototype.setPeriodicWave = OscillatorNode.prototype.setWaveTable;
}


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AudioNodeBase__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ADSR__ = __webpack_require__(25);


class Sine extends __WEBPACK_IMPORTED_MODULE_0__AudioNodeBase__["a" /* default */] {
    constructor(ctx, attack = 0.005, release = 3) {
        super(ctx);
        this.attack = attack;
        this.release = release;
        this.frequency = 440;
        this.input = this.ctx.createGain();
        this.output = this.ctx.createGain();
    }
    noteOn(volume) {
        const attack = this.attack;
        const release = this.release + (Math.random() * 0.1);
        this.setup();
        let now = this.ctx.currentTime;
        this.osc.start();
        this.osc.stop(now + this.attack + this.release);
        this.ADSR.triggerAttackRelease(now, volume / 1.3, attack, release);
    }
    setup() {
        this.osc = this.ctx.createOscillator();
        this.ADSR = new __WEBPACK_IMPORTED_MODULE_1__ADSR__["a" /* default */](this.ctx);
        this.osc.type = 'triangle';
        this.osc.frequency.value = this.frequency;
        this.osc.connect(this.ADSR);
        this.ADSR.connect(this.output);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Sine);


/***/ }),
/* 67 */
/***/ (function(module, exports) {



/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isIOSAudioUnlocked */
/* harmony export (immutable) */ __webpack_exports__["a"] = createIOSSafeAudioContext;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buffers__ = __webpack_require__(26);

function isIOSAudioUnlocked(context, cb) {
    const source = Object(__WEBPACK_IMPORTED_MODULE_0__buffers__["b" /* createEmptyBuffer */])(context);
    setTimeout(() => {
        cb((source.playbackState === source.PLAYING_STATE ||
            source.playbackState === source.FINISHED_STATE));
    }, 1);
}
function createIOSSafeAudioContext(desiredSampleRate = 44100) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let context = new AudioContext();
    if (/(iPhone|iPad)/i.test(navigator.userAgent) &&
        context.sampleRate !== desiredSampleRate) {
        var buffer = context.createBuffer(1, 1, desiredSampleRate);
        var dummy = context.createBufferSource();
        dummy.buffer = buffer;
        dummy.connect(context.destination);
        dummy.start(0);
        dummy.disconnect();
        context.close();
        context = new AudioContext();
    }
    return context;
}


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Audio_MonoSynth__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Audio_helpers_routing__ = __webpack_require__(11);


class BassSynth {
    constructor(context) {
        this.context = context;
        this._activeKeys = new Set();
        this.output = this.context.createGain();
        this._compressor = this.context.createDynamicsCompressor();
        this.bassSynth1 = new __WEBPACK_IMPORTED_MODULE_0__Audio_MonoSynth__["a" /* default */](context);
        this.bassSynth2 = new __WEBPACK_IMPORTED_MODULE_0__Audio_MonoSynth__["a" /* default */](context);
        this.bassSynth3 = new __WEBPACK_IMPORTED_MODULE_0__Audio_MonoSynth__["a" /* default */](context);
        this.bassSynth1.waveform = 'triangle';
        this.bassSynth2.waveform = 'sine';
        this.bassSynth3.waveform = 'square';
        const vols = [0.338, 0.355, 0.022];
        const mult = 1.3;
        this.bassSynth1.volume = vols[0] * mult;
        this.bassSynth2.volume = vols[1] * mult;
        this.bassSynth3.volume = vols[2] * mult;
        Object(__WEBPACK_IMPORTED_MODULE_1__Audio_helpers_routing__["a" /* connectManyToOne */])(this._compressor, this.bassSynth1, this.bassSynth2, this.bassSynth3);
        this._compressor.connect(this.output);
    }
    noteOn(frequency, id = -1) {
        this.bassSynth1.frequency = frequency;
        this.bassSynth2.frequency = frequency / 2;
        this.bassSynth3.frequency = frequency / 2;
        this.bassSynth1.noteOn(frequency, undefined, undefined, 0.1);
        this.bassSynth2.noteOn(frequency / 2, undefined, undefined, 0.1);
        this.bassSynth3.noteOn(frequency / 2, undefined, undefined, 0.1);
        this._activeKeys.add(id);
    }
    noteOff(id = -1) {
        this._activeKeys.delete(id);
        if (this._activeKeys.size === 0) {
            this.bassSynth1.noteOff(undefined, 0.5);
            this.bassSynth2.noteOff(undefined, 0.8);
            this.bassSynth3.noteOff(undefined, 0.2);
        }
    }
    purge() {
        this.bassSynth1.noteOff(undefined, 0.5);
        this.bassSynth2.noteOff(undefined, 0.8);
        this.bassSynth3.noteOff(undefined, 0.2);
        this._activeKeys.clear();
    }
    connect(destination, output, input) {
        this.output.connect.apply(this.output, arguments);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (BassSynth);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AudioNodeBase__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_routing__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ADSR__ = __webpack_require__(25);



class MonoSynth extends __WEBPACK_IMPORTED_MODULE_0__AudioNodeBase__["a" /* default */] {
    constructor(actx) {
        super(actx);
        this.actx = actx;
        this.osc1 = actx.createOscillator();
        this.osc1.start();
        this.envelope = new __WEBPACK_IMPORTED_MODULE_2__ADSR__["a" /* default */](actx);
        Object(__WEBPACK_IMPORTED_MODULE_1__helpers_routing__["c" /* connectSeries */])(this.osc1, this.envelope, this.output);
    }
    noteOn(frequency, time, velocity, attack) {
        this.osc1.frequency.value = frequency;
        this.envelope.triggerAttack(time, velocity, attack);
    }
    noteOff(time, release) {
        this.envelope.triggerRelease(time, release);
    }
    set frequency(value) {
        this.osc1.frequency.value = value;
    }
    get frequency() {
        return this.osc1.frequency.value;
    }
    set waveform(type) {
        this.osc1.type = type;
    }
    get waveform() {
        return this.osc1.type;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (MonoSynth);


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_routing__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_distortionCurves__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AudioEffect__ = __webpack_require__(16);



class CrappyDistortion extends __WEBPACK_IMPORTED_MODULE_2__AudioEffect__["a" /* default */] {
    constructor(ctx, drive = 4, oversample = '4x') {
        super(ctx);
        this.ctx = ctx;
        this.distortion = this.ctx.createWaveShaper();
        this._drive = drive;
        this.distortion.curve = Object(__WEBPACK_IMPORTED_MODULE_1__helpers_distortionCurves__["a" /* makeDistortionCurve */])(drive);
        this.distortion.oversample = oversample;
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers_routing__["c" /* connectSeries */])(this.fxIn, this.distortion, this.fxOut);
    }
    set oversample(val) {
        this.distortion.oversample = val;
    }
    get oversample() {
        return (this.distortion.oversample);
    }
    set drive(amount) {
        this._drive = amount;
        this.distortion.curve = Object(__WEBPACK_IMPORTED_MODULE_1__helpers_distortionCurves__["a" /* makeDistortionCurve */])(amount);
    }
    get drive() {
        return this._drive;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (CrappyDistortion);


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeDistortionCurve;
function makeDistortionCurve(k = 50) {
    let n_samples = 44100, curve = new Float32Array(n_samples), deg = Math.PI / 180, i = 0, x;
    for (; i < n_samples; ++i) {
        x = i * 2 / n_samples - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
}
;


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers_routing__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AudioEffect__ = __webpack_require__(16);


class FeedbackDelay extends __WEBPACK_IMPORTED_MODULE_1__AudioEffect__["a" /* default */] {
    constructor(ctx, delay = 0.15, feedback = 0.25, wetLevel = 0.25) {
        super(ctx);
        this.ctx = ctx;
        this._delay = this.ctx.createDelay();
        this._feedback = this.ctx.createGain();
        this._wetLevel = this.ctx.createGain();
        this._delay.delayTime.value = delay;
        this._feedback.gain.value = feedback;
        this._wetLevel.gain.value = wetLevel;
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers_routing__["b" /* connectOneToMany */])(this.fxIn, this._delay, this.fxOut);
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers_routing__["b" /* connectOneToMany */])(this._delay, this._feedback, this._wetLevel);
        this._feedback.connect(this._delay);
        this._wetLevel.connect(this.fxOut);
    }
    get delay() {
        return this._delay.delayTime.value;
    }
    set delay(val) {
        this._delay.delayTime.value = val;
    }
    get feedback() {
        return this._feedback.gain.value;
    }
    set feedback(val) {
        this._feedback.gain.value = val;
    }
    get wet() {
        return this._wetLevel.gain.value;
    }
    set wet(level) {
        this._wetLevel.gain.value = level;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (FeedbackDelay);


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AudioEffect__ = __webpack_require__(16);

class Convolver extends __WEBPACK_IMPORTED_MODULE_0__AudioEffect__["a" /* default */] {
    constructor(ctx, mix = 0.5) {
        super(ctx);
        this.ctx = ctx;
        this._convolver = this.context.createConvolver();
        this.mix = mix;
        const ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open('GET', './teufelsberg01.ogg', true);
        ajaxRequest.responseType = 'arraybuffer';
        ajaxRequest.onload = () => {
            this.context.decodeAudioData(ajaxRequest.response, (buffer) => {
                this._convolver.buffer = buffer;
            }, (err) => {
                console.log("Error with decoding audio data" + err);
            });
        };
        ajaxRequest.send();
        this.fxIn.connect(this._convolver);
        this._convolver.connect(this.fxOut);
        this.fxOut.gain.value = 0.3;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Convolver);


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RecorderWorker__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Loop__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Audio_buffers__ = __webpack_require__(26);
const WorkerTimer = __webpack_require__(76);
const mergeBuffers = __webpack_require__(77);
const bufferUtils = __webpack_require__(78);



class Looper {
    constructor(input, output, bufferSize = 4096) {
        this.isPlaying = false;
        this.isRecording = false;
        this.loops = [];
        this.maxAmountOfLoops = 30;
        this.maxLoopDuration = 30;
        this.recordMono = true;
        this.volumeReduceAmount = 1.1;
        this.state = 'stopped';
        this.isOverdubPressed = false;
        this.tempLoopLength = this.maxLoopDuration + 1;
        this.loopLength = this.tempLoopLength;
        this.resumeOverdubbingpPressed = false;
        this._id = -1;
        this.input = input;
        this.output = output;
        this.bufferSize = bufferSize;
        this.context = this.input.context;
        this.processor = this.context.createScriptProcessor(this.bufferSize, this.recordMono ? 1 : 2, 2);
        this.input.connect(this.processor);
        this.processor.connect(this.output);
        this.onaudioprocess = this.onaudioprocess.bind(this);
        this.playbackScheduler = this.playbackScheduler.bind(this);
        __WEBPACK_IMPORTED_MODULE_0__RecorderWorker__["a" /* default */].postMessage({
            command: 'init',
            config: {
                numChannels: this.recordMono ? 1 : 2,
                sampleRate: 44100,
            },
        });
    }
    get isOverdubbing() {
        return this.loops.length > 1 && this.isRecording;
    }
    get hasRecordings() {
        return this.loops.length ? true : false;
    }
    ;
    recordBtnPressed() {
        if (!this.isRecording && !this.isOverdubbing && !this.isPlaying) {
            this.reset();
            this.startRecording();
            this.state = 'recording';
        }
        else if (this.isRecording && !this.isOverdubbing) {
            this.startOverdubbing();
            this.state = 'overdubbing';
        }
        else if (this.isPlaying && !this.isRecording) {
            this.resumeOverdubbing();
            this.state = 'overdubbing';
        }
        else if (this.isOverdubbing) {
            this.stopRecording();
            this.stopPlaying();
            this.state = 'stopped';
        }
    }
    playBtnPressed() {
        if (this.isPlaying && !this.isOverdubbing) {
            this.stopPlaying();
            this.state = 'stopped';
        }
        else if (this.isRecording && !this.isPlaying) {
            this.stopRecording();
            this.startPlaying();
            this.state = 'playing';
        }
        else if (this.isRecording && this.isPlaying) {
            this.stopRecording();
            this.state = 'playing';
        }
        else if (!this.isRecording && this.hasRecordings) {
            this.startPlaying();
            this.state = 'playing';
        }
    }
    startRecording() {
        this.newLoop();
        this.isRecording = true;
        this.processor.onaudioprocess = this.onaudioprocess;
    }
    resumeOverdubbing() {
        this.resumeOverdubbingpPressed = true;
        this.newLoop();
        this.isRecording = true;
        this.processor.onaudioprocess = this.onaudioprocess;
    }
    stopRecording() {
        this.setLoopLength(this.loops[0]);
        this.isRecording = false;
        this.processor.onaudioprocess = null;
    }
    startOverdubbing() {
        this.isOverdubPressed = true;
    }
    startPlaying() {
        this.nextLoopStartTime = this.context.currentTime;
        this.playbackScheduler();
        this.isPlaying = true;
    }
    stopPlaying() {
        this.isPlaying = false;
        WorkerTimer.clearTimeout(this.playbackSchedulerTimeout);
        this.stopLoops();
    }
    exportWav(returnWavCallback) {
        let buffers = [];
        const weakenAmount = Math.min(this.loops.length, 4);
        for (let i in this.loops) {
            if (this.loops[i].buffer !== null) {
                let newBuffer = Object(__WEBPACK_IMPORTED_MODULE_2__Audio_buffers__["c" /* weakenBuffer */])(this.loops[i].buffer, this.loops[i].output.gain.value / weakenAmount, this.context);
                if (this.loops[i].startOffset > 0) {
                    let arrayOffset = Math.round(this.loops[i].startOffset * newBuffer.sampleRate);
                    const shifted = this.context.createBuffer(newBuffer.numberOfChannels, Math.round(this.loopLength * newBuffer.sampleRate), newBuffer.sampleRate);
                    if (newBuffer.length + arrayOffset <= shifted.length) {
                        newBuffer = bufferUtils.copy(newBuffer, shifted, arrayOffset);
                    }
                    else {
                        console.error('from.length + arrayOffset', newBuffer.length + arrayOffset, '>', 'to.length', shifted.length, 'by', ((newBuffer.length + arrayOffset) - shifted.length) / newBuffer.sampleRate);
                    }
                }
                buffers.push(newBuffer);
            }
        }
        WorkerTimer.setTimeout(() => {
            const mergedBuffer = mergeBuffers(buffers, this.context);
            const normalizedBuffer = bufferUtils.normalize(mergedBuffer);
            __WEBPACK_IMPORTED_MODULE_0__RecorderWorker__["a" /* default */].postMessage({
                command: 'clear'
            });
            __WEBPACK_IMPORTED_MODULE_0__RecorderWorker__["a" /* default */].onmessage = function (e) {
                returnWavCallback(e.data.data);
            };
            __WEBPACK_IMPORTED_MODULE_0__RecorderWorker__["a" /* default */].postMessage({
                buffer: [
                    normalizedBuffer.getChannelData(0)
                ],
                command: 'record',
            });
            __WEBPACK_IMPORTED_MODULE_0__RecorderWorker__["a" /* default */].postMessage({
                command: 'exportWAV',
                type: 'audio/wav',
            });
        }, 0);
    }
    reset() {
        this.loops = [];
        this.loopLength = this.tempLoopLength;
        this.playbackSchedulerTimeout = null;
        this._id = -1;
    }
    setLoopLength(loop) {
        if (loop.buffer) {
            this.loopLength = loop.buffer.duration + loop.startOffset;
        }
    }
    playLoops() {
        for (let i = this.loops.length - 1; i >= 0; i--) {
            if (this.loops[i].buffer !== null) {
                if (this.isOverdubbing) {
                    this.loops[i].lowerVolume(this.volumeReduceAmount);
                    this.loops[i].overdubCount++;
                    if (this.loops[i].overdubCount === this.maxAmountOfLoops) {
                        this.loops.shift();
                        return;
                    }
                }
                if (this.loops[i].startOffset > 0) {
                    this.loops[i].startOffset = this.loopLength - this.loops[i].buffer.duration;
                }
                this.loops[i].play();
            }
        }
    }
    stopLoops() {
        for (let i in this.loops) {
            if (this.loops[i].buffer !== null) {
                this.loops[i].stop();
            }
        }
    }
    playbackScheduler() {
        while (this.nextLoopStartTime < this.context.currentTime) {
            this.playLoops();
            this.nextLoopStartTime += this.loopLength;
        }
        this.playbackSchedulerTimeout = WorkerTimer.setTimeout(this.playbackScheduler, 0);
    }
    onaudioprocess(e) {
        if (!this.isRecording && !this.isOverdubbing) {
            return;
        }
        let newLoop = this.loops[this.loops.length - 1];
        if (this.resumeOverdubbingpPressed) {
            newLoop.startOffset = this.loopLength - (this.nextLoopStartTime - this.context.currentTime);
            this.resumeOverdubbingpPressed = false;
        }
        newLoop.buffer = Object(__WEBPACK_IMPORTED_MODULE_2__Audio_buffers__["a" /* appendBuffer */])(newLoop.buffer, e.inputBuffer, this.context);
        this.loops[this.loops.length - 1] = newLoop;
        if (this.isOverdubPressed) {
            this.setLoopLength(this.loops[0]);
            this.startPlaying();
        }
        if (newLoop.buffer.duration + newLoop.startOffset >= this.loopLength) {
            this.isOverdubPressed = false;
            this.newLoop();
        }
    }
    ;
    newLoop() {
        this._id++;
        this.loops.push(new __WEBPACK_IMPORTED_MODULE_1__Loop__["a" /* default */](this.context));
        const currentLoopIndex = this.loops.length - 1;
        this.loops[currentLoopIndex].output.connect(this.output);
        this.loops[currentLoopIndex].id = this._id;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Looper);


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

if (global === global.window && global.URL && global.Blob && global.Worker) {
  module.exports = (function() {
    var TIMER_WORKER_SOURCE = [
      "var timerIds = {}, _ = {};",
      "_.setInterval = function(args) {",
      "  timerIds[args.timerId] = setInterval(function() { postMessage(args.timerId); }, args.delay);",
      "};",
      "_.clearInterval = function(args) {",
      "  clearInterval(timerIds[args.timerId]);",
      "};",
      "_.setTimeout = function(args) {",
      "  timerIds[args.timerId] = setTimeout(function() { postMessage(args.timerId); }, args.delay);",
      "};",
      "_.clearTimeout = function(args) {",
      "  clearTimeout(timerIds[args.timerId]);",
      "};",
      "onmessage = function(e) { _[e.data.type](e.data) };"
    ].join("");

    var _timerId = 0;
    var _callbacks = {};
    var _timer = new global.Worker(global.URL.createObjectURL(
      new global.Blob([ TIMER_WORKER_SOURCE ], { type: "text/javascript" })
    ));

    _timer.onmessage = function(e) {
      if (_callbacks[e.data]) {
        _callbacks[e.data].callback.apply(null, _callbacks[e.data].params);
      }
    };

    return {
      setInterval: function(callback, delay) {
        var params = Array.prototype.slice.call(arguments, 2);

        _timerId += 1;

        _timer.postMessage({ type: "setInterval", timerId: _timerId, delay: delay });
        _callbacks[_timerId] = { callback: callback, params: params };

        return _timerId;
      },
      setTimeout: function(callback, delay) {
        var params = Array.prototype.slice.call(arguments, 2);

        _timerId += 1;

        _timer.postMessage({ type: "setTimeout", timerId: _timerId, delay: delay });
        _callbacks[_timerId] = { callback: callback, params: params };

        return _timerId;
      },
      clearInterval: function(timerId) {
        _timer.postMessage({ type: "clearInterval", timerId: timerId });
        _callbacks[timerId] = null;
      },
      clearTimeout: function(timerId) {
        _timer.postMessage({ type: "clearTimeout", timerId: timerId });
        _callbacks[timerId] = null;
      }
    };
  })();
} else {
  module.exports = global;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = mergeBuffers;

function mergeBuffers(buffers, ac) {
  var maxChannels = 0;
  var maxDuration = 0;
  for (var i = 0; i < buffers.length; i++) {
    if (buffers[i].numberOfChannels > maxChannels) {
      maxChannels = buffers[i].numberOfChannels;
    }
    if (buffers[i].duration > maxDuration) {
      maxDuration = buffers[i].duration;
    }
  }
  var out = ac.createBuffer(maxChannels,
                                 ac.sampleRate * maxDuration,
                                 ac.sampleRate);

  for (var j = 0; j < buffers.length; j++) {
    for (var srcChannel = 0; srcChannel < buffers[j].numberOfChannels; srcChannel++) {
      var outt = out.getChannelData(srcChannel);
      var inn = buffers[j].getChannelData(srcChannel);
      for (var i = 0; i < inn.length; i++) {
        outt[i] += inn[i];
      }
      out.getChannelData(srcChannel).set(outt, 0);
    }
  }
  return out;
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module  audio-buffer-utils
 */


var AudioBuffer = __webpack_require__(79);
var isAudioBuffer = __webpack_require__(28);
var isBrowser = __webpack_require__(27);


module.exports = {
    create: create,
    copy: copy,
    shallow: shallow,
    clone: clone,
    reverse: reverse,
    invert: invert,
    zero: zero,
    noise: noise,
    equal: equal,
    fill: fill,
    slice: slice,
    map: map,
    concat: concat,
    resize: resize,
    rotate: rotate,
    shift: shift,
    reduce: reduce,
    normalize: normalize,
    trim: trim,
    trimStart: trimStart,
    trimEnd: trimEnd,
    mix: mix,
    size: size,
    data: data
};


/**
 * Create buffer from any argument
 */
function create (a, b, c) {
    return new AudioBuffer(a, b, c);
}


/**
 * Copy data from buffer A to buffer B
 */
function copy (from, to, offset) {
    validate(from);
    validate(to);

    offset = offset || 0;

    for (var channel = 0, l = Math.min(from.numberOfChannels, to.numberOfChannels); channel < l; channel++) {
        to.getChannelData(channel).set(from.getChannelData(channel), offset);
    }

    return to;
}


/**
 * Assert argument is AudioBuffer, throw error otherwise.
 */
function validate (buffer) {
    if (!isAudioBuffer(buffer)) throw new Error('Argument should be an AudioBuffer instance.');
}



/**
 * Create a buffer with the same characteristics as inBuffer, without copying
 * the data. Contents of resulting buffer are undefined.
 */
function shallow (buffer) {
    validate(buffer);

    //workaround for faster browser creation
    //avoid extra checks & copying inside of AudioBuffer class
    if (isBrowser) {
        return AudioBuffer.context.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
    }

    return create(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
}


/**
 * Create clone of a buffer
 */
function clone (buffer) {
    return copy(buffer, shallow(buffer));
}


/**
 * Reverse samples in each channel
 */
function reverse (buffer, target) {
    validate(buffer);

    if (target) {
        validate(target);
        copy(buffer, target);
    }
    else {
        target = buffer;
    }

    for (var i = 0, c = target.numberOfChannels; i < c; ++i) {
        target.getChannelData(i).reverse();
    }

    return target;
}


/**
 * Invert amplitude of samples in each channel
 */
function invert (buffer, target, start, end) {
    return fill(buffer, target, function (sample) { return -sample; }, start, end);
}


/**
 * Fill with zeros
 */
function zero (buffer, target, start, end) {
    return fill(buffer, target, 0, start, end);
}


/**
 * Fill with white noise
 */
function noise (buffer, target, start, end) {
    return fill(buffer, target, function (sample) { return Math.random() * 2 - 1; }, start, end);
}


/**
 * Test whether two buffers are the same
 */
function equal (bufferA, bufferB) {
    //walk by all the arguments
    if (arguments.length > 2) {
        for (var i = 0, l = arguments.length - 1; i < l; i++) {
            if (!equal(arguments[i], arguments[i + 1])) return false;
        }
        return true;
    }

    validate(bufferA);
    validate(bufferB);

    if (bufferA.length !== bufferB.length || bufferA.numberOfChannels !== bufferB.numberOfChannels) return false;

    for (var channel = 0; channel < bufferA.numberOfChannels; channel++) {
        var dataA = bufferA.getChannelData(channel);
        var dataB = bufferB.getChannelData(channel);

        for (var i = 0; i < dataA.length; i++) {
            if (dataA[i] !== dataB[i]) return false;
        }
    }

    return true;
}


/**
 * A helper to return slicing offset
 */
function getStart (pos, len) {
    if (pos == null) return 0;
    return pos < 0 ? (len + (pos % len)) : Math.min(len, pos);
}
function getEnd (pos, len) {
    if (pos == null) return len;
    return pos < 0 ? (len + (pos % len)) : Math.min(len, pos);
}


/**
 * Generic in-place fill/transform
 */
function fill (buffer, target, value, start, end) {
    validate(buffer);

    //resolve optional target arg
    if (!isAudioBuffer(target) && target != null) {
        end = start;
        start = value;
        value = target;
        target = null;
    }

    if (target) {
        validate(target);
    }
    else {
        target = buffer;
    }

    //resolve optional start/end args
    start = getStart(start, buffer.length);
    end = getEnd(end, buffer.length);

    //resolve type of value
    if (!(value instanceof Function)) {
        var fn = function () {return value;};
    }
    else {
        var fn = value;
    }

    for (var channel = 0, c = buffer.numberOfChannels; channel < c; channel++) {
        var data = buffer.getChannelData(channel),
            targetData = target.getChannelData(channel),
            l = buffer.length;
        for (var i = start; i < end; i++) {
            targetData[i] = fn.call(buffer, data[i], channel, i, data);
        }
    }

    return target;
}


/**
 * Return sliced buffer
 */
function slice (buffer, start, end) {
    validate(buffer);

    start = getStart(start, buffer.length);
    end = getEnd(end, buffer.length);

    var data = [];
    for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
        data.push(buffer.getChannelData(channel).slice(start, end));
    }
    return create(buffer.numberOfChannels, data, buffer.sampleRate);
}


/**
 * Return new buffer, mapped by a function.
 * Similar to transform, but keeps initial buffer untouched
 */
function map (buffer, fn) {
    validate(buffer);

    var data = [];

    for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
        data.push(buffer.getChannelData(channel).map(function (value, idx) {
            return fn.call(buffer, value, channel, idx, data);
        }));
    }

    return create(buffer.numberOfChannels, data, buffer.sampleRate);
}


/**
 * Concat buffer with other buffer(s)
 */
function concat (bufferA, bufferB) {
    //walk by all the arguments
    if (arguments.length > 2) {
        var result = bufferA;
        for (var i = 1, l = arguments.length; i < l; i++) {
            result = concat(result, arguments[i]);
        }
        return result;
    }

    validate(bufferA);
    validate(bufferB);

    var data = [];
    var channels = Math.max(bufferA.numberOfChannels, bufferB.numberOfChannels);
    var length = bufferA.length + bufferB.length;

    //FIXME: there might be required more thoughtful resampling, but now I'm lazy sry :(
    var sampleRate = Math.max(bufferA.sampleRate, bufferB.sampleRate);

    for (var channel = 0; channel < channels; channel++) {
        var channelData = new Float32Array(length);

        if (channel < bufferA.numberOfChannels) {
            channelData.set(bufferA.getChannelData(channel));
        }

        if (channel < bufferB.numberOfChannels) {
            channelData.set(bufferB.getChannelData(channel), bufferA.length);
        }

        data.push(channelData);
    }

    return create(channels, data, sampleRate);
}


/**
 * Change the length of the buffer, by trimming or filling with zeros
 */
function resize (buffer, length) {
    validate(buffer);

    if (length < buffer.length) return slice(buffer, 0, length);

    return concat(buffer, create(length - buffer.length));
}



/**
 * Shift content of the buffer in circular fashion
 */
function rotate (buffer, offset) {
    validate(buffer);

    for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
        var cData = buffer.getChannelData(channel);
        var srcData = cData.slice();
        for (var i = 0, l = cData.length, idx; i < l; i++) {
            idx = (offset + (offset + i < 0 ? l + i : i )) % l;
            cData[idx] = srcData[i];
        }
    }

    return buffer;
}


/**
 * Shift content of the buffer
 */
function shift (buffer, offset) {
    validate(buffer);

    for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
        var cData = buffer.getChannelData(channel);
        if (offset > 0) {
            for (var i = cData.length - offset; i--;) {
                cData[i + offset] = cData[i];
            }
        }
        else {
            for (var i = -offset, l = cData.length - offset; i < l; i++) {
                cData[i + offset] = cData[i] || 0;
            }
        }
    }

    return buffer;
}



/**
 * Reduce buffer to a single metric, e. g. average, max, min, volume etc
 */
function reduce (buffer, fn, value, start, end) {
    validate(buffer);

    start = getStart(start, buffer.length);
    end = getEnd(end, buffer.length);

    if (value == null) value = 0;

    for (var channel = 0, c = buffer.numberOfChannels; channel < c; channel++) {
        var data = buffer.getChannelData(channel),
            l = buffer.length;
        for (var i = start; i < end; i++) {
            value = fn.call(buffer, value, data[i], channel, i, data);
        }
    }

    return value;
}


/**
 * Normalize buffer by the maximum value,
 * limit values by the -1..1 range
 */
function normalize (buffer, target, start, end) {
    validate(buffer);

    //resolve optional target arg
    if (!isAudioBuffer(target)) {
        end = start;
        start = target;
        target = null;
    }

    if (target) {
        validate(target);
    }
    else {
        target = buffer;
    }

    var max = reduce(buffer, function (prev, curr) {
        return Math.max(Math.abs(prev), Math.abs(curr));
    }, 0, start, end);

    var amp = 1 / Math.min(max, 1);

    return fill(buffer, target, function (value) {
        return Math.min(value * amp, 1);
    }, start, end);
}


/**
 * Trim sound (remove zeros from the beginning and the end)
 */
function trim (buffer, level) {
    return trimInternal(buffer, level, true, true);
}

function trimStart (buffer, level) {
    return trimInternal(buffer, level, true, false);
}

function trimEnd (buffer, level) {
    return trimInternal(buffer, level, false, true);
}

function trimInternal(buffer, level, trimLeft, trimRight) {
    validate(buffer);

    level = (level == null) ? 0 : Math.abs(level);

    var start, end;

    if (trimLeft) {
        start = buffer.length;
        //FIXME: replace with indexOF
        for (var channel = 0, c = buffer.numberOfChannels; channel < c; channel++) {
            var data = buffer.getChannelData(channel);
            for (var i = 0; i < data.length; i++) {
                if (i > start) break;
                if (Math.abs(data[i]) > level) {
                    start = i;
                    break;
                }
            }
        }
    } else {
        start = 0;
    }

    if (trimRight) {
        end = 0;
        //FIXME: replace with lastIndexOf
        for (var channel = 0, c = buffer.numberOfChannels; channel < c; channel++) {
            var data = buffer.getChannelData(channel);
            for (var i = data.length - 1; i >= 0; i--) {
                if (i < end) break;
                if (Math.abs(data[i]) > level) {
                    end = i + 1;
                    break;
                }
            }
        }
    } else {
        end = buffer.length;
    }

    return slice(buffer, start, end);
}


/**
 * Mix current buffer with the other one.
 * The reason to modify bufferA instead of returning the new buffer
 * is reduced amount of calculations and flexibility.
 * If required, the cloning can be done before mixing, which will be the same.
 */
function mix (bufferA, bufferB, weight, offset) {
    validate(bufferA);
    validate(bufferB);

    if (weight == null) weight = 0.5;
    var fn = weight instanceof Function ? weight : function (a, b) {
        return a * (1 - weight) + b * weight;
    };

    if (offset == null) offset = 0;
    else if (offset < 0) offset += bufferA.length;

    for (var channel = 0; channel < bufferA.numberOfChannels; channel++) {
        var aData = bufferA.getChannelData(channel);
        var bData = bufferB.getChannelData(channel);

        for (var i = offset, j = 0; i < bufferA.length && j < bufferB.length; i++, j++) {
            aData[i] = fn.call(bufferA, aData[i], bData[j], channel, j);
        }
    }

    return bufferA;
}


/**
 * Size of a buffer, in bytes
 */
function size (buffer) {
    validate(buffer);

    return buffer.numberOfChannels * buffer.getChannelData(0).byteLength;
}


/**
 * Return array with buffer’s per-channel data
 */
function data (buffer, data) {
    validate(buffer);

    //ensure output data array, if not defined
    data = data || [];

    //transfer data per-channel
    for (var channel = 0; channel < buffer.numberOfChannels; channel++) {
        if (ArrayBuffer.isView(data[channel])) {
            data[channel].set(buffer.getChannelData(channel));
        }
        else {
            data[channel] = buffer.getChannelData(channel);
        }
    }

    return data;
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * AudioBuffer class
 *
 * @module audio-buffer/buffer
 */


var isBuffer = __webpack_require__(80);
var b2ab = __webpack_require__(81);
var isBrowser = __webpack_require__(27);
var isAudioBuffer = __webpack_require__(28);
var context = __webpack_require__(86);


/**
 * @constructor
 *
 * @param {∀} data Any collection-like object
 */
function AudioBuffer (channels, data, sampleRate) {
	if (!(this instanceof AudioBuffer)) return new AudioBuffer(channels, data, sampleRate);

	//if one argument only - it is surely data or length
	//having new AudioBuffer(2) does not make sense as 2 - number of channels
	if (data == null) {
		data = channels || 1;
		channels = null;
	}
	//audioCtx.createBuffer() - complacent arguments
	else {
		if (sampleRate != null) this.sampleRate = sampleRate;
		else if (isBrowser) this.sampleRate = AudioBuffer.context.sampleRate;
		if (channels != null) this.numberOfChannels = channels;
	}

	//if AudioBuffer(channels?, number, rate?) = create new array
	//this is the default WAA-compatible case
	if (typeof data === 'number') {
		this.length = data;
		this.data = new AudioBuffer.FloatArray(data * this.numberOfChannels);
	}
	//if other audio buffer passed - create fast clone of it
	//if WAA AudioBuffer - get buffer’s data (it is bounded)
	else if (isAudioBuffer(data)) {
		this.length = data.length;
		if (channels == null) this.numberOfChannels = data.numberOfChannels;
		if (sampleRate == null) this.sampleRate = data.sampleRate;

		this.data = new AudioBuffer.FloatArray(this.length * this.numberOfChannels);

		//copy channel's data
		for (var i = 0, l = this.numberOfChannels; i < l; i++) {
			this.data.set(data.getChannelData(i), i * this.length);
		}
	}
	//TypedArray, Buffer, DataView etc, or ArrayBuffer
	//NOTE: node 4.x+ detects Buffer as ArrayBuffer view
	else if (ArrayBuffer.isView(data) || data instanceof ArrayBuffer || isBuffer(data)) {
		if (isBuffer(data)) {
			data = b2ab(data);
		}
		if (!(data instanceof AudioBuffer.FloatArray)) {
			data = new AudioBuffer.FloatArray(new Float32Array(data.buffer || data));
		}

		this.length = data.length / this.numberOfChannels;
		this.data = data;
	}
	//if array - parse channeled data
	else if (Array.isArray(data)) {
		//if separated data passed already - send sub-arrays to channels
		if (data[0] instanceof Object) {
			if (channels == null) this.numberOfChannels = data.length;
			this.length = data[0].length;
			this.data = new AudioBuffer.FloatArray(this.length * this.numberOfChannels);
			for (var i = 0; i < this.numberOfChannels; i++ ) {
				this.data.set(data[i], i * this.length);
			}
		}
		//plain array passed - split array equipartially
		else {
			this.length = Math.floor(data.length / this.numberOfChannels);
			//detect zero-arrays
			if (data[0] == null) data = this.length;
			this.data = new AudioBuffer.FloatArray(data);
		}
	}
	//if ndarray, typedarray or other data-holder passed - redirect plain databuffer
	else if (data && (data.data || data.buffer)) {
		return new AudioBuffer(this.numberOfChannels, data.data || data.buffer, this.sampleRate);
	}
	//if other - unable to parse arguments
	else {
		throw Error('Failed to create buffer: check provided arguments');
	}


	//for browser - just return WAA buffer
	if (AudioBuffer.isWAA) {
		//create WAA buffer
		var audioBuffer = AudioBuffer.context.createBuffer(this.numberOfChannels, this.length, this.sampleRate);

		//fill channels
		for (var i = 0; i < this.numberOfChannels; i++) {
			audioBuffer.getChannelData(i).set(this.getChannelData(i));
		}

		return audioBuffer;
	}

	this.duration = this.length / this.sampleRate;
};

/** Type of storage to use */
AudioBuffer.FloatArray = typeof Float64Array === 'undefined' ? Float32Array : Float64Array;


/** Set context, though can be redefined */
AudioBuffer.context = context;


/** Whether WebAudioBuffer should be created */
AudioBuffer.isWAA = isBrowser && context.createBuffer;


/**
 * Default params
 */
AudioBuffer.prototype.numberOfChannels = 2;
AudioBuffer.prototype.sampleRate = AudioBuffer.context.sampleRate || 44100;


/**
 * Return data associated with the channel.
 *
 * @return {Array} Array containing the data
 */
AudioBuffer.prototype.getChannelData = function (channel) {
	//FIXME: ponder on this, whether we really need that rigorous check, it may affect performance
	if (channel >= this.numberOfChannels || channel < 0 || channel == null) throw Error('Cannot getChannelData: channel number (' + channel + ') exceeds number of channels (' + this.numberOfChannels + ')');

	return this.data.subarray(channel * this.length, (channel + 1) * this.length);
};


/**
 * Place data to the destination buffer, starting from the position
 */
AudioBuffer.prototype.copyFromChannel = function (destination, channelNumber, startInChannel) {
	var offset = channelNumber * this.length;
	if (startInChannel == null) startInChannel = 0;
	for (var i = startInChannel, j = 0; i < this.length && j < destination.length; i++, j++) {
		destination[j] = this.data[offset + i];
	}
};


/**
 * Place data from the source to the channel, starting (in self) from the position
 * Clone of WAAudioBuffer
 */
AudioBuffer.prototype.copyToChannel = function (source, channelNumber, startInChannel) {
	var offset = channelNumber * this.length;

	if (!startInChannel) startInChannel = 0;

	for (var i = startInChannel, j = 0; i < this.length && j < source.length; i++, j++) {
		this.data[offset + i] = source[j];
	}
};


module.exports = AudioBuffer;


/***/ }),
/* 80 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {(function(root) {
  var isArrayBufferSupported = (new Buffer(0)).buffer instanceof ArrayBuffer;

  var bufferToArrayBuffer = isArrayBufferSupported ? bufferToArrayBufferSlice : bufferToArrayBufferCycle;

  function bufferToArrayBufferSlice(buffer) {
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  }

  function bufferToArrayBufferCycle(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return ab;
  }

  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = bufferToArrayBuffer;
    }
    exports.bufferToArrayBuffer = bufferToArrayBuffer;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return bufferToArrayBuffer;
    });
  } else {
    root.bufferToArrayBuffer = bufferToArrayBuffer;
  }
})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(82).Buffer))

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(83)
var ieee754 = __webpack_require__(84)
var isArray = __webpack_require__(85)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 84 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 85 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cache = {}

module.exports = function getContext (options) {
	if (typeof window === 'undefined') return null
	
	var OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext
	var Context = window.AudioContext || window.webkitAudioContext
	
	if (!Context) return null

	if (typeof options === 'number') {
		options = {sampleRate: options}
	}

	var sampleRate = options && options.sampleRate


	if (options && options.offline) {
		if (!OfflineContext) return null

		return new OfflineContext(options.channels || 2, options.length, sampleRate || 44100)
	}


	//cache by sampleRate, rather strong guess
	var ctx = cache[sampleRate]

	if (ctx) return ctx

	//several versions of firefox have issues with the
	//constructor argument
	//see: https://bugzilla.mozilla.org/show_bug.cgi?id=1361475
	try {
		ctx = new Context(options)
	}
	catch (err) {
		ctx = new Context()
	}
	cache[ctx.sampleRate] = cache[sampleRate] = ctx

	return ctx
}


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const InlineWorker = __webpack_require__(88);
let self = { __dummyVal: false };
const RecorderWorker = new InlineWorker(function () {
    let recLength = 0, recBuffers = [], sampleRate, numChannels;
    self.onmessage = function (e) {
        switch (e.data.command) {
            case 'init':
                init(e.data.config);
                break;
            case 'record':
                record(e.data.buffer);
                break;
            case 'exportWAV':
                exportWAV(e.data.type);
                break;
            case 'getBuffer':
                getBuffer();
                break;
            case 'clear':
                clear();
                break;
        }
    };
    function init(config) {
        sampleRate = config.sampleRate;
        numChannels = config.numChannels;
        initBuffers();
    }
    function record(inputBuffer) {
        for (var channel = 0; channel < numChannels; channel++) {
            recBuffers[channel].push(inputBuffer[channel]);
        }
        recLength += inputBuffer[0].length;
    }
    function exportWAV(type) {
        let buffers = [];
        for (let channel = 0; channel < numChannels; channel++) {
            buffers.push(mergeBuffers(recBuffers[channel], recLength));
        }
        let interleaved;
        if (numChannels === 2) {
            interleaved = interleave(buffers[0], buffers[1]);
        }
        else {
            interleaved = buffers[0];
        }
        let dataview = encodeWAV(interleaved);
        let audioBlob = new Blob([dataview], { type: type });
        self.postMessage({ command: 'exportWAV', data: audioBlob });
    }
    function getBuffer() {
        let buffers = [];
        for (let channel = 0; channel < numChannels; channel++) {
            buffers.push(mergeBuffers(recBuffers[channel], recLength));
        }
        self.postMessage({ command: 'getBuffer', data: buffers });
    }
    function clear() {
        recLength = 0;
        recBuffers = [];
        initBuffers();
    }
    function initBuffers() {
        for (let channel = 0; channel < numChannels; channel++) {
            recBuffers[channel] = [];
        }
    }
    function mergeBuffers(recBuffers, recLength) {
        let result = new Float32Array(recLength);
        let offset = 0;
        for (let i = 0; i < recBuffers.length; i++) {
            result.set(recBuffers[i], offset);
            offset += recBuffers[i].length;
        }
        return result;
    }
    function interleave(inputL, inputR) {
        let length = inputL.length + inputR.length;
        let result = new Float32Array(length);
        let index = 0, inputIndex = 0;
        while (index < length) {
            result[index++] = inputL[inputIndex];
            result[index++] = inputR[inputIndex];
            inputIndex++;
        }
        return result;
    }
    function floatTo16BitPCM(output, offset, input) {
        for (let i = 0; i < input.length; i++, offset += 2) {
            let s = Math.max(-1, Math.min(1, input[i]));
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }
    }
    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    }
    function encodeWAV(samples) {
        let buffer = new ArrayBuffer(44 + samples.length * 2);
        let view = new DataView(buffer);
        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 4, true);
        view.setUint16(32, numChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, samples.length * 2, true);
        floatTo16BitPCM(view, 44, samples);
        return view;
    }
}, self);
RecorderWorker.onmessage = (e) => {
    let cb = this.callbacks[e.data.command].pop();
    if (typeof cb == 'function') {
        cb(e.data.data);
    }
};
/* harmony default export */ __webpack_exports__["a"] = (RecorderWorker);


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var WORKER_ENABLED = !!(global === global.window && global.URL && global.Blob && global.Worker);

function InlineWorker(func, self) {
  var _this = this;
  var functionBody;

  self = self || {};

  if (WORKER_ENABLED) {
    functionBody = func.toString().trim().match(
      /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
    )[1];

    return new global.Worker(global.URL.createObjectURL(
      new global.Blob([ functionBody ], { type: "text/javascript" })
    ));
  }

  function postMessage(data) {
    setTimeout(function() {
      _this.onmessage({ data: data });
    }, 0);
  }

  this.self = self;
  this.self.postMessage = postMessage;

  setTimeout(func.bind(self, self), 0);
}

InlineWorker.prototype.postMessage = function postMessage(data) {
  var _this = this;

  setTimeout(function() {
    _this.self.onmessage({ data: data });
  }, 0);
};

module.exports = InlineWorker;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Loop {
    constructor(context) {
        this.activeBufferSource = null;
        this.buffer = null;
        this.context = context;
        this.startOffset = 0;
        this.overdubCount = 0;
        this.output = this.context.createGain();
    }
    play(time = this.context.currentTime) {
        time = time + this.startOffset;
        let source = this.context.createBufferSource();
        source.buffer = this.buffer;
        source.connect(this.output);
        source.start(time);
        this.activeBufferSource = source;
    }
    stop() {
        if (this.activeBufferSource) {
            this.activeBufferSource.stop(this.context.currentTime);
            this.activeBufferSource = null;
        }
    }
    lowerVolume(volumeReduceAmount = 1) {
        this.output.gain.value /= volumeReduceAmount;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Loop);


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_utils__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_CanvasUtils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MultiTouch__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Constants_Defaults__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Utils_Audio_scales__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index__ = __webpack_require__(3);







class Harp {
    constructor(canvas) {
        this.canvas = canvas;
        this.lines = 32;
        this.octavesToDisplay = 3;
        this.activeTouches = {};
        this.pixelRatio = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_CanvasUtils__["c" /* getPixelRatio */])();
        this.colors = [];
        Object(__WEBPACK_IMPORTED_MODULE_1__Utils_CanvasUtils__["a" /* canvasRenderAtPixelRatio */])(this.canvas);
        this.touches = new __WEBPACK_IMPORTED_MODULE_0__Utils_utils__["a" /* IdentifierIndexMap */]();
        new __WEBPACK_IMPORTED_MODULE_2__MultiTouch__["a" /* default */](this.canvas, {
            onMouseDown: this.onPointerDown.bind(this),
            onMouseUp: this.onPointerUp.bind(this),
            onMouseMove: this.onPointerMove.bind(this),
            onTouchStart: this.onPointerDown.bind(this),
            onTouchEnd: this.onPointerUp.bind(this),
            onTouchMove: this.onPointerMove.bind(this),
        });
    }
    draw(scale) {
        const ctx = this.canvas.getContext('2d');
        if (!ctx)
            return;
        const w = this.canvas.width / this.pixelRatio;
        const h = this.canvas.height / this.pixelRatio;
        const { lines } = this;
        const lineWidth = w / lines;
        const borderWidth = 1;
        ctx.clearRect(0, 0, w, h);
        const p5 = Object(__WEBPACK_IMPORTED_MODULE_4__Utils_Audio_scales__["d" /* getPerfectFifthIndex */])(scale);
        const color1 = 'rgba(255, 105, 105, 0.5)';
        const color2 = 'rgba(255, 105, 105, 0.15)';
        const colorBorder = 'rgba(255, 105, 105, 1)';
        for (let i = 0; i < lines; i++) {
            if (i % scale.length === 0) {
                ctx.fillStyle = color1;
                ctx.fillRect(i * lineWidth, 0, lineWidth + 1, h);
            }
            if (i % scale.length === p5) {
                ctx.fillStyle = color2;
                ctx.fillRect(i * lineWidth, 0, lineWidth + 1, h);
            }
            ctx.fillStyle = colorBorder;
            ctx.fillRect(i * lineWidth, 0, borderWidth, h);
        }
    }
    onPointerDown(e, id) {
        const index = this.touches.Add(id);
        const pos = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_CanvasUtils__["b" /* getCoordinateFromEventAsPercentageWithinElement */])(e, this.canvas);
        const noteIndex = this._getNoteIndexFromPosition(pos.x);
        this.activeTouches[id] = noteIndex;
        __WEBPACK_IMPORTED_MODULE_5__index__["Omni"].audio.harpNoteOn(noteIndex, pos.y, index);
    }
    onPointerUp(e, id) {
        delete this.activeTouches[id];
    }
    onPointerMove(e, id) {
        const index = this.touches.GetIndexFromIdentifier(id);
        const { x, y } = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_CanvasUtils__["b" /* getCoordinateFromEventAsPercentageWithinElement */])(e, this.canvas);
        const noteIndex = this._getNoteIndexFromPosition(x);
        if (this.activeTouches[id] === noteIndex) {
        }
        else {
            this.activeTouches[id] = noteIndex;
            __WEBPACK_IMPORTED_MODULE_5__index__["Omni"].audio.harpNoteOff(index);
            __WEBPACK_IMPORTED_MODULE_5__index__["Omni"].audio.harpNoteOn(noteIndex, y, index);
        }
    }
    onKeyDown(key) {
        __WEBPACK_IMPORTED_MODULE_5__index__["Omni"].audio.harpNoteOn(key, undefined, -1);
    }
    onResize() {
        Object(__WEBPACK_IMPORTED_MODULE_1__Utils_CanvasUtils__["a" /* canvasRenderAtPixelRatio */])(this.canvas);
    }
    updateScale(scale, rootNoteIdx = 0) {
        const len = scale.length;
        const p5 = Object(__WEBPACK_IMPORTED_MODULE_4__Utils_Audio_scales__["d" /* getPerfectFifthIndex */])(scale);
        let colors = [];
        colors[0] = 'FF6969';
        colors[p5] = 'FFC3C3';
        for (let i = 0; i < len; i++) {
            if (!colors[i]) {
                colors[i] = (i % 2 === 0) ? __WEBPACK_IMPORTED_MODULE_3__Constants_Defaults__["a" /* palette */].green : __WEBPACK_IMPORTED_MODULE_3__Constants_Defaults__["a" /* palette */].blue;
            }
        }
        this.lines = (len * this.octavesToDisplay) + 1;
        this.colors = colors;
        __WEBPACK_IMPORTED_MODULE_5__index__["Omni"].audio.scale = scale;
        __WEBPACK_IMPORTED_MODULE_5__index__["Omni"].audio.rootNoteIdx = rootNoteIdx;
        this.draw(scale);
    }
    _getNoteIndexFromPosition(x) {
        return Math.floor(x * this.lines);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (Harp);


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isCordovaIOS */
const noOp = () => { };
/* unused harmony export noOp */

class IdentifierIndexMap {
    constructor() {
        this.identifiers = new Map();
    }
    GetIndexFromIdentifier(identifier) {
        return this.identifiers.get(identifier) || 0;
    }
    Remove(identifier) {
        this.identifiers.delete(identifier);
    }
    Add(identifier) {
        let num = 0;
        for (let value of this.identifiers.values()) {
            if (value === num) {
                num++;
            }
        }
        this.identifiers.set(identifier, num);
        return num;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IdentifierIndexMap;

function isCordovaIOS() {
    return !!window.cordova && window.cordova.platformId === 'ios';
}


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const WAVEFORMS = [
    'sine',
    'square',
    'triangle',
    'sawtooth',
];
/* unused harmony export WAVEFORMS */

const palette = {
    grey: 'rgb(198,199,192)',
    green: 'rgb(222,250,214)',
    blue: 'rgb(194,227,252)',
    peach: 'rgb(252,224,204)',
    pink: 'rgb(248,204,228)',
    lightBlue: 'rgb(215,251,247)',
    yellow: 'rgb(250,230,176)',
    white: 'rgb(254,254,245)',
};
/* harmony export (immutable) */ __webpack_exports__["a"] = palette;

const colors = [
    'rgba(210,211,209,1)',
    'rgb(222,250,214)',
    'rgb(194,227,252)',
    'rgb(252,224,204)',
    'rgb(248,204,228)',
    'rgb(222,250,214)',
    'rgb(194,227,252)',
];
const DEFAULTS = {
    Analyser: {
        maxDecibels: -25,
        minDecibels: -100,
        smoothingTimeConstant: 0.85,
    },
    Envelope: {
        attack: 0.01,
        decay: 0.5,
        sustain: 0.5,
        release: 0.01,
    },
    NoteGuideButton: false,
    PitchMultiplier: 15,
    PitchRampTime: 0.2,
    Sliders: {
        delay: {
            max: 0.5,
            min: 0,
            name: 'delay',
            step: 0.001,
            transformValue: (value) => {
                return (value * 1000).toFixed();
            },
            unTransformValue: (value) => {
                return (value / 1000).toFixed();
            },
            value: 0.225,
        },
        feedback: {
            max: 1,
            min: 0,
            name: 'feedback',
            step: 0.001,
            transformValue: (value) => {
                return (value * 100).toFixed();
            },
            unTransformValue: (value) => {
                return (value / 100).toFixed();
            },
            value: 0.5,
        },
        scuzz: {
            max: 1000,
            min: 0,
            name: 'scuzz',
            step: 1,
            transformValue: (value) => {
                return (value).toFixed();
            },
            unTransformValue: (value) => {
                return (value).toFixed();
            },
            value: 50,
            waveform: 'sine',
        },
    },
    Title: 'Theremin',
    Copy: {
        en: {
            renderingAudio: 'Rendering audio file. Please wait...',
            filename: 'theremin.wav',
            recordingTooLong: 'The recording is too large. Try a shorter length.',
            cantShare: `Can't share file`,
            sharePrompt: 'Would you like to share your recording?',
            startText: 'Start',
            resumeText: 'Resume',
            downloadPrompt: 'Would you like to download your recording?',
        },
    },
    VoiceCount: 8,
    Volume: 10,
    Waveform: 2,
};
/* unused harmony export DEFAULTS */



/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MultiTouch__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_number__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__ = __webpack_require__(12);



class XYPad {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = 0.5;
        this.y = 0.3;
        this.buttonSize = 30;
        this.buttonColor = '#FF6969';
        this.zoom = 1;
        this.onChange = () => { };
        this.pixelRatio = Object(__WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__["c" /* getPixelRatio */])();
        Object(__WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__["a" /* canvasRenderAtPixelRatio */])(this.canvas);
        new __WEBPACK_IMPORTED_MODULE_0__MultiTouch__["a" /* default */](this.canvas, {
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
        if (!ctx)
            return;
        const w = this.canvas.width / this.pixelRatio;
        const h = this.canvas.height / this.pixelRatio;
        ctx.clearRect(0, 0, w, h);
        const buttonSize = this.buttonSize;
        const buttonSizeHalved = buttonSize / 2;
        const x = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_number__["f" /* numberWithinRange */])(w * this.x, buttonSizeHalved, w - buttonSizeHalved);
        const y = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_number__["f" /* numberWithinRange */])(h * (1 - this.y), buttonSizeHalved, h - buttonSizeHalved);
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
        this.onChange(this.x, this.y);
    }
    onPointerDown(e, id) {
        const pos = Object(__WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__["b" /* getCoordinateFromEventAsPercentageWithinElement */])(e, this.canvas, this.zoom);
        if (!e.shiftKey)
            this.x = pos.x;
        if (!e.metaKey)
            this.y = pos.y;
        this.render();
    }
    onPointerUp(e, id) {
        const pos = Object(__WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__["b" /* getCoordinateFromEventAsPercentageWithinElement */])(e, this.canvas, this.zoom);
        if (!e.shiftKey)
            this.x = pos.x;
        if (!e.metaKey)
            this.y = pos.y;
        this.render();
    }
    onPointerMove(e, id) {
        const pos = Object(__WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__["b" /* getCoordinateFromEventAsPercentageWithinElement */])(e, this.canvas, this.zoom);
        if (!e.shiftKey)
            this.x = pos.x;
        if (!e.metaKey)
            this.y = pos.y;
        this.render();
    }
    onResize() {
        Object(__WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__["a" /* canvasRenderAtPixelRatio */])(this.canvas);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (XYPad);


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MultiTouch__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Utils_Audio_scales__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Utils_array__ = __webpack_require__(5);





class PitchConstellation {
    constructor(el) {
        this.el = el;
        this.lines = 32;
        this.octavesToDisplay = 5;
        this._currentNote = -1;
        if (!this.el)
            return;
        new __WEBPACK_IMPORTED_MODULE_0__MultiTouch__["a" /* default */](this.el, {
            onMouseDown: this.onPointerDown.bind(this),
            onTouchStart: this.onPointerDown.bind(this),
            onMouseUp: this.onPointerUp.bind(this),
            onMouseMove: this.onPointerMove.bind(this),
            onTouchEnd: this.onPointerUp.bind(this),
            onTouchMove: this.onPointerMove.bind(this),
        });
    }
    distanceFromCenter(pos) {
        const x = (pos.x - 0.5) * 2;
        const y = (pos.y - 0.5) * 2;
        return { x, y };
    }
    getQuadrant({ x, y }) {
        if (x >= 0 && y >= 0) {
            return 1;
        }
        else if (x >= 0 && y < 0) {
            return 2;
        }
        else if (x < 0 && y < 0) {
            return 3;
        }
        else {
            return 4;
        }
    }
    getDodrant({ x, y }) {
        const quadrant = this.getQuadrant({ x, y });
        let dodtrant = 0;
        let dxy = x / y;
        if (quadrant === 1 || quadrant === 3) {
            if (dxy > 4) {
                dodtrant = 3;
            }
            else if (dxy > 1) {
                dodtrant = 2;
            }
            else if (dxy > 0.25) {
                dodtrant = 1;
            }
            else {
                dodtrant = 0;
            }
        }
        else if (quadrant === 2 || quadrant === 4) {
            if (dxy > -0.25) {
                dodtrant = 6;
            }
            else if (dxy > -1) {
                dodtrant = 5;
            }
            else if (dxy > -4) {
                dodtrant = 4;
            }
            else {
                dodtrant = 3;
            }
        }
        return ((quadrant > 2) ? dodtrant + 6 : dodtrant) % 12;
    }
    onPointerDown(e, id) {
        const pos = this.distanceFromCenter(Object(__WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__["b" /* getCoordinateFromEventAsPercentageWithinElement */])(e, this.el));
        const note = this.getDodrant(pos);
        __WEBPACK_IMPORTED_MODULE_1__index__["Omni"].audio.bassNoteOn(note);
        this._currentNote = note;
    }
    onPointerUp(e, id) {
        __WEBPACK_IMPORTED_MODULE_1__index__["Omni"].audio.bassNotesOff();
        this._currentNote = -1;
    }
    onPointerMove(e, id) {
        const pos = this.distanceFromCenter(Object(__WEBPACK_IMPORTED_MODULE_2__Utils_CanvasUtils__["b" /* getCoordinateFromEventAsPercentageWithinElement */])(e, this.el));
        const note = this.getDodrant(pos);
        if (this._currentNote !== note) {
            __WEBPACK_IMPORTED_MODULE_1__index__["Omni"].audio.bassNotesOff();
            __WEBPACK_IMPORTED_MODULE_1__index__["Omni"].audio.bassNoteOn(note);
        }
        this._currentNote = note;
    }
    drawLines(frequencies) {
        const newNumberOfLines = frequencies.length;
        if (!this.el)
            return;
        const currentLinesArray = Object(__WEBPACK_IMPORTED_MODULE_4__Utils_array__["c" /* nodeListToArray */])(this.el.children);
        const currentNumberOfLines = currentLinesArray.length;
        if (newNumberOfLines < currentNumberOfLines) {
            const diff = currentNumberOfLines - newNumberOfLines;
            let i = diff;
            while (i--) {
                currentLinesArray[i].remove();
                currentLinesArray.splice(i, 1);
            }
        }
        for (let i = 0; i < newNumberOfLines; i++) {
            const angle = Object(__WEBPACK_IMPORTED_MODULE_3__Utils_Audio_scales__["a" /* getDegreeWithin12 */])(frequencies[i]) * 30;
            if (currentLinesArray[i]) {
                (currentLinesArray[i]).style.transform = `rotate(${angle}deg)`;
            }
            else {
                const div = document.createElement('div');
                this.el.appendChild(div);
                div.style.transform = `rotate(${angle}deg)`;
            }
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (PitchConstellation);


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_selector__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils_number__ = __webpack_require__(6);



class ScaleSelector {
    constructor() {
        this.scaleNames = [];
        this.scaleDescriptions = [];
        this.scaleNameEls = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_selector__["a" /* $ */])('.js-scale-name');
        this.scaleDescriptionEl = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_selector__["a" /* $ */])('#scaleDescription')[0];
        this.scaleFrequenciesListEl = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_selector__["a" /* $ */])('#scaleFrequencies')[0];
        this.scaleNames = __WEBPACK_IMPORTED_MODULE_0__index__["Omni"].scales.map(scale => scale.name);
        this.scaleDescriptions = __WEBPACK_IMPORTED_MODULE_0__index__["Omni"].scales.map(scale => scale.description);
        console.log(__WEBPACK_IMPORTED_MODULE_0__index__["Omni"].scales);
        this.setTo(0);
    }
    setTo(idx) {
        this.scaleIdx = idx;
        this.render();
    }
    prev() {
        if (this.scaleIdx === 0) {
            this.setTo(this.scaleNames.length - 1);
        }
        else {
            this.setTo(this.scaleIdx - 1);
        }
    }
    next() {
        if (this.scaleIdx === this.scaleNames.length - 1) {
            this.setTo(0);
        }
        else {
            this.setTo(this.scaleIdx + 1);
        }
    }
    render() {
        __WEBPACK_IMPORTED_MODULE_0__index__["Omni"].setScale(this.scaleIdx);
        this.renderScaleName();
        this.renderScaleDescription();
        this.renderScaleFrequencyList();
    }
    renderScaleName() {
        if (this.scaleNameEls.length) {
            this.scaleNameEls.forEach(el => el.innerHTML = this.scaleNames[this.scaleIdx].toLowerCase());
        }
    }
    renderScaleDescription() {
        if (this.scaleDescriptionEl) {
            this.scaleDescriptionEl.innerHTML = this.scaleDescriptions[this.scaleIdx];
        }
    }
    renderScaleFrequencyList() {
        if (this.scaleFrequenciesListEl) {
            let stringToAppend = '';
            const frequencies = __WEBPACK_IMPORTED_MODULE_0__index__["Omni"].state.scale.frequencies;
            if (frequencies) {
                for (let i = 0; i < frequencies.length; i++) {
                    stringToAppend += `<li>${Object(__WEBPACK_IMPORTED_MODULE_2__Utils_number__["g" /* round */])(Object(__WEBPACK_IMPORTED_MODULE_2__Utils_number__["c" /* doubled */])(frequencies[i]), 1)}</li>`;
                }
            }
            this.scaleFrequenciesListEl.innerHTML = stringToAppend;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (ScaleSelector);


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_array__ = __webpack_require__(5);

class DroneSelector {
    constructor() {
        this.droneBtnElId = 'drone-selector-btn';
        this.droneSelectorEl = document.getElementById('drone-selector-buttons');
        this.droneLabels = ['1', '5'];
        this.droneSelectorBtnEls = [];
        this.droneIdx = -1;
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.addEventListeners();
        this.render();
    }
    setDrone(idx) {
        this.droneIdx = idx;
        if (idx >= 0) {
            console.log('start drone', idx + 1);
        }
        else {
            console.log('stop drone');
        }
    }
    getBtnPressedIdx(el) {
        return parseInt(el.id.split(`${this.droneBtnElId}-`)[1], 10);
    }
    onPointerUp(e) {
        if (this.droneSelectorEl) {
            this.droneSelectorEl.removeEventListener('mousemove', this.onMouseMove);
            this.droneSelectorEl.removeEventListener('touchmove', this.onTouchMove);
        }
    }
    onPointerDown(e) {
        e.preventDefault();
        if (this.droneSelectorEl) {
            this.droneSelectorEl.addEventListener('mousemove', this.onMouseMove);
            this.droneSelectorEl.addEventListener('touchmove', this.onTouchMove);
        }
        const el = e.target;
        const id = el.id;
        if (!id.startsWith(this.droneBtnElId))
            return;
        if (el.classList.contains('is-selected')) {
            this.setDrone(-1);
            this.removeAllActiveClasses();
        }
        else {
            const idx = this.getBtnPressedIdx(el);
            this.setDrone(idx);
            this.addActiveClass(el);
        }
    }
    onTouchMove(e) {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.changedTouches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        const id = el.id;
        this.pointerMove(el, id);
    }
    onMouseMove(e) {
        e.preventDefault();
        const el = e.target;
        const id = el.id;
        this.pointerMove(el, id);
    }
    pointerMove(el, id) {
        if (!id.startsWith(this.droneBtnElId))
            return;
        if (!el.classList.contains('.is-selected')) {
            const idx = this.getBtnPressedIdx(el);
            this.setDrone(idx);
            this.addActiveClass(el);
        }
    }
    addActiveClass(el) {
        this.removeAllActiveClasses();
        el.classList.add('is-selected');
    }
    removeAllActiveClasses() {
        this.droneSelectorBtnEls.forEach(el => el.classList.remove('is-selected'));
    }
    addEventListeners() {
        if (this.droneSelectorEl) {
            this.droneSelectorEl.addEventListener('mousedown', this.onPointerDown);
            this.droneSelectorEl.addEventListener('touchstart', this.onPointerDown);
            this.droneSelectorEl.addEventListener('mouseup', this.onPointerUp);
            this.droneSelectorEl.addEventListener('touchend', this.onPointerUp);
        }
    }
    appendDroneButtons() {
        if (this.droneSelectorEl) {
            this.droneSelectorEl.innerHTML = this.getDroneElsList();
            this.droneSelectorBtnEls = Object(__WEBPACK_IMPORTED_MODULE_0__Utils_array__["c" /* nodeListToArray */])(this.droneSelectorEl.childNodes);
        }
    }
    getDroneElsList() {
        let buttonList = '';
        const numberOfDroneNotes = this.droneLabels.length;
        for (let i = 0; i < numberOfDroneNotes; i++) {
            buttonList += `<li id="drone-selector-btn-${i}">${this.droneLabels[i]}</li>`;
        }
        return buttonList;
    }
    render() {
        this.appendDroneButtons();
    }
}
/* harmony default export */ __webpack_exports__["a"] = (DroneSelector);


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_array__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(3);


class RootNoteSelector {
    constructor() {
        this.rootNoteSelectorContainerEl = document.getElementById('pitch-constellation-letters');
        this.rootNoteEls = [];
        this.keyIdx = 0;
        this.rootNoteLetters = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.isSelectedClass = 'is-selected';
        this.onPointerDown = this.onPointerDown.bind(this);
        this.addEventListeners();
        if (this.rootNoteSelectorContainerEl) {
            this.rootNoteEls = Object(__WEBPACK_IMPORTED_MODULE_0__Utils_array__["c" /* nodeListToArray */])(this.rootNoteSelectorContainerEl.children);
        }
    }
    setKey(idx) {
        this.keyIdx = idx;
        if (idx >= 0 && idx < this.rootNoteLetters.length) {
            __WEBPACK_IMPORTED_MODULE_1__index__["Omni"].setRootNote(idx);
            __WEBPACK_IMPORTED_MODULE_1__index__["Omni"].scaleSelector.renderScaleFrequencyList();
            this.addActiveClass(idx);
        }
    }
    getBtnPressedIdx(el) {
        return parseInt(el.id.split('n')[1], 10);
    }
    addEventListeners() {
        if (this.rootNoteSelectorContainerEl) {
            this.rootNoteSelectorContainerEl.addEventListener('mousedown', this.onPointerDown);
            this.rootNoteSelectorContainerEl.addEventListener('touchstart', this.onPointerDown);
        }
    }
    onPointerDown(e) {
        e.preventDefault();
        const idx = this.getBtnPressedIdx(e.target);
        this.setKey(idx);
    }
    addActiveClass(idx) {
        this.removeAllActiveClasses();
        if (this.rootNoteSelectorContainerEl && this.rootNoteEls.length === this.rootNoteLetters.length) {
            this.rootNoteEls[idx].classList.add(this.isSelectedClass);
        }
    }
    removeAllActiveClasses() {
        if (this.rootNoteSelectorContainerEl) {
            this.rootNoteEls.forEach(el => el.classList.remove(this.isSelectedClass));
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (RootNoteSelector);


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_array__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(3);


class FavScaleSelector {
    constructor() {
        this.favScaleSelectorEl = document.getElementById('fav-scale-buttons');
        this.addButtonEl = document.getElementById('addFavScaleBtn');
        this.favScaleBtnId = 'fav-selector-btn';
        this.favScaleBtnEls = [];
        this.favourites = [];
        this.maxAmount = 3;
        this._activeFavIdx = -1;
        this.onAddButtonPressed = this.onAddButtonPressed.bind(this);
        this.onScalePressed = this.onScalePressed.bind(this);
        this.addEventListeners();
        this.render();
    }
    addScaleToFavourites(scaleIdx) {
        if (this.favourites.indexOf(scaleIdx) === -1) {
            this.favourites.push(scaleIdx);
            if (this.favourites.length > this.maxAmount) {
                this.favourites.splice(0, 1);
            }
            this.render();
        }
    }
    getBtnPressedIdx(el) {
        return parseInt(el.id.split(`${this.favScaleBtnId}-`)[1], 10);
    }
    onAddButtonPressed(e) {
        e.preventDefault();
        this.addScaleToFavourites(__WEBPACK_IMPORTED_MODULE_1__index__["Omni"].state.scaleIdx);
    }
    onScalePressed(e) {
        e.preventDefault();
        const el = e.target;
        const scaleIdx = this.getBtnPressedIdx(el);
        __WEBPACK_IMPORTED_MODULE_1__index__["Omni"].scaleSelector.setTo(scaleIdx);
    }
    next() {
        this._incrementActiveIdx();
        console.log('change to ', this._activeFavIdx);
        __WEBPACK_IMPORTED_MODULE_1__index__["Omni"].scaleSelector.setTo(this.favourites[this._activeFavIdx]);
    }
    prev() {
        this._decrementActiveIdx();
        console.log('change to ', this._activeFavIdx);
        __WEBPACK_IMPORTED_MODULE_1__index__["Omni"].scaleSelector.setTo(this.favourites[this._activeFavIdx]);
    }
    setActiveClass(scaleIdx) {
        this.removeAllActiveClasses();
        const idx = this.favourites.indexOf(scaleIdx);
        if (idx !== -1) {
            const el = document.getElementById(`${this.favScaleBtnId}-${scaleIdx}`);
            if (el)
                el.classList.add('is-selected');
        }
        this._activeFavIdx = idx;
    }
    removeAllActiveClasses() {
        this.favScaleBtnEls.forEach(el => el.classList.remove('is-selected'));
    }
    addEventListeners() {
        if (this.addButtonEl) {
            this.addButtonEl.addEventListener('mousedown', this.onAddButtonPressed);
            this.addButtonEl.addEventListener('touchstart', this.onAddButtonPressed);
        }
        if (this.favScaleSelectorEl) {
            this.favScaleSelectorEl.addEventListener('mousedown', this.onScalePressed);
            this.favScaleSelectorEl.addEventListener('touchstart', this.onScalePressed);
        }
    }
    updateFavScaleButtons() {
        if (this.favScaleSelectorEl) {
            this.favScaleSelectorEl.innerHTML = this.favScaleBtnElsList;
            this.favScaleBtnEls = Object(__WEBPACK_IMPORTED_MODULE_0__Utils_array__["c" /* nodeListToArray */])(this.favScaleSelectorEl.childNodes);
        }
    }
    get favScaleBtnElsList() {
        let buttonList = '';
        const favsLength = this.favourites.length;
        for (let i = 0; i < favsLength; i++) {
            buttonList += `<li id="${this.favScaleBtnId}-${this.favourites[i]}">${__WEBPACK_IMPORTED_MODULE_1__index__["Omni"].scaleSelector.scaleNames[this.favourites[i]]}</li>`;
        }
        return buttonList;
    }
    render() {
        this.updateFavScaleButtons();
        this.setActiveClass(__WEBPACK_IMPORTED_MODULE_1__index__["Omni"].state.scaleIdx);
    }
    _incrementActiveIdx() {
        if (this._activeFavIdx >= this.favourites.length - 1) {
            this._activeFavIdx = 0;
        }
        else {
            this._activeFavIdx++;
        }
    }
    _decrementActiveIdx() {
        if (this._activeFavIdx <= 0) {
            this._activeFavIdx = this.favourites.length - 1;
        }
        else {
            this._activeFavIdx--;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (FavScaleSelector);


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils_selector__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_array__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils_number__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__(3);




var direction;
(function (direction) {
    direction[direction["prev"] = 0] = "prev";
    direction[direction["next"] = 1] = "next";
})(direction || (direction = {}));
class SettingsCarouselManager {
    constructor() {
        const carousels = Object(__WEBPACK_IMPORTED_MODULE_0__Utils_selector__["a" /* $ */])('[data-carousel]');
        carousels.forEach(carousel => {
            carousel.children[0].addEventListener('click', this.onChangeBtn.bind(this, carousel, direction.prev));
            carousel.children[carousel.children.length - 1].addEventListener('click', this.onChangeBtn.bind(this, carousel, direction.next));
        });
    }
    onChangeBtn(container, dir) {
        const carousel = Object(__WEBPACK_IMPORTED_MODULE_0__Utils_selector__["a" /* $ */])('[data-carousel=' + container.dataset.carousel + ']')[0];
        const items = Object(__WEBPACK_IMPORTED_MODULE_1__Utils_array__["c" /* nodeListToArray */])(carousel.children[1].children);
        const rotate = (carousel.dataset['carouselRotate'] === 'false') ? false : true;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.classList.contains('is-selected')) {
                item.classList.remove('is-selected');
                let newIdx;
                if (rotate) {
                    const updateIdx = dir === direction.next ? __WEBPACK_IMPORTED_MODULE_2__Utils_number__["e" /* incrementWithinRange */] : __WEBPACK_IMPORTED_MODULE_2__Utils_number__["b" /* decrementWithinRange */];
                    newIdx = updateIdx(i, 0, items.length - 1);
                }
                else {
                    if (dir === direction.next) {
                        newIdx = Object(__WEBPACK_IMPORTED_MODULE_2__Utils_number__["d" /* incrementIfWithinRange */])(i, items.length - 1);
                    }
                    else {
                        newIdx = Object(__WEBPACK_IMPORTED_MODULE_2__Utils_number__["a" /* decrementIfWithinRange */])(i, 0);
                    }
                }
                carousel.dataset['val'] = newIdx.toString();
                items[newIdx].classList.add('is-selected');
                if (this.isCorrespondingDuplicate(carousel)) {
                    return this.onChangeBtn(container, dir);
                }
                return this.carouselDidUpdate(this.getCarouselName(carousel), items[newIdx].dataset['val']);
            }
        }
    }
    isCorrespondingDuplicate(carousel) {
        const correspondingCarousel = this.getCorrespondingCarousel(carousel);
        if (correspondingCarousel && correspondingCarousel.dataset['val'] === carousel.dataset['val']) {
            return true;
        }
        return false;
    }
    getCorrespondingCarousel(carousel) {
        const carouselGroupID = carousel.dataset['carouselGroup'];
        if (carouselGroupID) {
            const groupedCarousels = Object(__WEBPACK_IMPORTED_MODULE_0__Utils_selector__["a" /* $ */])(`[data-carousel-group="${carouselGroupID}"]`);
            for (let i = 0; i < groupedCarousels.length; i++) {
                if (this.getCarouselName(groupedCarousels[i]) !== this.getCarouselName(carousel)) {
                    return groupedCarousels[i];
                }
            }
        }
    }
    getCarouselName(carousel) {
        return carousel.dataset['carousel'];
    }
    carouselDidUpdate(carousel, value) {
        switch (carousel) {
            case 'voices':
                __WEBPACK_IMPORTED_MODULE_3__index__["Omni"].setVoice(parseInt(value, 10));
                break;
            case 'xEffect':
                __WEBPACK_IMPORTED_MODULE_3__index__["Omni"].setXEffect(parseInt(value, 10));
                break;
            case 'yEffect':
                __WEBPACK_IMPORTED_MODULE_3__index__["Omni"].setYEffect(parseInt(value, 10));
                break;
            case 'octave':
                __WEBPACK_IMPORTED_MODULE_3__index__["Omni"].setHarpOctaves(parseInt(value, 10));
                break;
            case 'octaveOffset':
                __WEBPACK_IMPORTED_MODULE_3__index__["Omni"].setHarpOctaveOffset(parseInt(value, 10) - 1);
                break;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (SettingsCarouselManager);


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(3);

class LoopController {
    constructor(recordBtnEl, playBtnEl, downloadBtnEl) {
        this.recordBtnEl = recordBtnEl;
        this.playBtnEl = playBtnEl;
        this.downloadBtnEl = downloadBtnEl;
        this.onRecordPressed = this.onRecordPressed.bind(this);
        this.onPlayPressed = this.onPlayPressed.bind(this);
        this.onDownloadPressed = this.onDownloadPressed.bind(this);
        this.addEventListeners();
        this.render();
    }
    onRecordPressed(e) {
        e.preventDefault();
        __WEBPACK_IMPORTED_MODULE_0__index__["Omni"].audio.looper.recordBtnPressed();
        this.render();
        this.recordBtnEl.classList.add('has-loop');
    }
    onPlayPressed(e) {
        e.preventDefault();
        __WEBPACK_IMPORTED_MODULE_0__index__["Omni"].audio.looper.playBtnPressed();
        this.render();
    }
    onDownloadPressed() {
        __WEBPACK_IMPORTED_MODULE_0__index__["Omni"].audio.looper.exportWav((blob) => {
            const a = document.getElementById('downloadBtn');
            const date = new Date();
            a.href = window.URL.createObjectURL(blob);
            a.download = `Omni_${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
            a.innerText = 'Download';
        });
    }
    addEventListeners() {
        this.recordBtnEl.addEventListener('touchstart', this.onRecordPressed);
        this.recordBtnEl.addEventListener('mousedown', this.onRecordPressed);
        this.playBtnEl.addEventListener('touchstart', this.onPlayPressed);
        this.playBtnEl.addEventListener('mousedown', this.onPlayPressed);
        this.downloadBtnEl.addEventListener('touchstart', this.onDownloadPressed);
        this.downloadBtnEl.addEventListener('mousedown', this.onDownloadPressed);
    }
    resetClasses() {
        this.recordBtnEl.classList.remove('is-playing', 'is-recording', 'is-overdubbing');
        this.playBtnEl.classList.remove('is-playing', 'is-stopped');
    }
    render() {
        const state = __WEBPACK_IMPORTED_MODULE_0__index__["Omni"].audio.looper.state;
        this.resetClasses();
        switch (state) {
            case 'recording':
                this.recordBtnEl.classList.add('is-recording');
                break;
            case 'overdubbing':
                this.recordBtnEl.classList.add('is-overdubbing');
                break;
            case 'playing':
                this.recordBtnEl.classList.add('is-playing');
                this.playBtnEl.classList.add('is-playing');
                break;
            case 'stopped':
                break;
            default:
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = (LoopController);


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export midiToFreq */
/* unused harmony export freqToNote */
/* unused harmony export freqToMidi */
/* unused harmony export midiToNote */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Audio_scales__ = __webpack_require__(9);

const NOTE_STRINGS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
function midiToFreq(midi, tuning = 440) {
    return Math.pow(2, (midi - 69) / 12) * tuning;
}
function freqToNote(freq, tuning = 440) {
    return midiToNote(freqToMidi(freq, tuning));
}
function freqToMidi(freq, tuning = 440) {
    return Math.round(69 + (12 * ((Math.log(freq) - Math.log(tuning)) / Math.log(2))));
}
function midiToNote(midi) {
    return NOTE_STRINGS[midi % 12] + (Math.floor(midi / 12) - 1);
}
const _scales = [
    {
        name: 'Tuvan',
        intervals: [0, 2, 4, 6, 7, 9],
        description: `Also known as the 'Acoustic' or 'Overtone' scale, differs from the major scale in having a raised fourth and lowered seventh. Traditionally, the scale persists in the music of peoples of South Siberia, especially in Tuvan music.`
    },
    {
        name: 'Aeolian',
        intervals: [0, 2, 3, 5, 7, 8, 10],
        description: `The Aeolian mode is also known as the 'natural minor' scale and has the same notes as its relative major scale, but is built starting from the sixth note. On a piano using only white keys, the Aeolian mode would start from A`
    },
    {
        name: 'Algerian',
        intervals: [0, 2, 3, 6, 7, 8, 11],
        description: 'The Algerian Scale is a scale which is frequently found in Algerian, Berber, and North African music. The frequent use of 1.5 steps(or whole-and-a-half steps) in the scale helps create a sound which is commonly associated with Moorish music.'
    },
    {
        name: 'Altered',
        intervals: [0, 1, 3, 4, 6, 8, 10],
        description: ''
    },
    {
        name: 'Augmented',
        intervals: [0, 3, 4, 7, 8, 11],
        description: ''
    },
    {
        name: 'Blues',
        intervals: [0, 3, 5, 6, 7, 10],
        description: ''
    },
    {
        name: 'Dorian',
        intervals: [0, 2, 3, 5, 7, 9, 10],
        description: ''
    },
    {
        name: 'Harmonic Minor',
        intervals: [0, 2, 3, 5, 7, 8, 11],
        description: ''
    },
    {
        name: 'Hirajōshi',
        intervals: [0, 2, 3, 7, 8],
        description: 'Containing 5 notes from the minor scale, Hirajōshi was adapted from shamisen music for the koto, a japanese stringed instrument'
    },
    {
        name: 'Hungarian',
        intervals: [0, 2, 3, 6, 7, 8, 11],
        description: 'Hungarian gypsy scale is found by sharpening the 4th degree of the harmonic minor scale to introduce an additional gap. This is a symmetrical scale that is very common in Flamenco but also Carnatic music associated with Southern India'
    },
    {
        name: 'Insen',
        intervals: [0, 1, 5, 7, 10],
        description: 'A pentatonic scale adapted from shamisen music by Yatsuhashi Kengyō for the koto, a japanese stringed instrument'
    },
    {
        name: 'Major',
        intervals: [0, 2, 4, 5, 7, 9, 11],
        description: 'The major scale (or Ionian scale) is one of the most commonly used musical scales, especially in Western music.'
    },
    {
        name: 'Iwato',
        intervals: [0, 1, 5, 6, 10],
        description: 'Used in traditional Japanese music for the koto. It is a mode of the Hirajōshi scale.'
    },
    {
        name: 'Just',
        frequencies: [261.6255653006, 294.328760963175, 327.03195662575, 348.8340870674666, 392.4383479509, 436.04260883433335, 490.54793493862496],
        description: `Major scale using 'just' tuning. The frequencies of notes are related by ratios of small whole numbers. Any interval tuned in this way is called a pure or just interval. Pure intervals are important in music because they naturally tend to be perceived by humans as consonant: pleasing or satisfying. This differs from Equal Temperament where an octave is divided into 12 equal parts.`
    },
    {
        name: 'Lydian',
        intervals: [0, 2, 4, 6, 7, 9, 11],
        description: 'Similar to the major scale except the fourth note is raised half a step.'
    },
    {
        name: 'Pentatonic',
        intervals: [0, 2, 4, 7, 9],
        description: "This scale, found in virtually every culture in the world, is the major pentatonic, or five-note scale. Though it’s commonly used in modern music, it's thought to be one of the oldest. Bone flutes dated to around 50,000 years old were found tuned to the major pentatonic."
    },
    {
        name: 'Minor Pentatonic',
        intervals: [0, 3, 5, 7, 10],
        description: 'Like the major pentatonic, this is scale dates back to ancient times. Today, it’s as ubiquitous as ever as it offers a fantastic improvisational framework for jazz, blues and rock.'
    },
    {
        name: 'Minyō',
        intervals: [0, 2, 5, 7, 9],
        description: 'A pentatonic scale containing only major notes and is used in traditional Japanese folk music.'
    },
    {
        name: 'Korsakovian',
        intervals: [0, 2, 3, 5, 6, 8, 9, 11],
        description: 'In St. Petersburg at the turn of the 20th century, this scale had become so familiar in the circle of composers around Nikolai Rimsky-Korsakov that it was referred to there as the Korsakovian scale. This is also known as an Octatonic because unlike most other seven-note scales this contains eight'
    },
    {
        name: 'Persian',
        intervals: [0, 1, 4, 5, 6, 8, 11],
        description: 'Traditionally found in Iranian music.'
    },
    {
        name: 'Bayātī',
        intervals: [0, 1, 4, 5, 7, 8, 10],
        description: 'Also know as the Phrygian dominant or Freygish scale, this is most commonly found in Arabic and Egyptian music in which it is used in Hebrew prayers and Klezmer music.'
    },
    {
        name: 'Romanian',
        intervals: [0, 2, 3, 6, 7, 9, 10],
        description: 'Romanian minor or Ukranian Dorian scale'
    },
    {
        name: 'Whole Tone',
        intervals: [0, 2, 4, 6, 8, 10],
        description: ''
    },
    {
        name: 'Major Triad',
        intervals: [0, 4, 7],
        description: 'The three notes that make up a major chord include the root note, a major third and a perfect fifth. It is one of the basic building blocks of tonal music.'
    },
    {
        name: 'Minor Triad',
        intervals: [0, 3, 7],
        description: 'The minor chord, along with the major chord, is one of the basic building blocks of tonal music. In comparison with a major chord, minor has a darker and sadder sound.'
    },
    {
        name: 'Olympos',
        frequencies: [
            261.6255653006,
            279.06726965397,
            348.83408706747,
            372.08969287196,
            465.11211608996
        ],
        description: 'Scale of ancient Greek flutist Olympos, 6th century BC as reported by Partch'
    },
    {
        name: 'Microtonal Mixolydian',
        frequencies: [
            261.6255653006,
            294.32876096318,
            327.03195662575,
            359.73515228832,
            392.4383479509,
            425.14154361347,
            457.84473927605
        ],
        description: 'Henk Badings, harmonic scale, Lydomixolydisch'
    },
    {
        name: 'Bolivia',
        frequencies: [
            261.6255653006,
            315.83481057014,
            401.62159853282,
            478.71605466184,
            581.25458464818,
            714.36935367713,
            884.07587347381,
            1042.8816384286
        ],
        description: 'Observed scale from pan-pipe from La Paz. 1/1=171 Hz.'
    },
    {
        name: 'Burma',
        frequencies: [
            261.6255653006,
            287.71029735626,
            317.68827763215,
            350.39147881787,
            389.32370520689,
            429.81331927092,
            476.14308821464
        ],
        description: 'Burmese scale, von Hornbostel'
    },
    {
        name: 'Burt',
        frequencies: [
            261.6255653006,
            281.75060878526,
            332.06321749692,
            382.37582620857,
            387.40708707973,
            392.4383479509,
            397.46960882207,
            402.50086969323,
            503.12608711654,
            508.1573479877,
            513.18860885887,
            518.21986973003
        ],
        description: `Warren Burt's 13enhharm #3, February 19, 1996`
    },
    {
        name: 'Bushmen',
        frequencies: [
            261.6255653006,
            347.0163224393,
            394.26624244126,
            453.9405988926
        ],
        description: 'Observed scale of South-African San people, almost (4 notes) equal pentatonic'
    },
    {
        name: 'Gamelan',
        frequencies: [
            261.6255653006,
            286.1303811777,
            319.28416942365,
            390.63652710512,
            420.90734643474
        ],
        description: 'Gamelan Degung, Kabupaten Sukabumi. 1/1=363 Hz'
    },
    {
        name: 'diat enh',
        frequencies: [
            261.6255653006,
            269.29177952703,
            311.12698372208,
            349.22823143301,
            391.99543598175,
            403.48177901006,
            466.16376151809
        ],
        description: 'Diat. + Enharm. Diesis, Dorian Mode'
    },
    {
        name: 'Huang',
        frequencies: [
            261.6255653006,
            331.11985608357,
            392.4383479509,
            441.49314144476,
            588.65752192635,
            662.23971216714
        ],
        description: 'Chinese Huang Zhong qin tuning'
    },
    {
        name: 'Lusheng',
        frequencies: [
            261.6255653006,
            316.38258506467,
            348.82502010853,
            389.28772571905,
            466.97226207056,
            520.53801357752
        ],
        description: `Chinese Observed tuning of a small Lusheng, 1/1=d, OdC '97'`
    },
    {
        name: 'Xenakis',
        frequencies: [
            261.6255653006,
            274.52698453615,
            329.62755691287,
            349.22823143301,
            391.99543598175,
            411.32572372413,
            493.88330125613
        ],
        description: `A Byzantine Liturgical mode created by Greek-French composer and music theorist Iannis Xenakis.`
    },
    {
        name: `Mbira`,
        frequencies: [
            261.6255653006,
            293.15632631094,
            308.97787266236,
            346.21547002486,
            390.18821123181,
            462.40922843744,
            524.46149515038,
        ],
        description: `A tuning from an African N'Gundi Mbira instrument (thumb piano)`
    },
    {
        name: 'Sanza',
        frequencies: [
            261.6255653006,
            390.63923480058,
            465.35666077712,
            588.68812410589,
            663.45725712889,
            702.9084786129,
            783.08569314515
        ],
        description: 'A tuning taken from an African Baduma Sanza instrument (similar to an Mbira)'
    },
    {
        name: 'Đàn Tranh',
        frequencies: [
            261.6255653006,
            317.68818643644,
            348.83408706747,
            392.4383479509,
            473.41768959156,
            476.53227965466
        ],
        description: 'An observed tuning from a vietnamese plucked zither, Đàn tranh'
    },
    {
        name: 'Cons9',
        frequencies: [
            261.6255653006,
            327.03195662575,
            348.83408706747,
            392.4383479509,
            436.04260883433
        ],
        description: 'Set of just innotation ratios where numerator + denominator <= 9. (5/4(E), 4/3(F), 3/2(G), 5/3(A), 2/1(C))'
    },
    {
        name: 'Gunkali',
        frequencies: [
            261.6255653006,
            275.93321340298,
            282.55561052465,
            348.83408706747,
            392.4383479509,
            408.78994578219,
            418.60090448096
        ],
        description: 'Indian mode Gunkali, see Daniï¿½lou: Intr. to the Stud. of Mus. Scales, p.175'
    },
    {
        name: 'Gumbeng',
        frequencies: [
            261.6255653006,
            305.03156112838,
            348.43777142572,
            394.8168394034,
            470.9259392365,
            525.62941881859
        ],
        description: 'Scale of gumbeng ensemble, Java. 1/1=440 Hz.'
    },
    {
        name: 'Farey',
        frequencies: [
            261.6255653006,
            313.95067836072,
            348.83408706747,
            392.4383479509,
            418.60090448096
        ],
        description: 'Created from the Farey sequence, a mathematical construct'
    },
    {
        name: 'Raja',
        frequencies: [
            261.6255653006,
            275.58617649731,
            323.21709932123,
            347.81902735497,
            393.58362272115,
            410.77171881178,
            488.21056770985
        ],
        description: 'Observed Indian mode'
    },
    {
        name: 'Iraq',
        frequencies: [
            261.6255653006,
            290.3675288125,
            326.6631048533,
            348.83408706747,
            387.1561215731,
            435.55129321875,
            465.11211608996,
            516.20736538157
        ],
        description: 'Iraq 8-tone scale, Ellis'
    },
    {
        name: 'Harmonics',
        frequencies: [
            261.6255653006,
            327.03195662575,
            392.4383479509,
            457.84473927605
        ],
        description: 'Third octave of the harmonic overtone series'
    },
    {
        name: 'Hexany',
        frequencies: [
            261.6255653006,
            327.03195662575,
            348.83408706747,
            392.4383479509,
            418.60090448096
        ],
        description: '1.3.5.15 2)4 hexany (1.15 tonic) degenerate, symmetrical pentatonic'
    },
];
function convertIntervalsToFrequencies(scales) {
    const convertedScales = scales;
    for (let scale in scales) {
        const intervals = scales[scale].intervals;
        if (intervals) {
            convertedScales[scale].frequencies = intervals.map(s => Object(__WEBPACK_IMPORTED_MODULE_0__Audio_scales__["c" /* getFrequencyTET */])(s));
        }
    }
    return convertedScales;
}
const scales = convertIntervalsToFrequencies(_scales);
/* harmony export (immutable) */ __webpack_exports__["a"] = scales;



/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const show = (el) => {
    el.classList.add('is-active');
};
const hide = (el) => {
    el.classList.remove('is-active');
};
const toggle = (el) => {
    el.classList.toggle('is-hidden');
};
const playIntroScene = () => {
    const splashOverlay = document.getElementById('splashOverlay');
    if (!splashOverlay)
        return;
    show(splashOverlay);
    setTimeout(() => {
        splashOverlay.classList.add('anim-ended');
    }, 1500);
    setTimeout(() => {
        splashOverlay.style.display = 'none';
    }, 2500);
};
const initSettingsMenuControls = () => {
    const menuBtn = document.getElementById('menuBtn');
    const closeMenuBtn = document.getElementById('closeBtnSettings');
    const settingsOverlay = document.getElementById('settingsOverlay');
    if (!menuBtn || !settingsOverlay || !closeMenuBtn)
        return;
    menuBtn.addEventListener('click', function (e) {
        show(settingsOverlay);
    });
    closeMenuBtn.addEventListener('click', function (e) {
        hide(settingsOverlay);
    });
};
const initEffectPanelSwitcher = () => {
    const middleSection = document.getElementById('middle-section');
    const middleSwitch = document.getElementById('middle-switch');
    if (!middleSwitch || !middleSection)
        return;
    middleSwitch.addEventListener('click', function (e) {
        middleSection.classList.toggle('middle-section--2');
        middleSwitch.classList.toggle('icon-constellation');
        middleSwitch.classList.toggle('icon-xy');
    });
};
const getTheAppLinks = () => {
    const getTheApp = document.getElementById('getTheApp');
    getTheApp.addEventListener('click', (e) => {
        getTheApp.classList.toggle('is-open');
    });
};
const initViewController = () => {
    initSettingsMenuControls();
    initEffectPanelSwitcher();
    playIntroScene();
    getTheAppLinks();
};
/* harmony export (immutable) */ __webpack_exports__["a"] = initViewController;



/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * SVGInjector v1.1.3 - Fast, caching, dynamic inline SVG DOM injection library
 * https://github.com/iconic/SVGInjector
 *
 * Copyright (c) 2014-2015 Waybury <hello@waybury.com>
 * @license MIT
 */

(function (window, document) {

  'use strict';

  // Environment
  var isLocal = window.location.protocol === 'file:';
  var hasSvgSupport = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');

  function uniqueClasses(list) {
    list = list.split(' ');

    var hash = {};
    var i = list.length;
    var out = [];

    while (i--) {
      if (!hash.hasOwnProperty(list[i])) {
        hash[list[i]] = 1;
        out.unshift(list[i]);
      }
    }

    return out.join(' ');
  }

  /**
   * cache (or polyfill for <= IE8) Array.forEach()
   * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
   */
  var forEach = Array.prototype.forEach || function (fn, scope) {
    if (this === void 0 || this === null || typeof fn !== 'function') {
      throw new TypeError();
    }

    /* jshint bitwise: false */
    var i, len = this.length >>> 0;
    /* jshint bitwise: true */

    for (i = 0; i < len; ++i) {
      if (i in this) {
        fn.call(scope, this[i], i, this);
      }
    }
  };

  // SVG Cache
  var svgCache = {};

  var injectCount = 0;
  var injectedElements = [];

  // Request Queue
  var requestQueue = [];

  // Script running status
  var ranScripts = {};

  var cloneSvg = function (sourceSvg) {
    return sourceSvg.cloneNode(true);
  };

  var queueRequest = function (url, callback) {
    requestQueue[url] = requestQueue[url] || [];
    requestQueue[url].push(callback);
  };

  var processRequestQueue = function (url) {
    for (var i = 0, len = requestQueue[url].length; i < len; i++) {
      // Make these calls async so we avoid blocking the page/renderer
      /* jshint loopfunc: true */
      (function (index) {
        setTimeout(function () {
          requestQueue[url][index](cloneSvg(svgCache[url]));
        }, 0);
      })(i);
      /* jshint loopfunc: false */
    }
  };

  var loadSvg = function (url, callback) {
    if (svgCache[url] !== undefined) {
      if (svgCache[url] instanceof SVGSVGElement) {
        // We already have it in cache, so use it
        callback(cloneSvg(svgCache[url]));
      }
      else {
        // We don't have it in cache yet, but we are loading it, so queue this request
        queueRequest(url, callback);
      }
    }
    else {

      if (!window.XMLHttpRequest) {
        callback('Browser does not support XMLHttpRequest');
        return false;
      }

      // Seed the cache to indicate we are loading this URL already
      svgCache[url] = {};
      queueRequest(url, callback);

      var httpRequest = new XMLHttpRequest();

      httpRequest.onreadystatechange = function () {
        // readyState 4 = complete
        if (httpRequest.readyState === 4) {

          // Handle status
          if (httpRequest.status === 404 || httpRequest.responseXML === null) {
            callback('Unable to load SVG file: ' + url);

            if (isLocal) callback('Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver.');

            callback();
            return false;
          }

          // 200 success from server, or 0 when using file:// protocol locally
          if (httpRequest.status === 200 || (isLocal && httpRequest.status === 0)) {

            /* globals Document */
            if (httpRequest.responseXML instanceof Document) {
              // Cache it
              svgCache[url] = httpRequest.responseXML.documentElement;
            }
            /* globals -Document */

            // IE9 doesn't create a responseXML Document object from loaded SVG,
            // and throws a "DOM Exception: HIERARCHY_REQUEST_ERR (3)" error when injected.
            //
            // So, we'll just create our own manually via the DOMParser using
            // the the raw XML responseText.
            //
            // :NOTE: IE8 and older doesn't have DOMParser, but they can't do SVG either, so...
            else if (DOMParser && (DOMParser instanceof Function)) {
              var xmlDoc;
              try {
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(httpRequest.responseText, 'text/xml');
              }
              catch (e) {
                xmlDoc = undefined;
              }

              if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length) {
                callback('Unable to parse SVG file: ' + url);
                return false;
              }
              else {
                // Cache it
                svgCache[url] = xmlDoc.documentElement;
              }
            }

            // We've loaded a new asset, so process any requests waiting for it
            processRequestQueue(url);
          }
          else {
            callback('There was a problem injecting the SVG: ' + httpRequest.status + ' ' + httpRequest.statusText);
            return false;
          }
        }
      };

      httpRequest.open('GET', url);

      // Treat and parse the response as XML, even if the
      // server sends us a different mimetype
      if (httpRequest.overrideMimeType) httpRequest.overrideMimeType('text/xml');

      httpRequest.send();
    }
  };

  // Inject a single element
  var injectElement = function (el, evalScripts, pngFallback, callback) {

    // Grab the src or data-src attribute
    var imgUrl = el.getAttribute('data-src') || el.getAttribute('src');

    // We can only inject SVG
    if (!(/\.svg/i).test(imgUrl)) {
      callback('Attempted to inject a file with a non-svg extension: ' + imgUrl);
      return;
    }

    // If we don't have SVG support try to fall back to a png,
    // either defined per-element via data-fallback or data-png,
    // or globally via the pngFallback directory setting
    if (!hasSvgSupport) {
      var perElementFallback = el.getAttribute('data-fallback') || el.getAttribute('data-png');

      // Per-element specific PNG fallback defined, so use that
      if (perElementFallback) {
        el.setAttribute('src', perElementFallback);
        callback(null);
      }
      // Global PNG fallback directoriy defined, use the same-named PNG
      else if (pngFallback) {
        el.setAttribute('src', pngFallback + '/' + imgUrl.split('/').pop().replace('.svg', '.png'));
        callback(null);
      }
      // um...
      else {
        callback('This browser does not support SVG and no PNG fallback was defined.');
      }

      return;
    }

    // Make sure we aren't already in the process of injecting this element to
    // avoid a race condition if multiple injections for the same element are run.
    // :NOTE: Using indexOf() only _after_ we check for SVG support and bail,
    // so no need for IE8 indexOf() polyfill
    if (injectedElements.indexOf(el) !== -1) {
      return;
    }

    // Remember the request to inject this element, in case other injection
    // calls are also trying to replace this element before we finish
    injectedElements.push(el);

    // Try to avoid loading the orginal image src if possible.
    el.setAttribute('src', '');

    // Load it up
    loadSvg(imgUrl, function (svg) {

      if (typeof svg === 'undefined' || typeof svg === 'string') {
        callback(svg);
        return false;
      }

      var imgId = el.getAttribute('id');
      if (imgId) {
        svg.setAttribute('id', imgId);
      }

      var imgTitle = el.getAttribute('title');
      if (imgTitle) {
        svg.setAttribute('title', imgTitle);
      }

      // Concat the SVG classes + 'injected-svg' + the img classes
      var classMerge = [].concat(svg.getAttribute('class') || [], 'injected-svg', el.getAttribute('class') || []).join(' ');
      svg.setAttribute('class', uniqueClasses(classMerge));

      var imgStyle = el.getAttribute('style');
      if (imgStyle) {
        svg.setAttribute('style', imgStyle);
      }

      // Copy all the data elements to the svg
      var imgData = [].filter.call(el.attributes, function (at) {
        return (/^data-\w[\w\-]*$/).test(at.name);
      });
      forEach.call(imgData, function (dataAttr) {
        if (dataAttr.name && dataAttr.value) {
          svg.setAttribute(dataAttr.name, dataAttr.value);
        }
      });

      // Make sure any internally referenced clipPath ids and their
      // clip-path references are unique.
      //
      // This addresses the issue of having multiple instances of the
      // same SVG on a page and only the first clipPath id is referenced.
      //
      // Browsers often shortcut the SVG Spec and don't use clipPaths
      // contained in parent elements that are hidden, so if you hide the first
      // SVG instance on the page, then all other instances lose their clipping.
      // Reference: https://bugzilla.mozilla.org/show_bug.cgi?id=376027

      // Handle all defs elements that have iri capable attributes as defined by w3c: http://www.w3.org/TR/SVG/linking.html#processingIRI
      // Mapping IRI addressable elements to the properties that can reference them:
      var iriElementsAndProperties = {
        'clipPath': ['clip-path'],
        'color-profile': ['color-profile'],
        'cursor': ['cursor'],
        'filter': ['filter'],
        'linearGradient': ['fill', 'stroke'],
        'marker': ['marker', 'marker-start', 'marker-mid', 'marker-end'],
        'mask': ['mask'],
        'pattern': ['fill', 'stroke'],
        'radialGradient': ['fill', 'stroke']
      };

      var element, elementDefs, properties, currentId, newId;
      Object.keys(iriElementsAndProperties).forEach(function (key) {
        element = key;
        properties = iriElementsAndProperties[key];

        elementDefs = svg.querySelectorAll('defs ' + element + '[id]');
        for (var i = 0, elementsLen = elementDefs.length; i < elementsLen; i++) {
          currentId = elementDefs[i].id;
          newId = currentId + '-' + injectCount;

          // All of the properties that can reference this element type
          var referencingElements;
          forEach.call(properties, function (property) {
            // :NOTE: using a substring match attr selector here to deal with IE "adding extra quotes in url() attrs"
            referencingElements = svg.querySelectorAll('[' + property + '*="' + currentId + '"]');
            for (var j = 0, referencingElementLen = referencingElements.length; j < referencingElementLen; j++) {
              referencingElements[j].setAttribute(property, 'url(#' + newId + ')');
            }
          });

          elementDefs[i].id = newId;
        }
      });

      // Remove any unwanted/invalid namespaces that might have been added by SVG editing tools
      svg.removeAttribute('xmlns:a');

      // Post page load injected SVGs don't automatically have their script
      // elements run, so we'll need to make that happen, if requested

      // Find then prune the scripts
      var scripts = svg.querySelectorAll('script');
      var scriptsToEval = [];
      var script, scriptType;

      for (var k = 0, scriptsLen = scripts.length; k < scriptsLen; k++) {
        scriptType = scripts[k].getAttribute('type');

        // Only process javascript types.
        // SVG defaults to 'application/ecmascript' for unset types
        if (!scriptType || scriptType === 'application/ecmascript' || scriptType === 'application/javascript') {

          // innerText for IE, textContent for other browsers
          script = scripts[k].innerText || scripts[k].textContent;

          // Stash
          scriptsToEval.push(script);

          // Tidy up and remove the script element since we don't need it anymore
          svg.removeChild(scripts[k]);
        }
      }

      // Run/Eval the scripts if needed
      if (scriptsToEval.length > 0 && (evalScripts === 'always' || (evalScripts === 'once' && !ranScripts[imgUrl]))) {
        for (var l = 0, scriptsToEvalLen = scriptsToEval.length; l < scriptsToEvalLen; l++) {

          // :NOTE: Yup, this is a form of eval, but it is being used to eval code
          // the caller has explictely asked to be loaded, and the code is in a caller
          // defined SVG file... not raw user input.
          //
          // Also, the code is evaluated in a closure and not in the global scope.
          // If you need to put something in global scope, use 'window'
          new Function(scriptsToEval[l])(window); // jshint ignore:line
        }

        // Remember we already ran scripts for this svg
        ranScripts[imgUrl] = true;
      }

      // :WORKAROUND:
      // IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
      // This trick will trigger IE to read and use any existing SVG <style> tags.
      //
      // Reference: https://github.com/iconic/SVGInjector/issues/23
      var styleTags = svg.querySelectorAll('style');
      forEach.call(styleTags, function (styleTag) {
        styleTag.textContent += '';
      });

      // Replace the image with the svg
      el.parentNode.replaceChild(svg, el);

      // Now that we no longer need it, drop references
      // to the original element so it can be GC'd
      delete injectedElements[injectedElements.indexOf(el)];
      el = null;

      // Increment the injected count
      injectCount++;

      callback(svg);
    });
  };

  /**
   * SVGInjector
   *
   * Replace the given elements with their full inline SVG DOM elements.
   *
   * :NOTE: We are using get/setAttribute with SVG because the SVG DOM spec differs from HTML DOM and
   * can return other unexpected object types when trying to directly access svg properties.
   * ex: "className" returns a SVGAnimatedString with the class value found in the "baseVal" property,
   * instead of simple string like with HTML Elements.
   *
   * @param {mixes} Array of or single DOM element
   * @param {object} options
   * @param {function} callback
   * @return {object} Instance of SVGInjector
   */
  var SVGInjector = function (elements, options, done) {

    // Options & defaults
    options = options || {};

    // Should we run the scripts blocks found in the SVG
    // 'always' - Run them every time
    // 'once' - Only run scripts once for each SVG
    // [false|'never'] - Ignore scripts
    var evalScripts = options.evalScripts || 'always';

    // Location of fallback pngs, if desired
    var pngFallback = options.pngFallback || false;

    // Callback to run during each SVG injection, returning the SVG injected
    var eachCallback = options.each;

    // Do the injection...
    if (elements.length !== undefined) {
      var elementsLoaded = 0;
      forEach.call(elements, function (element) {
        injectElement(element, evalScripts, pngFallback, function (svg) {
          if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
          if (done && elements.length === ++elementsLoaded) done(elementsLoaded);
        });
      });
    }
    else {
      if (elements) {
        injectElement(elements, evalScripts, pngFallback, function (svg) {
          if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
          if (done) done(1);
          elements = null;
        });
      }
      else {
        if (done) done(0);
      }
    }
  };

  /* global module, exports: true, define */
  // Node.js or CommonJS
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = exports = SVGInjector;
  }
  // AMD support
  else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return SVGInjector;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // Otherwise, attach to window as global
  else if (typeof window === 'object') {
    window.SVGInjector = SVGInjector;
  }
  /* global -module, -exports, -define */

}(window, document));


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class KeyboardManager {
    constructor(callbacks) {
        this.callbacks = callbacks;
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
        this.keysDown = new Set();
    }
    onKeyDown(e) {
        if (!this.keysDown.has(e.key)) {
            this.callbacks.onKeyDown(e);
            this.keysDown.add(e.key);
        }
    }
    onKeyUp(e) {
        this.callbacks.onKeyUp(e);
        this.keysDown.delete(e.key);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardManager;



/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getKeyBinding;
/* harmony export (immutable) */ __webpack_exports__["b"] = getKeyType;
const keyboardCodeMap = {
    Digit1: 40,
    Digit2: 41,
    Digit3: 42,
    Digit4: 43,
    Digit5: 44,
    Digit6: 45,
    Digit7: 46,
    Digit8: 47,
    Digit9: 48,
    Digit0: 49,
    Minus: 50,
    Equal: 51,
    KeyQ: 21,
    KeyW: 22,
    KeyE: 23,
    KeyR: 24,
    KeyT: 25,
    KeyY: 26,
    KeyU: 27,
    KeyI: 28,
    KeyO: 29,
    KeyP: 30,
    BracketLeft: 31,
    BracketRight: 32,
    Backslash: 33,
    KeyA: 10,
    KeyS: 11,
    KeyD: 12,
    KeyF: 13,
    KeyG: 14,
    KeyH: 15,
    KeyJ: 16,
    KeyK: 17,
    KeyL: 18,
    Semicolon: 19,
    Quote: 20,
    KeyZ: 0,
    KeyX: 1,
    KeyC: 2,
    KeyV: 3,
    KeyB: 4,
    KeyN: 5,
    KeyM: 6,
    Comma: 7,
    Period: 8,
    Slash: 9,
    ArrowUp: 101,
    ArrowDown: 102,
    ArrowLeft: 101,
    ArrowRight: 102,
    Tab: 105,
    Backspace: 100,
    Backquote: 110,
    Space: 111,
    Enter: 111,
    CapsLock: 108,
};
/* harmony export (immutable) */ __webpack_exports__["c"] = keyboardCodeMap;

function getKeyBinding(e) {
    if (e.code) {
        return keyboardCodeMap[e.code] !== undefined ? keyboardCodeMap[e.code] : -1;
    }
    else {
        return _keyboardCodeMapFallback[e.keyCode] !== undefined ? _keyboardCodeMapFallback[e.code] : -1;
    }
}
function getKeyType(key) {
    let type;
    if (key >= 0 && key < 10) {
        type = 'bass';
    }
    else if (key >= 10 && key < 40) {
        type = 'harp';
    }
    else if (key >= 40 && key < 52) {
        type = 'rootNote';
    }
    else {
        type = 'control';
    }
    return type;
}
const _keyboardCodeMapFallback = {
    192: keyboardCodeMap.Backquote,
    49: keyboardCodeMap.Digit1,
    50: keyboardCodeMap.Digit2,
    51: keyboardCodeMap.Digit3,
    52: keyboardCodeMap.Digit4,
    53: keyboardCodeMap.Digit5,
    54: keyboardCodeMap.Digit6,
    55: keyboardCodeMap.Digit7,
    56: keyboardCodeMap.Digit8,
    57: keyboardCodeMap.Digit9,
    48: keyboardCodeMap.Digit0,
    189: keyboardCodeMap.Minus,
    187: keyboardCodeMap.Equal,
    9: keyboardCodeMap.Tab,
    81: keyboardCodeMap.KeyQ,
    87: keyboardCodeMap.KeyW,
    69: keyboardCodeMap.KeyE,
    82: keyboardCodeMap.KeyR,
    84: keyboardCodeMap.KeyT,
    89: keyboardCodeMap.KeyY,
    85: keyboardCodeMap.KeyU,
    73: keyboardCodeMap.KeyI,
    79: keyboardCodeMap.KeyO,
    80: keyboardCodeMap.KeyP,
    219: keyboardCodeMap.BracketLeft,
    221: keyboardCodeMap.BracketRight,
    220: keyboardCodeMap.Backslash,
    20: keyboardCodeMap.CapsLock,
    65: keyboardCodeMap.KeyA,
    83: keyboardCodeMap.KeyS,
    68: keyboardCodeMap.KeyD,
    70: keyboardCodeMap.KeyF,
    71: keyboardCodeMap.KeyG,
    72: keyboardCodeMap.KeyH,
    74: keyboardCodeMap.KeyJ,
    75: keyboardCodeMap.KeyK,
    76: keyboardCodeMap.KeyL,
    186: keyboardCodeMap.Semicolon,
    222: keyboardCodeMap.Quote,
    13: keyboardCodeMap.Enter,
    90: keyboardCodeMap.KeyZ,
    88: keyboardCodeMap.KeyX,
    67: keyboardCodeMap.KeyC,
    86: keyboardCodeMap.KeyV,
    66: keyboardCodeMap.KeyB,
    78: keyboardCodeMap.KeyN,
    77: keyboardCodeMap.KeyM,
    188: keyboardCodeMap.Comma,
    190: keyboardCodeMap.Period,
    191: keyboardCodeMap.Slash,
    32: keyboardCodeMap.Space,
    38: keyboardCodeMap.ArrowUp,
    37: keyboardCodeMap.ArrowLeft,
    40: keyboardCodeMap.ArrowDown,
    39: keyboardCodeMap.ArrowRight,
};


/***/ })
],[3]);