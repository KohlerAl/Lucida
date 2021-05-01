"use strict";
var prototype;
(function (prototype) {
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
    prototype.Vector = Vector;
})(prototype || (prototype = {}));
//# sourceMappingURL=Vector.js.map