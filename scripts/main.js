const pad = new Paddle();

writeFrame();

function update(){

    $('#paddle').css("left",pad.position+"px");

}

function writeFrame(){

    update();
    window.requestAnimationFrame(writeFrame);

}

window.requestAnimationFrame(writeFrame);