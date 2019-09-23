"use strict";
var Rectangle = /** @class */ (function () {
    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.getLeftX = function () {
        return this.x - this.width / 2;
    };
    Rectangle.prototype.getRightX = function () {
        return this.x + this.width / 2;
    };
    Rectangle.prototype.getTopY = function () {
        return this.y + this.height / 2;
    };
    Rectangle.prototype.getBottomY = function () {
        return this.y - this.height / 2;
    };
    Rectangle.prototype.getX = function () {
        return this.x;
    };
    Rectangle.prototype.getY = function () {
        return this.y;
    };
    Rectangle.prototype.getWidth = function () {
        return this.width;
    };
    Rectangle.prototype.getHeight = function () {
        return this.height;
    };
    Rectangle.prototype.setX = function (x) {
        this.x = x;
    };
    Rectangle.prototype.setY = function (y) {
        this.y = y;
    };
    Rectangle.prototype.setWidth = function (width) {
        this.width = width;
    };
    Rectangle.prototype.setHeight = function (height) {
        this.height = height;
    };
    return Rectangle;
}());
