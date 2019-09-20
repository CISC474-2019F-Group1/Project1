
let gameMode = false

$(document).keydown(function (event) {
    if (gameMode) {
        // Left Key
        if (event.which == 37) {
            pad.updatePosition('left', pad.speed);
        }
        //Right Key
        if (event.which == 39) {
            pad.updatePosition('right', pad.speed);
        }
    }
    console.log(pad.position);
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
});

const pad = new paddle();
const b1 = new ball();

function update() {
    //Comment this line if you play by yourself
    computer(b1.positionX, pad.position);
    b1.updatePosition(pad.position);
    $('#paddle').css("left", pad.position + "px");
    $('#ball').css({ "left": b1.positionX, "bottom": b1.positionY });
}

function computer(ax, bx) {
    if ((ax - bx) > 0) {
        if (pad.position < window.innerWidth - pad.size) {
            pad.updatePosition('right', pad.speed / 7);
        }
    }
    else if ((ax - bx) < 0) {
        if (pad.position > 0) {
            pad.updatePosition('left', pad.speed / 7);
        }
    }
}

writeFrame();
window.requestAnimationFrame(writeFrame);