let gameStart = false;

$(document).ready(function () {
    $('#game-header-bar').hide();
    $('#level-editor-header-bar').hide();
    $('#paddle').hide();
    $('#ball').hide();
    $('#brick-container').hide();

    $('#chooseGame').modal({ backdrop: 'static', keyboard: false });
    $('#normalMode').click(function () {
        gameState.setGameMode("NormalMode");
        gameStart = true;
        initNormalMode();
    })
    $('#zenMode').click(function () {
        gameState.setGameMode("ZenMode");
        gameStart = true;
        initNormalMode();
    })
    $('#hardCore').click(function () {
        gameState.setGameMode("HardCoreMode");
        gameStart = true;
        initNormalMode();
    })
    $('#aiLab').click(function () {
        gameState.setGameMode("AILab");
        gameStart = true;
        initNormalMode();
    })
    $('#customLevelMode').click(function () {
        gameState.setGameMode("CustomLevelMode");
        initCustomLevelMode();
    });
    $('#levelEditor').click(function () {
        gameState.setGameMode("LevelEditor");
        gameStart = true;
        initLevelEditorMode();
    })
});

$("input[type='text']").on("keydown", function (evt) {
    evt.stopPropagation();
});

const HEADER_HEIGHT = 50;
const PADDLE_AREA_HEIGHT = 250;
const BRICK_AREA_HEIGHT = 500;
const BOARD_HEIGHT = PADDLE_AREA_HEIGHT + BRICK_AREA_HEIGHT;
const BOARD_WIDTH = 1000;

const BRICK_WIDTH = BOARD_WIDTH / 10;
const BRICK_HEIGHT = BRICK_WIDTH / 2;

let keysPressed: Set<string> = new Set();

let powerUp = new PowerUp(0, 0);
let board = new Board(0, BOARD_WIDTH, BOARD_HEIGHT, 0);
let paddle = new Paddle(BOARD_WIDTH / 2, 10, 200, 20, 5, board.getRightEdgeX());
let ball = new Ball(BOARD_WIDTH / 2, 100, 0, 0, 10);
let gameState = new GameState(0, 0, 0, powerUp, paddle, "");
let bricks: Map<number, Brick>;
let brickSeq: number;
let ai = new AI();

function clearBoard() {
    brickSeq = 0;
    bricks = new Map();
    $('#brick-container').empty();
}

