let gameMode = false

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
    })
    $('#normalMode').click(function () {
        gameMode = true;
    })
    $('#hardCore').click(function () {
        gameMode = true;
    })
    console.log('Game Mode: ' + gameMode);
});

let paddle = new Paddle(100, 10, 200, 20, 20);
let ball = new Ball(window.innerWidth / 2, 100, -15, 30, 10);
let board = new Board(0, window.innerWidth, window.innerHeight);

function update() {
    //Comment this line if you play by yourself
   // computer(b1.positionX, pad.position);
   if (gameMode) {
        ball.moveAndCollide([], board, paddle, 0.1);
        $('#paddle').css({ "left": paddle.getLeftX() + "px",
                           "bottom": paddle.getBottomY() + "px",
                           "height": paddle.getHeight() + "px" });
        $('#ball').css({ "left": ball.getX() - ball.getRadius(), 
                         "bottom": ball.getY() - ball.getRadius() });
   };
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

function writeFrame() {
    update();
    window.requestAnimationFrame(writeFrame);
}

window.requestAnimationFrame(writeFrame);
