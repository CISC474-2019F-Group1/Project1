class Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    
    constructor(x: number, y: number, vx: number, vy: number, radius: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }
    
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    getVX() {
        return this.vx;
    }
    
    getVY() {
        return this.vy;
    }
    
    getRadius() {
        return this.radius;
    }
    
    moveAndCollide(bricks: Brick[], board: Board, paddle: Paddle, delta: number) {
        let prevX: number = this.x;
        let prevY: number = this.y;
        
        // Move
        this.x += this.vx * delta;
        this.y += this.vy * delta;
        console.log("move");
        
        // Collide bricks
        for (let i: number = 0; i < bricks.length; i++) {
            if (bricks[i].getStrength() < 1) {
                continue;
            }
            let c: any = this.checkCollideRect(bricks[i]);
            if (c.hit) {
                // Move back to position before collision
                this.x = prevX;
                this.y = prevY;
                
                // Bounce
                if (c.distX < c.distY) { // collision with horizontal side
                    this.vy = -this.vy;
                } else {                 // collision with vertical side
                    this.vx = -this.vx;
                }
                
                // Lower strength of brick
                bricks[i].decrementStrength();
                return;
            }
        }
        
        // Collide walls
        if (this.x - board.getLeftEdgeX() < this.radius 
         || board.getRightEdgeX() - this.x < this.radius) {
            // Move back to position before collision
            this.x = prevX;
            this.y = prevY;
                
            // Bounce
            this.vx = -this.vx;
            return;
        } else if (board.getTopEdgeY() - this.y < this.radius) {
            // Move back to position before collision
            this.x = prevX;
            this.y = prevY;
                
            // Bounce
            this.vy = -this.vy;
            return;
        }
        
        // Collide paddle
        let c: any = this.checkCollideRect(paddle);
        if (c.hit) {
            // Move back to position before collision
            this.x = prevX;
            this.y = prevY;
            
            // Bounce
            if (c.distX < c.distY) { // collision with horizontal side
                this.vy = -this.vy;
                this.vx = (this.x - paddle.getX()) / (paddle.getWidth() / 2) * 0.25; 
                /* TODO remove "* 0.1" above and add real speed multiplier */
            } else {                 // collision with vertical side
                this.vx = -this.vx;
            }
            return;
        }
    }
    
    checkCollideRect(rect: Rectangle) {
        let testX: number = this.x;
        var testY: number = this.y;
        
        if      (this.x < rect.getLeftX())   { testX = rect.getLeftX() }
        else if (this.x > rect.getRightX())  { testX = rect.getRightX() }
        if      (this.y < rect.getBottomY()) { testY = rect.getBottomY() }
        else if (this.y > rect.getTopY())    { testY = rect.getTopY() }
        
        let distX: number = this.x - testX;
        let distY: number = this.y - testY;
        let distance: number = Math.sqrt(distX * distX + distY * distY);
        
        return {
            "hit" : distance <= this.radius,
            "distX" : distX,
            "distY" : distY
        };
    }

}
