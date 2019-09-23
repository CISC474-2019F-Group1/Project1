"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Paddle = /** @class */ (function (_super) {
    __extends(Paddle, _super);
    function Paddle(x, y, width, height, speed) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.speed = speed;
        _this.maxPosition = window.innerWidth;
        $('#paddle').css("width", _this.width);
        return _this;
    }
    Paddle.prototype.updatePosition = function (direction) {
        if ((direction == 'left') && (_super.prototype.getLeftX.call(this) > 0)) {
            _super.prototype.setX.call(this, _super.prototype.getX.call(this) - this.speed);
        }
        if ((direction == 'right') && (_super.prototype.getRightX.call(this) < this.maxPosition)) {
            _super.prototype.setX.call(this, _super.prototype.getX.call(this) + this.speed);
        }
        console.log('Paddle at: (' + _super.prototype.getX.call(this) + ')');
    };
    return Paddle;
}(Rectangle));
