$(document).keydown(function(event){

    // Left Key
    if(event.which == 37){

        pad.updatePosition(-5);

    }

    // Right Key
    if(event.which == 39){

        pad.updatePosition(5);

    }

    console.log(pad.position);

});