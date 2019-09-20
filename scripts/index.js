$(document).keydown(function (event) {

    // Left Key
    if (event.which == 37) {

        pad.updatePosition('left', pad.speed);

    }

    // Right Key
    if (event.which == 39) {

        pad.updatePosition('right', pad.speed);

    }

    console.log(pad.position);

});

const pad = new Paddle();

writeFrame();

function update() {
    //comment this line if you play by yourself.
    //computer(b1.positionX,pad.position);
    b1.updatePosition(pad.position);

    $('#paddle').css("left", pad.position + "px");
    $('#ball').css({"left": b1.positionX,"bottom":b1.positionY});
    
}

function writeFrame() {

    update();
    window.requestAnimationFrame(writeFrame);

}

window.requestAnimationFrame(writeFrame);

function computer(ax,bx){
    if((ax-bx)>0){
        if(pad.position<window.innerWidth - pad.size){
            pad.updatePosition('right', pad.speed/7);
        }
    }
    else if((ax-bx)<0){
        if(pad.position>0){
            pad.updatePosition('left', pad.speed/7);}
    }

}

gameState();