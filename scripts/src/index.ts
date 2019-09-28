let gameStart = false
let gameMode = "";
let levelEditorGridEnabled: boolean;

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
            if (gameMode == "LevelEditor") {
                levelEditorGridEnabled = !levelEditorGridEnabled;
            }
        }
    }
});

$(document).ready(function () {
    $('#game-header-bar').hide();
    $('#level-editor-header-bar').hide();
    $('#paddle').hide();
    $('#ball').hide();
    $('#brick-container').hide();

    $('#chooseGame').modal({ backdrop: 'static', keyboard: false });
    $('#zenMode').click(function () {
        initNormalMode();
        gameStart = true;
        gameMode = "ZenMode";
    })
    $('#normalMode').click(function () {
        initNormalMode();
        gameStart = true;
        gameMode = "NormalMode";
    })
    $('#hardCore').click(function () {
        initNormalMode();
        gameStart = true;
        gameMode = "HardCoreMode";
    })
    $('#aiLab').click(function () {
        initNormalMode();
        gameStart = true;
        gameMode = "AILAB";
    })
    $('#levelEditor').click(function () {
        initLevelEditorMode();
        gameStart = true;
        gameMode = "LevelEditor";
    })
    console.log('Game Mode: ' + gameStart);
});

const HEADER_HEIGHT = 50;
const PADDLE_AREA_HEIGHT = 250;
const BRICK_AREA_HEIGHT = 500;
const BOARD_HEIGHT = PADDLE_AREA_HEIGHT + BRICK_AREA_HEIGHT;
const BOARD_WIDTH = 1000;

const BRICK_WIDTH = BOARD_WIDTH / 10;
const BRICK_HEIGHT = BRICK_WIDTH / 2;

let powerUp: PowerUp;
let gameState: GameState;
let board: Board;
let paddle: Paddle;
let ball: Ball;
let bricks: Brick[];

function initNormalMode() {
    powerUp = new PowerUp("None");
    gameState = new GameState(0, 3, 0, powerUp, gameMode);
    board = new Board(0, BOARD_WIDTH, BOARD_HEIGHT, 0);
    paddle = new Paddle(BOARD_WIDTH / 2, 10, 200, 20, 5, board.getRightEdgeX());
    ball = new Ball(BOARD_WIDTH / 2, 100, 0, 0, 10);
    bricks = [];
    for (let j: number = 0; j < 10; j++) {
        for (let i: number = 0; i < 10; i++) {
            let x: number = (i * BRICK_WIDTH) + (BRICK_WIDTH / 2);
            let y: number = BOARD_HEIGHT - (j * BRICK_HEIGHT) - (BRICK_HEIGHT / 2);
            bricks.push(new Brick(x, y, BRICK_WIDTH, BRICK_HEIGHT, 3));
        }
    }
    let bricksJSON = JSON.stringify(bricks);
    console.log(bricksJSON);
    console.log(<Brick[]> JSON.parse(bricksJSON));
    $('#brick-container').empty();
    for (let i: number = 0; i < bricks.length; i++) {
        $('#brick-container').append('<div id="brick-' + i + '"></div>');
    }
    
    $('#game-header-bar').show();
    $('#level-editor-header-bar').hide();
    $('#paddle').show();
    $('#ball').show();
    $('#brick-container').show();
    $('#game-container').show();
    $('#brick-container').css("background", "#3330");
    $("#brick-container").off("mousemove");
    $('#level-editor-ghost-brick').hide();
}

