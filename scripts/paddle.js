function Paddle(){

    this.position = 100;
    this.speed = 20;
    this.width = 200;

    $('#paddle').css("width",this.width);

    this.updatePosition = function(amt){

        this.position += amt;

    }

}