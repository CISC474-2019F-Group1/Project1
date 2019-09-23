"use strict";
var Ball = /** @class */ (function () {
    function Ball(x, y, vx, vy, radius) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }
    Ball.prototype.getX = function () {
        return this.x;
    };
    Ball.prototype.getY = function () {
        return this.y;
    };
    Ball.prototype.getVX = function () {
        return this.vx;
    };
    Ball.prototype.getVY = function () {
        return this.vy;
    };
    Ball.prototype.getRadius = function () {
        return this.radius;
    };
    Ball.prototype.moveAndCollide = function (bricks, board, paddle, delta) {
        var prevX = this.x;
        var prevY = this.y;
        // Move
        this.x += this.vx * delta;
        this.y += this.vy * delta;
        console.log("move");
        // Collide bricks
        for (var i = 0; i < bricks.length; i++) {
            var c_1 = this.checkCollideRect(bricks[i]);
            if (c_1.hit) {
                // Move back to position before collision
                this.x = prevX;
                this.y = prevY;
                // Bounce
                if (c_1.distX < c_1.distY) { // collision with horizontal side
                    this.vy = -this.vy;
                }
                else { // collision with vertical side
                    this.vx = -this.vx;
                }
                // Lower strength of brick
                bricks[i].decrementStrength();
                return;
            }
        }
        // Collide walls
        if (this.x - board.getLeftEdgeX() < this.radius
            || board.getRightEdgeX() - this.x < this.radius) {
            // Move back to position before collision
            this.x = prevX;
            this.y = prevY;
            // Bounce
            this.vx = -this.vx;
            return;
        }
        else if (board.getTopEdgeY() - this.y < this.radius) {
            // Move back to position before collision
            this.x = prevX;
            this.y = prevY;
            // Bounce
            this.vy = -this.vy;
            return;
        }
        // Collide paddle
        var c = this.checkCollideRect(paddle);
        if (c.hit) {
            // Move back to position before collision
            this.x = prevX;
            this.y = prevY;
            // Bounce
            if (c.distX < c.distY) { // collision with horizontal side
                this.vy = -this.vy;
                this.vx = (this.x - paddle.getX()) / (paddle.getWidth() / 2) * 15;
            }
            else { // collision with vertical side
                this.vx = -this.vx;
            }
            return;
        }
    };
    Ball.prototype.checkCollideRect = function (rect) {
        var testX = this.x;
        var testY = this.y;
        if (this.x < rect.getLeftX()) {
            testX = rect.getLeftX();
        }
        else if (this.x > rect.getRightX()) {
            testX = rect.getRightX();
        }
        if (this.y < rect.getBottomY()) {
            testY = rect.getBottomY();
        }
        else if (this.y > rect.getTopY()) {
            testY = rect.getTopY();
        }
        var distX = this.x - testX;
        var distY = this.y - testY;
        var distance = Math.sqrt(distX * distX + distY * distY);
        return {
            "hit": distance <= this.radius,
            "distX": distX,
            "distY": distY
        };
    };
    return Ball;
}());
