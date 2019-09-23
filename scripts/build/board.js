"use strict";
var Board = /** @class */ (function () {
    function Board(leftEdgeX, rightEdgeX, topEdgeY) {
        this.leftEdgeX = leftEdgeX;
        this.rightEdgeX = rightEdgeX;
        this.topEdgeY = topEdgeY;
    }
    Board.prototype.getLeftEdgeX = function () {
        return this.leftEdgeX;
    };
    Board.prototype.getRightEdgeX = function () {
        return this.rightEdgeX;
    };
    Board.prototype.getTopEdgeY = function () {
        return this.topEdgeY;
    };
    return Board;
}());
