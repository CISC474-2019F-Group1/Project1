let gameMode = false

let keysPressed: Set<string> = new Set();

$(document).keydown(function (event) {
    if (gameMode) {
        if (event.which == 37) {
            keysPressed.add('left');
        } else if (event.which == 39) {
            keysPressed.add('right');
        }
    }
});

$(document).keyup(function (event) {
    if (gameMode) {
        if (event.which == 37) {
            keysPressed.delete('left');
        }
        if (event.which == 39) {
            keysPressed.delete('right');
        }
    }
});

$(document).ready(function () {
    $('#chooseGame').modal({ backdrop: 'static', keyboard: false });
    $('#zenMode').click(function () {
        gameMode = true;
    })
    $('#normalMode').click(function () {
        gameMode = true;
    })
    $('#hardCore').click(function () {
        gameMode = true;
    })
    console.log('Game Mode: ' + gameMode);
});

const INFO_HEIGHT = 50;
const BOARD_HEIGHT = 750;
const BOARD_WIDTH = 1000;
const GAME_WIDTH = BOARD_WIDTH;
const GAME_HEIGHT = BOARD_HEIGHT + INFO_HEIGHT;

const BRICK_WIDTH = BOARD_WIDTH / 10;
const BRICK_HEIGHT = BRICK_WIDTH / 2;

let board = new Board(0, BOARD_WIDTH, BOARD_HEIGHT);
let paddle = new Paddle(BOARD_WIDTH / 2, 10, 200, 20, 5, board.getRightEdgeX());
let ball = new Ball(BOARD_WIDTH / 2, 100, 0, -0.5, 10);
let bricks: Brick[] = [];
for (let j: number = 0; j < 10; j++) {
    for (let i: number = 0; i < 10; i++) {
        let x: number = (i * BRICK_WIDTH) + (BRICK_WIDTH / 2);
        let y: number = BOARD_HEIGHT - (j * BRICK_HEIGHT) - (BRICK_HEIGHT / 2);
        bricks.push(new Brick(x, y, BRICK_WIDTH, BRICK_HEIGHT, 3, 0, 0));
    }
}
let bricksJSON = JSON.stringify(bricks);
console.log(bricksJSON);
console.log(<Brick[]> JSON.parse(bricksJSON));
for (let i: number = 0; i < bricks.length; i++) {
    $('#brick-container').append('<div id="brick-' + i + '"></div>');
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

let lastFrameTimeMs: number = 0;
let maxFPS: number = 120;
let delta: number = 0;
let timestep: number = 1000 / 120;

function update(delta: number) {
    // Comment this line if you play by yourself
    //computer(b1.positionX, pad.position);
    if (gameMode) {
        if (keysPressed.has('left') && !keysPressed.has('right')) {
            paddle.updatePosition('left');
        } else if (keysPressed.has('right') && !keysPressed.has('left')) {
            paddle.updatePosition('right');
        }
        ball.moveAndCollide(bricks, board, paddle, delta);
        for (let i: number = 0; i < bricks.length; i++) {
            bricks[i].updateBrick();
        }
    };
}

function draw() {
    let scale: number = Math.min(window.innerWidth / GAME_WIDTH, 
                                 window.innerHeight / GAME_HEIGHT);
    let xOffset: number = (window.innerWidth - (GAME_WIDTH * scale)) / 2;
    let yOffset: number = (window.innerHeight - (GAME_HEIGHT * scale)) / 2;;
    $('#paddle').css({ "left": (paddle.getLeftX() * scale) + xOffset,
                       "bottom": (paddle.getBottomY() * scale) + yOffset,
                       "height": paddle.getHeight() * scale,
                       "width": paddle.getWidth() * scale });
    $('#ball').css({ "left": ((ball.getX() - ball.getRadius()) * scale) + xOffset, 
                     "bottom": ((ball.getY() - ball.getRadius()) * scale) + yOffset,
                     "height": (ball.getRadius() * 2) * scale,
                     "width": (ball.getRadius() * 2) * scale });
                     
    for (let i: number = 0; i < bricks.length; i++) {
        $('#brick-' + i)
            .css({ "left": (bricks[i].getLeftX() * scale) + xOffset,
                   "bottom": (bricks[i].getBottomY() * scale) + yOffset,
                   "width": bricks[i].getWidth() * scale,
                   "height": bricks[i].getHeight() * scale })
            .attr('class', 'brick strength-' + bricks[i].getStrength());
    }
}

function panic() {
    delta = 0;
}

function mainLoop(timestamp: number) {
    // Throttle the frame rate
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
        requestAnimationFrame(mainLoop);
        return;
    }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;
    
    let numUpdateSteps: number = 0;
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
