"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
class Vector {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    add(_x, _y) {
        this.x += _x;
        this.y += _y;
    }
    scale(_factor) {
        this.x *= _factor;
        this.y *= _factor;
    }
}
exports.Vector = Vector;
//# sourceMappingURL=Vector.js.map