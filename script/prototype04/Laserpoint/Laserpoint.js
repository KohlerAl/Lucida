"use strict";
var prototype04;
(function (prototype04) {
    class Laserpoint {
        constructor(_x, _y, _color) {
            this.position = new prototype04.Vector(_x, _y);
            this.color = _color;
        }
        getElevation(_endX, _endY) {
            //Warning: Maths involved, i have no idea what i am doing 
            let ty = _endY - this.position.y;
            let tx = _endX - this.position.x;
            this.distance = Math.sqrt(tx * tx + ty * ty);
            let rad = Math.atan2(ty, tx);
            this.angle = rad / Math.PI * 180;
            this.velocity.x = (tx / this.distance) * this.speed;
            this.velocity.y = (ty / this.distance) * this.speed;
        }
        move() {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }
        draw(_ctx) {
            _ctx.save();
            _ctx.beginPath();
            _ctx.strokeStyle = this.color;
            _ctx.fillStyle = this.color;
            _ctx.lineWidth = 2;
            _ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, true);
            _ctx.globalCompositeOperation = "lighter";
            _ctx.shadowColor = "pink";
            _ctx.lineWidth = 5;
            _ctx.shadowOffsetX = 2;
            _ctx.shadowOffsetY = 2;
            _ctx.shadowBlur = 15;
            _ctx.strokeStyle = "#ffffff88";
            _ctx.stroke();
            _ctx.fill();
            _ctx.closePath();
            _ctx.restore();
        }
    }
    prototype04.Laserpoint = Laserpoint;
})(prototype04 || (prototype04 = {}));
//# sourceMappingURL=Laserpoint.js.map