$(document).keydown(function(event){

    // Left Key
    if(event.which == 37){

        pad.updatePosition('left', pad.speed);

    }

    // Right Key
    if(event.which == 39){

        pad.updatePosition('right', pad.speed);

    }

    console.log(pad.position);

});