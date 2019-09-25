class Board {
    leftEdgeX: number;
    rightEdgeX: number;
    topEdgeY: number;
    
    constructor(leftEdgeX: number, 
                rightEdgeX: number, 
                topEdgeY: number) {
        this.leftEdgeX = leftEdgeX;
        this.rightEdgeX = rightEdgeX;
        this.topEdgeY = topEdgeY;
    }
    
    getLeftEdgeX() {
        return this.leftEdgeX;
    }
    
    getRightEdgeX() {
        return this.rightEdgeX;
    }
    
    getTopEdgeY() {
        return this.topEdgeY;
    }
}
