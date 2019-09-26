class Board {
    leftEdgeX: number;
    rightEdgeX: number;
    topEdgeY: number;
    bottomEdgeY: number;
    
    constructor(leftEdgeX: number, 
                rightEdgeX: number, 
                topEdgeY: number,
                bottomEdgeY: number) {
        this.leftEdgeX = leftEdgeX;
        this.rightEdgeX = rightEdgeX;
        this.topEdgeY = topEdgeY;
        this.bottomEdgeY = bottomEdgeY;
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

    getBottomEdgeY() {
        return this.bottomEdgeY;
    }
}
