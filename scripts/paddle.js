function Paddle(){

    this.position = 100;
    this.speed = 20;
    this.width = 200;

    this.maxPosition = window.innerWidth - this.width;

    $('#paddle').css("width", this.width);

    this.updatePosition = function(direction, amt){

        if((direction == 'left') && (this.position > 0)){
            this.position -= amt;
        }

        if((direction == 'right') && (this.position < this.maxPosition)){
            this.position += amt;
        }

    }

}