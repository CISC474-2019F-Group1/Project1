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

let board = new Board(0, 1000, 750);
let paddle = new Paddle(1000 / 2, 10, 200, 20, 5, board.getRightEdgeX());
let ball = new Ball(1000 / 2, 100, 0, -0.5, 10);
let bricks = [
    new Brick(0 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(1 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(2 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(3 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(4 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(5 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(6 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(7 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(8 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(9 * 100 + (100 / 2), 0 * 20 + (20 / 2) + 710, 100, 20, 3),    
    new Brick(0 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(1 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(2 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(3 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(4 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(5 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(6 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(7 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(8 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3),
    new Brick(9 * 100 + (100 / 2), 1 * 20 + (20 / 2) + 710, 100, 20, 3)
]
let bricksJSON = JSON.stringify(bricks);
console.log(bricksJSON);
console.log(<Brick[]> JSON.parse(bricksJSON));
for (let i: number = 0; i < bricks.length; i++) {
    $('#brick-container')
        .append('<div id="brick-' + i + '"></div>');
    $('#brick-' + i)
        .css({ "left": bricks[i].getLeftX() + "px",
               "bottom": bricks[i].getBottomY() + "px",
               "width": (bricks[i].getWidth() - 1) + "px",
               "height": (bricks[i].getHeight() -1) + "px" })
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
    };
}

function draw() {
    let scale: number = Math.min(window.innerHeight / 800, window.innerWidth / 1000);
    let xOffset: number = (window.innerWidth - (1000 * scale)) / 2;
    let yOffset: number = (window.innerHeight - (800 * scale)) / 2;;
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
                   "width": (bricks[i].getWidth() - 1) * scale,
                   "height": (bricks[i].getHeight() - 1) * scale })
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
