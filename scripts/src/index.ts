let gameStart = false
let gameMode = "";

let keysPressed: Set<string> = new Set();

$(document).keydown(function (event) {
    if (gameStart) {
        if (event.which == 37) {
            keysPressed.add('left');
        } else if (event.which == 39) {
            keysPressed.add('right');
        } else if (event.which == 32) {
            keysPressed.add('space');
        }
    }
});

$(document).keyup(function (event) {
    if (gameStart) {
        if (event.which == 37) {
            keysPressed.delete('left');
        }
        if (event.which == 39) {
            keysPressed.delete('right');
        } 
        if (event.which == 32) {
            keysPressed.delete('space');
        }
    }
});

$(document).ready(function () {
    $('#chooseGame').modal({ backdrop: 'static', keyboard: false });
    $('#zenMode').click(function () {
        gameStart = true;
        gameMode = "ZenMode";
    })
    $('#normalMode').click(function () {
        gameStart = true;
        gameMode = "NormalMode";
    })
    $('#hardCore').click(function () {
        gameStart = true;
        gameMode = "HardCoreMode";
    })
    $('#aiLab').click(function () {
        gameStart = true;
        gameMode = "AILAB";
    })
    console.log('Game Mode: ' + gameStart);
});

const INFO_HEIGHT = 50;
const BOARD_HEIGHT = 750;
const BOARD_WIDTH = 1000;
const GAME_WIDTH = BOARD_WIDTH;
const GAME_HEIGHT = BOARD_HEIGHT + INFO_HEIGHT;

const BRICK_WIDTH = BOARD_WIDTH / 10;
const BRICK_HEIGHT = BRICK_WIDTH / 2;

let powerUp = new Powerup(0, 0);
let gameState = new GameState(0, 3, 0, powerUp, gameMode);
let board = new Board(0, BOARD_WIDTH, BOARD_HEIGHT, 0);
let paddle = new Paddle(BOARD_WIDTH / 2, 10, 200, 20, 5, board.getRightEdgeX());
let ball = new Ball(BOARD_WIDTH / 2, 100, 0, 0, 10);
let bricks: Brick[] = [];
for (let j: number = 0; j < 10; j++) {
    for (let i: number = 0; i < 10; i++) {
        let x: number = (i * BRICK_WIDTH) + (BRICK_WIDTH / 2);
        let y: number = BOARD_HEIGHT - (j * BRICK_HEIGHT) - (BRICK_HEIGHT / 2);
        // Generate random powerup
        let rand: number = Math.floor(Math.random() * 15);
        if(rand > 3){
            rand = 0;
        }
        let p = new Powerup(rand, 15);
        // Add brick
        bricks.push(new Brick(x, y, BRICK_WIDTH, BRICK_HEIGHT, 3, x + 100, y + 100, p));
    }
}
let bricksJSON = JSON.stringify(bricks);
console.log(bricksJSON);
console.log(<Brick[]> JSON.parse(bricksJSON));
for (let i: number = 0; i < bricks.length; i++) {
    $('#brick-container').append('<div id="brick-' + i + '"></div>');
}

function computer() {
    if ((ball.getX() - paddle.getX()-paddle.width*0.1) > paddle.width*0.2) {
        if (paddle.getX() < window.innerWidth - paddle.width) {
            paddle.updatePosition('right');
        }
    }
    else if ((ball.getX() - paddle.getX()-paddle.width*0.1) < paddle.width*0.2) {
        if (paddle.getX() > 0) {
            paddle.updatePosition('left');
        }
    }
}

let lastFrameTimeMs: number = 0;
let maxFPS: number = 120;
let delta: number = 0;
let timestep: number = 1000 / 120;

function update(delta: number) {
    // Comment this line if you play by yourself
    //computer(b1.positionX, pad.position);
    if (gameStart) {
        if(gameMode == 'AILAB'){
            console.log('ai running');
            computer();
        }
        if (keysPressed.has('left') && !keysPressed.has('right')) {
            paddle.updatePosition('left');
        } else if (keysPressed.has('right') && !keysPressed.has('left')) {
            paddle.updatePosition('right');
        } else if (ball.getVY() == 0) {
            document.querySelector<HTMLElement>("#hints")!.innerHTML = "Press space to drop the ball";
            if (keysPressed.has('space') && !keysPressed.has('right') && !keysPressed.has('left')){
                ball.setVY(-.4);
                document.querySelector<HTMLElement>("#hints")!.innerHTML = "";
            }
        }
        ball.moveAndCollide(gameState, bricks, board, paddle, delta);
        for (let i: number = 0; i < bricks.length; i++) {
            bricks[i].updateBrick();
            // Create powerup if one was in brick
            if(bricks[i].strength == 0){
                $('#powerup-container').append('<div id="powerup-' + i + '" class="powerup powerup-' + bricks[i].powerup.getPid() + '"></div>');
                bricks[i].strength = -1;
            }
            // Update all powerups
            if(bricks[i].strength < 0){
                bricks[i].powerup.updatePowerup();
            }
        }
    };
}

function draw() {
    let scale: number = Math.min(window.innerWidth / GAME_WIDTH, 
                                 window.innerHeight / GAME_HEIGHT);
    let xOffset: number = (window.innerWidth - (GAME_WIDTH * scale)) / 2;
    let yOffset: number = (window.innerHeight - (GAME_HEIGHT * scale)) / 2;
    document.querySelector<HTMLElement>("#score")!.innerHTML = "Score: " + String(gameState.getScore());
    document.querySelector<HTMLElement>("#lives")!.innerHTML = "Lives: " + String(gameState.getLives());
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

        if(bricks[i].powerup.getState() === 'falling'){
            $('#powerup-' + i)
                .css({"left": (bricks[i].powerup.getX() * scale) + xOffset,
                    "bottom": (bricks[i].powerup.getY() * scale) + yOffset });
        }

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