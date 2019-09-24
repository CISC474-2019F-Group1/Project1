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

let paddle = new Paddle(window.innerWidth / 2, 10, 200, 20, 5);
let ball = new Ball(window.innerWidth / 2, 100, 0, -0.5, 10);
let board = new Board(0, window.innerWidth, window.innerHeight);
let bricks = [
    new Brick(window.innerWidth / 2, window.innerHeight / 2, 100, 20, 3)
]
for (let i: number = 0; i < bricks.length; i++) {
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
    $('#paddle').css({ "left": paddle.getLeftX() + "px",
                       "bottom": paddle.getBottomY() + "px",
                       "height": paddle.getHeight() + "px",
                       "width": paddle.getWidth() + "px" });
    $('#ball').css({ "left": ball.getX() - ball.getRadius(), 
                     "bottom": ball.getY() - ball.getRadius(),
                     "height": ball.getRadius() * 2,
                     "width": ball.getRadius() * 2 });
                     
    for (let i: number = 0; i < bricks.length; i++) {
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
