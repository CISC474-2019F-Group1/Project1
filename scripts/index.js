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

const pad = new paddle();
const orb = new ball();

function update() {
    //Comment this line if you play by yourself
   // computer(b1.positionX, pad.position);
   if (gameMode) {
        orb.updatePosition(pad.position);
        $('#paddle').css("left", pad.position + "px");
        $('#ball').css({ "left": orb.positionX, "bottom": orb.positionY });
   };
}

function computer(ballPos, padPos) {
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
}

function writeFrame() {
    update();
    window.requestAnimationFrame(writeFrame);
}

writeFrame();
window.requestAnimationFrame(writeFrame);