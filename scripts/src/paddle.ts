class Paddle extends Rectangle {
    
    speed: number;
    maxPosition: number;
    
    constructor(x: number, 
                y: number, 
                width: number, 
                height: number,
                speed: number) {
        super(x, y, width, height);
        this.speed = speed;
        this.maxPosition = window.innerWidth;
        $('#paddle').css("width", this.width);
    }
    
    updatePosition(direction: string) {
        if ((direction == 'left') && (super.getLeftX() > 0)) {
            super.setX(super.getX() - this.speed);
        }

        if ((direction == 'right') && (super.getRightX() < this.maxPosition)) {
            super.setX(super.getX() + this.speed);
        }
        console.log('Paddle at: (' + super.getX() + ')');
    }
    
}
