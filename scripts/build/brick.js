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
var Brick = /** @class */ (function (_super) {
    __extends(Brick, _super);
    function Brick(x, y, width, height, strength) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.strength = strength;
        return _this;
    }
    Brick.prototype.decrementStrength = function () {
        this.strength -= 1;
    };
    return Brick;
}(Rectangle));