function initLevelEditorMode() {
    bricks = [];
    levelEditorGridEnabled = true;

    $('#game-header-bar').hide();
    $('#level-editor-header-bar').show();
    $('#paddle').hide();
    $('#ball').hide();
    $('#brick-container').show();
    $('#game-container').show();
    $('#brick-container').css("background", "#3337");
    $("#brick-container").on("mousemove", function(event) {
        let scale = Math.min(window.innerWidth / BOARD_WIDTH, 
                             (window.innerHeight - HEADER_HEIGHT) / BOARD_HEIGHT);
        let xOffset = (window.innerWidth - (BOARD_WIDTH * scale)) / 2;
        let yOffset = ((window.innerHeight - HEADER_HEIGHT) - (BOARD_HEIGHT * scale)) / 2;
        let brickX = (event.pageX - xOffset) / scale;
        let brickY = BOARD_HEIGHT - ((event.pageY - yOffset - HEADER_HEIGHT) / scale);
        if (levelEditorGridEnabled) {
            brickX = Math.round((brickX - BRICK_WIDTH / 2) / BRICK_WIDTH) * BRICK_WIDTH + BRICK_WIDTH / 2;
            brickY = Math.round((brickY - BRICK_HEIGHT / 2) / BRICK_HEIGHT) * BRICK_HEIGHT + BRICK_HEIGHT / 2;
        }
        //console.log(brickX + " " + brickY);
        if (brickX - BRICK_WIDTH / 2 >= 0 
            && brickX + BRICK_WIDTH / 2 <= BOARD_WIDTH
            && brickY - BRICK_HEIGHT / 2 >= BOARD_HEIGHT - BRICK_AREA_HEIGHT
            && brickY + BRICK_HEIGHT / 2 <= BOARD_HEIGHT) {
            let ghostBrick = new Brick(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT, 1); // TODO set strength from currently-selected strength
            $('#level-editor-ghost-brick')
                .css({ "left": (ghostBrick.getLeftX() * scale) + xOffset,
                       "bottom": (ghostBrick.getBottomY() * scale) + yOffset,
                       "width": ghostBrick.getWidth() * scale,
                       "height": ghostBrick.getHeight() * scale })
                .attr('class', 'brick strength-' + ghostBrick.getStrength())
                .show();
        } else {
            $('#level-editor-ghost-brick').hide();
        }
    });
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
    if (gameStart && gameMode != "LevelEditor") {
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
    };
}

function draw() {
    if (gameStart) {
        let scale: number = Math.min(window.innerWidth / BOARD_WIDTH, 
                                     (window.innerHeight - HEADER_HEIGHT) / BOARD_HEIGHT);
        let xOffset: number = (window.innerWidth - (BOARD_WIDTH * scale)) / 2;
        let yOffset: number = ((window.innerHeight - HEADER_HEIGHT) - (BOARD_HEIGHT * scale)) / 2;
        if (gameMode != "LevelEditor") {
            $("#score").text("Score: " + gameState.getScore());
            $("#lives").text("Lives: " + gameState.getLives());
            $('#paddle').css({ "left": (paddle.getLeftX() * scale) + xOffset,
                               "bottom": (paddle.getBottomY() * scale) + yOffset,
                               "height": paddle.getHeight() * scale,
                               "width": paddle.getWidth() * scale });
            $('#ball').css({ "left": ((ball.getX() - ball.getRadius()) * scale) + xOffset, 
                             "bottom": ((ball.getY() - ball.getRadius()) * scale) + yOffset,
                             "height": (ball.getRadius() * 2) * scale,
                             "width": (ball.getRadius() * 2) * scale });
        }
        $('#game-container').css({ "left": xOffset,
                                   "bottom": yOffset,
                                   "width": BOARD_WIDTH * scale,
                                   "height": BOARD_HEIGHT * scale });
        $('#brick-container').css({ "left": xOffset,
                                    "bottom": ((BOARD_HEIGHT - BRICK_AREA_HEIGHT) * scale) + yOffset,
                                    "width": BOARD_WIDTH * scale,
                                    "height": BRICK_AREA_HEIGHT * scale });
                         
        for (let i: number = 0; i < bricks.length; i++) {
            $('#brick-' + i)
                .css({ "left": (bricks[i].getLeftX() * scale) + xOffset,
                       "bottom": (bricks[i].getBottomY() * scale) + yOffset,
                       "width": bricks[i].getWidth() * scale,
                       "height": bricks[i].getHeight() * scale })
                .attr('class', 'brick strength-' + bricks[i].getStrength());
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
