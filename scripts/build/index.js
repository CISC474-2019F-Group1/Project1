"use strict";
var gameMode = false;
$(document).keydown(function (event) {
    if (gameMode) {
        // Left Key
        if (event.which == 37) {
            paddle.updatePosition('left');
        }
        //Right Key
        if (event.which == 39) {
            paddle.updatePosition('right');
        }
    }
});
$(document).ready(function () {
    $('#chooseGame').modal({ backdrop: 'static', keyboard: false });
    $('#zenMode').click(function () {
        gameMode = true;
    });
    $('#normalMode').click(function () {
        gameMode = true;
    });
    $('#hardCore').click(function () {
        gameMode = true;
    });
    console.log('Game Mode: ' + gameMode);
});
var paddle = new Paddle(100, 10, 200, 20, 20);
var ball = new Ball(window.innerWidth / 2, 100, -0.25, 0.5, 10);
var board = new Board(0, window.innerWidth, window.innerHeight);
var bricks = [
    new Brick(window.innerWidth / 2, window.innerHeight / 2, 100, 20, 3)
];
for (var i = 0; i < bricks.length; i++) {
    $('#brick-container')
        .append('<div id="brick-' + i + '"></div>');
    $('#brick-' + i)
        .css({ "left": bricks[i].getLeftX() + "px",
        "bottom": bricks[i].getBottomY() + "px",
        "width": bricks[i].getWidth() + "px",
        "height": bricks[i].getHeight() + "px" })
        .attr('class', 'brick strength-' + bricks[i].getStrength());
}
/*function computer(ballPos, padPos) {
    if ((ballPos - padPos) > 0) {
        if (pad.position < window.innerWidth - pad.size) {
            pad.updatePosition('right', pad.speed / 7);
        }
    }
    else if ((ballPos - padPos) < 0) {
        if (pad.position > 0) {
            pad.updatePosition('left', pad.speed / 7);
        }
    }
}*/
var lastFrameTimeMs = 0;
var maxFPS = 120;
var delta = 0;
var timestep = 1000 / 120;
function update(delta) {
    //Comment this line if you play by yourself
    // computer(b1.positionX, pad.position);
    if (gameMode) {
        ball.moveAndCollide(bricks, board, paddle, delta);
    }
    ;
}
function draw() {
    $('#paddle').css({ "left": paddle.getLeftX() + "px",
        "bottom": paddle.getBottomY() + "px",
        "height": paddle.getHeight() + "px" });
    $('#ball').css({ "left": ball.getX() - ball.getRadius(),
        "bottom": ball.getY() - ball.getRadius() });
    for (var i = 0; i < bricks.length; i++) {
        $('#brick-' + i)
            .css({ "left": bricks[i].getLeftX() + "px",
            "bottom": bricks[i].getBottomY() + "px",
            "width": bricks[i].getWidth() + "px",
            "height": bricks[i].getHeight() + "px" })
            .attr('class', 'brick strength-' + bricks[i].getStrength());
    }
}
function panic() {
    delta = 0;
}
function mainLoop(timestamp) {
    // Throttle the frame rate
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;
    var numUpdateSteps = 0;
    while (delta >= timestep) {
        update(timestep);
        delta -= timestep;
        if (++numUpdateSteps >= 240) {
            panic();
            break;
        }
    }
    draw();
    requestAnimationFrame(mainLoop);
}
window.requestAnimationFrame(mainLoop);
