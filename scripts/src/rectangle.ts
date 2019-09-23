class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    
    constructor(x: number, 
                y: number, 
                width: number, 
                height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    getLeftX() {
        return this.x - this.width / 2;
    }
    
    getRightX() {
        return this.x + this.width / 2;
    }
    
    getTopY() {
        return this.y + this.height / 2;
    }
    
    getBottomY() {
        return this.y - this.height / 2;
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    getWidth() {
        return this.width;
    }
    
    getHeight() {
        return this.height;
    }
    
    setX(x: number) {
        this.x = x;
    }
    
    setY(y: number) {
        this.y = y;
    }
    
    setWidth(width: number) {
        this.width = width;
    }
    
    setHeight(height: number) {
        this.height = height;
    }
    
}

