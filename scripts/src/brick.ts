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
    
}
