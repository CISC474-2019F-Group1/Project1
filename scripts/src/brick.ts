class Brick extends Rectangle {
    strength: number;
    initX: number;
    initY: number;
    endX: number;
    endY: number;
    speedX: number;
    speedY: number;
    
    constructor(x: number, 
                y: number, 
                width: number, 
                height: number, 
                strength: number,
                endX: number,
                endY: number) {
        super(x, y, width, height);
        this.strength = strength;
        this.initX = x;
        this.initY = y;
        this.endX = endX;
        this.endY = endY;
        this.speedX = 10;
        this.speedY = 10;
    }
    
    decrementStrength() {
        this.strength -= 1;
    }
    
    getStrength() {
        return this.strength;
    }

    updateBrick() {

        if(this.speedX > 0){

            if(this.x + this.speedX < this.endX){
                this.x += this.speedX;
            }else{
                this.speedX = this.speedX * -1;
            }

        }else{

            if(this.x + this.speedX > this.initX){
                this.x += this.speedX;
            }else{
                this.speedX = this.speedX * -1;
            }

        }

        if(this.speedY > 0){

            if(this.y + this.speedY < this.endY){
                this.y += this.speedY;
            }else{
                this.speedY = this.speedY * -1;
            }

        }else{

            if(this.y + this.speedY > this.initY){
                this.y += this.speedY;
            }else{
                this.speedY = this.speedY * -1;
            }

        }

    }
    
}