function initNormalMode() {
    gameState.startGameState();
    keysPressed.clear();
    clearBoard();
    fillBoard();
    
    $(document).on("keydown", function (evt) {
        if (gameStart) {
            if (evt.key == 'ArrowLeft') {
                keysPressed.add('left');
            } else if (evt.key == 'ArrowRight') {
                keysPressed.add('right');
            } else if (evt.key == ' ') {
                keysPressed.add('space');
            } else if (evt.key == 'Escape' || evt.key == 'Esc') {
                keysPressed.add('restart');
            }
        }
    });
    $(document).on("keyup", function (evt) {
        if (gameStart) {
            if (evt.key == 'ArrowLeft') {
                keysPressed.delete('left');
            } else if (evt.key == 'ArrowRight') {
                keysPressed.delete('right');
            } else if (evt.key == ' ') {
                keysPressed.delete('space');
            }
        }
    });

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

function fillBoard() {
    for (let j: number = 0; j < 8; j++) {
        for (let i: number = 0; i < 10; i++) {
            let x: number = (i * BRICK_WIDTH) + (BRICK_WIDTH / 2);
            let y: number = BOARD_HEIGHT - (j * BRICK_HEIGHT) - (BRICK_HEIGHT / 2);
            let r: number = Math.ceil(Math.random() * 25);
            if (r > 3) {
                r = 0;
            }
            bricks.set(brickSeq, new Brick(x, y, BRICK_WIDTH, BRICK_HEIGHT, x, y, getRndInteger(1, 4), new PowerUp(r, 3)));
            brickSeq++;
        }
    }
    for (const [i, brick] of bricks) {
        $('#brick-container').append('<div id="brick-' + i + '"></div>');
    }

}

function initCustomLevelMode() {
    gameState.startGameState();
    keysPressed.clear();
    clearBoard();
    
    $(".modal").modal('hide');
    $('#level-editor-open-modal').modal({ backdrop: 'static', keyboard: false });
    $('#level-editor-open-name').val('');
    $("#level-editor-open-name-group").removeClass("has-error");
    $("#level-editor-open-list").empty();
    for (var i = 0; i < localStorage.length; i++) {
        let levelName = localStorage.key(i);
        console.log(levelName);
        $("#level-editor-open-list").append(
            '<button type="button" class="list-group-item list-group-item-action">'
            + levelName
            + '</button>');
    }
    $("#level-editor-open-list button").on("click", function (evt) {
        $('#level-editor-open-name').val(evt.target.innerHTML);
    });
    $("#level-editor-open-confirm").on("click", function (evt) {
        if (typeof (Storage) !== "undefined") {
            let levelName = String($("#level-editor-open-name").val());
            let bricksJSON = localStorage.getItem(levelName);
            if (bricksJSON == null) {
                $("#level-editor-open-name-group").addClass("has-error");
                console.log("Warning: Requested level does not exist");
                return false;
            } else {
                let bricksArray = <any[]>JSON.parse(bricksJSON);
                console.log(bricksArray);
                clearBoard();
                for (let brick of bricksArray) {
                    let powerup = new PowerUp(brick.powerup.pid, brick.powerup.duration);
                    bricks.set(brickSeq, new Brick(brick.x, brick.y, brick.width, brick.height, brick.x, brick.y, brick.strength, powerup));
                    $('#brick-container').append('<div id="brick-' + brickSeq + '"></div>');
                    brickSeq++;
                }
                gameStart = true;
            }
        } else {
            console.log("Error: Web Storage API is not supported");
        }
    });
    $("#level-editor-open-name").on("input", function (evt) {
        let levelNamePrefix = String($("#level-editor-open-name").val());
        $("#level-editor-open-list button").each(function (i, button) {
            if (button.innerHTML.startsWith(levelNamePrefix)) {
                $(button).show();
            } else {
                $(button).hide();
            }
        });
    });
    
    $(document).on("keydown", function (evt) {
        if (gameStart) {
            if (evt.key == 'ArrowLeft') {
                keysPressed.add('left');
            } else if (evt.key == 'ArrowRight') {
                keysPressed.add('right');
            } else if (evt.key == ' ') {
                keysPressed.add('space');
            } else if (evt.key == 'Escape' || evt.key == 'Esc') {
                keysPressed.add('restart');
            }
        }
    });
    $(document).on("keyup", function (evt) {
        if (gameStart) {
            if (evt.key == 'ArrowLeft') {
                keysPressed.delete('left');
            } else if (evt.key == 'ArrowRight') {
                keysPressed.delete('right');
            } else if (evt.key == ' ') {
                keysPressed.delete('space');
            }
        }
    });

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

let gridEnabled: boolean;
let ghostBrick: Brick;
let ghostPowerup: PowerUp;

function placeGhostBrick(screenX: number, screenY: number, ghostBrick: Brick) {
    // Calculate board scaling and offset
    let scale = Math.min(window.innerWidth / BOARD_WIDTH,
        (window.innerHeight - HEADER_HEIGHT) / BOARD_HEIGHT);
    let xOffset = (window.innerWidth - (BOARD_WIDTH * scale)) / 2;
    let yOffset = ((window.innerHeight - HEADER_HEIGHT) - (BOARD_HEIGHT * scale)) / 2;
    // Back-transform screen coordinates to board coordinates
    let brickX = (screenX - xOffset) / scale;
    let brickY = BOARD_HEIGHT - ((screenY - yOffset - HEADER_HEIGHT) / scale);
    // Snap to grid (if enabled)
    const HALF_BRICK_WIDTH = BRICK_WIDTH / 2;
    const HALF_BRICK_HEIGHT = BRICK_HEIGHT / 2;
    if (gridEnabled) {
        brickX = Math.round((brickX - HALF_BRICK_WIDTH) / BRICK_WIDTH) * BRICK_WIDTH + HALF_BRICK_WIDTH;
        brickY = Math.round((brickY - HALF_BRICK_HEIGHT) / BRICK_HEIGHT) * BRICK_HEIGHT + HALF_BRICK_HEIGHT;
    }
    const BRICK_AREA_BOTTOM = BOARD_HEIGHT - BRICK_AREA_HEIGHT;
    // Snap to edges
    brickX = Math.min(BOARD_WIDTH - HALF_BRICK_WIDTH, Math.max(HALF_BRICK_WIDTH, brickX));
    brickY = Math.min(BOARD_HEIGHT - HALF_BRICK_HEIGHT, Math.max(BRICK_AREA_BOTTOM + HALF_BRICK_HEIGHT, brickY));
    // Place ghost brick at calculated virtual x and y
    ghostBrick.setX(brickX);
    ghostBrick.setY(brickY);
}

function getBrickIdAt(x: number, y: number) {
    // Note: Iterate backwards to prevent counterintuitive selection of rearmost 
    // brick when multiple bricks overlap. Frontmost brick should be selected 
    // instead.
    for (const [i, brick] of Array.from(bricks).reverse()) {
        if (x >= brick.getLeftX()
            && x <= brick.getRightX()
            && y >= brick.getBottomY()
            && y <= brick.getTopY()) {
            return i;
        }
    }
    return -1;
}

function initLevelEditorMode() {
    gridEnabled = true;
    ghostBrick = new Brick(0, 0, BRICK_WIDTH, BRICK_HEIGHT, 0, 0, 3, new PowerUp(0, 3));
    ghostPowerup = new PowerUp(1, 3);
    clearBoard();

    $(document).off("keydown");
    $(document).off("keyup");
    $(document).on("keydown", function (evt) {
        if (evt.key == ' ') {
            gridEnabled = !gridEnabled;
        } else if (evt.key.toLowerCase() == 'o') {
            $(".modal").modal('hide');
            $('#level-editor-open-modal').modal({ backdrop: 'static', keyboard: false });
            $('#level-editor-open-name').val('');
            $("#level-editor-open-name-group").removeClass("has-error");
            $("#level-editor-open-list").empty();
            for (var i = 0; i < localStorage.length; i++) {
                let levelName = localStorage.key(i);
                console.log(levelName);
                $("#level-editor-open-list").append(
                    '<button type="button" class="list-group-item list-group-item-action">'
                    + levelName
                    + '</button>');
            }
            $("#level-editor-open-list button").on("click", function (evt) {
                $('#level-editor-open-name').val(evt.target.innerHTML);
            });
        } else if (evt.key.toLowerCase() == 's') {
            $(".modal").modal('hide');
            $('#level-editor-save-modal').modal({ backdrop: 'static', keyboard: false });
            $('#level-editor-save-name').val('');
        } else if (evt.key.toLowerCase() == 'n') {
            clearBoard();
        } else if (evt.key.toLowerCase() == 'h') {
            if ($('#level-editor-help-modal').is(':visible')) {
                $(".modal").modal('hide');
            } else {
                $(".modal").modal('hide');
                $('#level-editor-help-modal').modal({ backdrop: 'static', keyboard: false });
            }
        }
    });

    $('#game-header-bar').hide();
    $('#level-editor-header-bar').show();
    $('#paddle').hide();
    $('#ball').hide();
    $('#brick-container').show();
    $('#game-container').show();
    $('#brick-container').css("background", "#3337");
    $('#brick-container').on("mouseenter", function (evt) {
        placeGhostBrick(evt.pageX, evt.pageY, ghostBrick);
        $('#level-editor-ghost-brick').show();
    });
    $('#brick-container').on("mouseout", function (evt) {
        $('#level-editor-ghost-brick').hide();
    });
    $("#brick-container").on("mousemove", function (evt) {
        placeGhostBrick(evt.pageX, evt.pageY, ghostBrick);
    });
    $("#brick-container").on("click", function (evt) {
        let brickId = getBrickIdAt(ghostBrick.getX(), ghostBrick.getY());
        if (evt.ctrlKey) { 
            // Place or remove powerup
            if (brickId >= 0) {
                let brick = bricks.get(brickId);
                if (brick != undefined) {
                    if (brick.getPowerUp().getPid() == 0) {
                        brick.setPowerUp(ghostPowerup.clone());
                    } else {
                        brick.setPowerUp(new PowerUp(0, 3));
                    }
                }
            }
        } else { 
            // Place or remove brick
            if (brickId < 0) {
                bricks.set(brickSeq, ghostBrick.clone());
                $('#brick-container').append('<div id="brick-' + brickSeq + '"></div>');
                brickSeq++;
            } else {
                bricks.delete(brickId);
                $('#brick-' + brickId).remove();
            }
        }
    });
    $("#level-editor-brick-strength ul li a").on("click", function (evt) {
        ghostBrick.setStrength(parseInt(evt.target.innerText));
    });
    $("#level-editor-powerup-type ul li a").on("click", function (evt) {
        let powerupType = evt.target.innerText;
        if (powerupType == "Super Strength") {
            ghostPowerup = new PowerUp(1, 3);
        } else if (powerupType == "Solid Floor") {
            ghostPowerup = new PowerUp(2, 3);
        } else if (powerupType == "Big Paddle") {
            ghostPowerup = new PowerUp(3, 3);
        }
    });
    $("#level-editor-save-confirm").on("click", function (evt) {
        if (typeof (Storage) !== "undefined") {
            let bricksJSON = JSON.stringify(Array.from(bricks.values()));
            let levelName = String($("#level-editor-save-name").val());
            localStorage.setItem(levelName, bricksJSON);
        } else {
            console.log("Error: Web Storage API is not supported");
        }
    });
    $("#level-editor-open-confirm").on("click", function (evt) {
        if (typeof (Storage) !== "undefined") {
            let levelName = String($("#level-editor-open-name").val());
            let bricksJSON = localStorage.getItem(levelName);
            if (bricksJSON == null) {
                $("#level-editor-open-name-group").addClass("has-error");
                console.log("Warning: Requested level does not exist");
                return false;
            } else {
                let bricksArray = <any[]>JSON.parse(bricksJSON);
                console.log(bricksArray);
                clearBoard();
                for (let brick of bricksArray) {
                    let powerup = new PowerUp(brick.powerup.pid, brick.powerup.duration);
                    bricks.set(brickSeq, new Brick(brick.x, brick.y, brick.width, brick.height, brick.x, brick.y, brick.strength, powerup));
                    $('#brick-container').append('<div id="brick-' + brickSeq + '"></div>');
                    brickSeq++;
                }
            }
        } else {
            console.log("Error: Web Storage API is not supported");
        }
    });
    $("#level-editor-open-name").on("input", function (evt) {
        let levelNamePrefix = String($("#level-editor-open-name").val());
        $("#level-editor-open-list button").each(function (i, button) {
            if (button.innerHTML.startsWith(levelNamePrefix)) {
                $(button).show();
            } else {
                $(button).hide();
            }
        });
    });
}

/* function computer() {
    if ((ball.getX() - paddle.getX() - paddle.width * 0.1) > paddle.width * 0.2) {
        if (paddle.getX() < window.innerWidth - paddle.width) {
            paddle.updatePosition('right');
        }
    }
    else if ((ball.getX() - paddle.getX() - paddle.width * 0.1) < paddle.width * 0.2) {
        if (paddle.getX() > 0) {
            paddle.updatePosition('left');
        }
    }
} */

let lastFrameTimeMs: number = 0;
let maxFPS: number = 120;
let delta: number = 0;
let timestep: number = 1000 / 120;
let bStrength: number = 1;

function update(delta: number) {
    if (gameStart && gameState.getGameMode() != "LevelEditor") {
        if (gameState.getGameMode() == 'AILab') {
            // console.log('AI Running');
            // computer();
            ai.save_data(paddle,ball,gameState); 
            let predict: string = ai.predict(paddle,ball,board);
            paddle.updatePosition(predict);

        }
        // Key actions
        if (keysPressed.has('left') && !keysPressed.has('right')) {
            paddle.updatePosition('left');
        } else if (keysPressed.has('right') && !keysPressed.has('left')) {
            paddle.updatePosition('right');
        } else if (ball.getVY() == 0) {
            $("#hints").text("Press space to drop the ball");
            if (keysPressed.has('space')) {
                ball.setVY(-.4);
                $("#hints").text("");
            }
        } else if (keysPressed.has('restart')) { 
            location.reload();
        }
        // Check for powerups
        let activePowerup = gameState.getPowerUp().getPid();
        switch(activePowerup) {
            case 1: // Super strength
                bStrength = 3;
                $("#hints").text("Super Strength");
                if (gameState.getGameMode() == "HardCoreMode") { 
                    paddle.setWidth(100);
                } else {
                    paddle.setWidth(200);
                }
                gameState.setFloor(false);
                break;
            case 2: // Solid floor
                bStrength = 1;
                $("#hints").text("Solid Floor");
                if (gameState.getGameMode() == "HardCoreMode") { 
                    paddle.setWidth(100);
                } else {
                    paddle.setWidth(200);
                }
                gameState.setFloor(true);
                break;
            case 3: // Big paddle
                bStrength = 1;
                if (gameState.getGameMode() == "HardCoreMode") { 
                    paddle.setWidth(200);
                } else {
                    paddle.setWidth(400);
                }
                $("#hints").text("Big Paddle");
                gameState.setFloor(false);
                break;
            default: // No powerup
                bStrength = 1;
                gameState.setFloor(false);
                if (gameState.getGameMode() == "HardCoreMode") { 
                    paddle.setWidth(100);
                } else {
                    paddle.setWidth(200);
                }
                break;
        }
        ball.moveAndCollide(gameState, bricks, board, paddle, delta, bStrength);
        gameState.updateGameState();
        for (const [i, brick] of bricks) {
            brick.updateBrick();
            // Apply powerup if one was in brick
            if (brick.strength == 0) {
                if (brick.getPowerUp().getPid() != 0) {
                    gameState.setPowerup(brick.getPowerUp());
                }
                brick.strength = -1;
            }
        }
        if (bricks.size === 0) {
            fillBoard();
        }
    }
}

function drawLevelEditor() {
    let scale: number = Math.min(window.innerWidth / BOARD_WIDTH,
        (window.innerHeight - HEADER_HEIGHT) / BOARD_HEIGHT);
    let xOffset: number = (window.innerWidth - (BOARD_WIDTH * scale)) / 2;
    let yOffset: number = ((window.innerHeight - HEADER_HEIGHT) - (BOARD_HEIGHT * scale)) / 2;

    $('#game-container')
        .css({
            "left": xOffset,
            "bottom": yOffset,
            "width": BOARD_WIDTH * scale,
            "height": BOARD_HEIGHT * scale
        });
    $('#brick-container')
        .css({
            "left": xOffset,
            "bottom": ((BOARD_HEIGHT - BRICK_AREA_HEIGHT) * scale) + yOffset,
            "width": BOARD_WIDTH * scale,
            "height": BRICK_AREA_HEIGHT * scale
        });

    $('#level-editor-ghost-brick')
        .css({ "left": (ghostBrick.getLeftX() * scale) + xOffset,
               "bottom": (ghostBrick.getBottomY() * scale) + yOffset,
               "width": ghostBrick.getWidth() * scale,
               "height": ghostBrick.getHeight() * scale })
        .attr('class', 'brick strength-' + ghostBrick.getStrength() + " powerup-" + ghostBrick.getPowerUp().getPid());
    
    for (const [i, brick] of bricks) {
        $('#brick-' + i)
            .css({ "left": (brick.getLeftX() * scale) + xOffset,
                   "bottom": (brick.getBottomY() * scale) + yOffset,
                   "width": brick.getWidth() * scale,
                   "height": brick.getHeight() * scale })
            .attr('class', 'brick strength-' + brick.getStrength() + " powerup-" + brick.getPowerUp().getPid());
    }
}

function drawGame() {
    if (gameStart) {
        let scale: number = Math.min(window.innerWidth / BOARD_WIDTH,
            (window.innerHeight - HEADER_HEIGHT) / BOARD_HEIGHT);
        let xOffset: number = (window.innerWidth - (BOARD_WIDTH * scale)) / 2;
        let yOffset: number = ((window.innerHeight - HEADER_HEIGHT) - (BOARD_HEIGHT * scale)) / 2;
        $('#paddle').css({
            "left": (paddle.getLeftX() * scale) + xOffset,
            "bottom": (paddle.getBottomY() * scale) + yOffset,
            "height": paddle.getHeight() * scale,
            "width": paddle.getWidth() * scale
        });
        $('#ball').css({
            "left": ((ball.getX() - ball.getRadius()) * scale) + xOffset,
            "bottom": ((ball.getY() - ball.getRadius()) * scale) + yOffset,
            "height": (ball.getRadius() * 2) * scale,
            "width": (ball.getRadius() * 2) * scale
        });
        $('#game-container').css({
            "left": xOffset,
            "bottom": yOffset,
            "width": BOARD_WIDTH * scale,
            "height": BOARD_HEIGHT * scale
        });
        $('#brick-container').css({
            "left": xOffset,
            "bottom": ((BOARD_HEIGHT - BRICK_AREA_HEIGHT) * scale) + yOffset,
            "width": BOARD_WIDTH * scale,
            "height": BRICK_AREA_HEIGHT * scale
        });

        for (const [i, brick] of bricks) {
            $('#brick-' + i)
                .css({
                    "left": (brick.getLeftX() * scale) + xOffset,
                    "bottom": (brick.getBottomY() * scale) + yOffset,
                    "width": brick.getWidth() * scale,
                    "height": brick.getHeight() * scale
                })
                .attr('class', 'brick strength-' + brick.getStrength() + " powerup-" + brick.getPowerUp().getPid());
            if (brick.getStrength() === -1) {
                bricks.delete(i);
            }
        }
    }
}

function draw() {
    if (gameState.getGameMode() == "LevelEditor") {
        drawLevelEditor();
    } else {
        drawGame();
    }
}

function panic() {
    delta = 0;
}

function getRndInteger(min: number, max: number ) {
    return Math.floor(Math.random() * (max - min) ) + min;
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
