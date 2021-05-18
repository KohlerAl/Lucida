"use strict";
var prototype04;
(function (prototype04) {
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
    prototype04.Vector = Vector;
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=Vector.js.map