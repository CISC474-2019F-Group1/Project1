function ball() {

    var changeableX;
    var changeableY;
    var startX;
    var startY;

    this.positionX = 100;
    this.positionY = 300;
    this.speedX = 3;
    this.speedY = 3;
    this.size = 25;

    this.maxwidth = window.innerWidth - this.size;
    this.maxheight = window.innerHeight - this.size;
    $('#ball').css("width", this.width);

    this.updatePosition = function(paddle){
        if(this.positionY <= 30){
            //new turn trigger will be here
            this.positionX=100;
            this.positionY=300;
        }
        //hit boundary
        else if(this.positionX > this.maxwidth||this.positionX < 0){
            this.speedX = -this.speedX;
        }
        else if(this.positionY> this.maxheight){
            this.speedY = -this.speedY;
        }
        //hit paddle
        else if (this.positionX>paddle-20&&this.positionX<paddle+220){
            //console.log('pass check');
            if(this.positionY<40+this.size){
                console.log('collision at: ('+this.positionX+','+this.positionY+')' );
                this.speedY = -this.speedY;
            }
        }

        //move
        this.positionX += this.speedX;
        this.positionY += this.speedY;


        
       
        
    }

}