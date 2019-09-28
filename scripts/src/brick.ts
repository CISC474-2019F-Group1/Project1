class Brick extends Rectangle {
    strength: number;
    
    constructor(x: number, 
                y: number, 
                width: number, 
                height: number, 
                strength: number) {
        super(x, y, width, height);
        this.strength = strength;
    }
    
    decrementStrength() {
        this.strength -= 1;
    }
    
    getStrength() {
        return this.strength;
    }
    
    clone() {
        return new Brick(
            super.getX(), 
            super.getY(), 
            super.getWidth(), 
            super.getHeight(), 
            this.getStrength());
    }
    
}
