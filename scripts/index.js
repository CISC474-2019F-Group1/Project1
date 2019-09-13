$(document).keydown(function(event){

    // Left Key
    if(event.which == 37){

        pad.updatePosition(pad.speed * -1);

    }

    // Right Key
    if(event.which == 39){

        pad.updatePosition(pad.speed);

    }

    console.log(pad.position);

});