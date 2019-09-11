const pad = new Paddle();

setInterval(update, 10);

function update(){

    $('#paddle').css("left",pad.position+"px");

}