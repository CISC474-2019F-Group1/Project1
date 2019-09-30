class Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;

    constructor(x: number, y: number,
                vx: number, vy: number,
                radius: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
    }

    setVY(num:number) {
        this.vy = num;
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
    
    moveAndCollide(gameState: GameState, bricks: Map<number, Brick>, board: Board, paddle: Paddle, delta: number, ballStrength:number) {
        let prevX: number = this.x;
        let prevY: number = this.y;

        // Move
        this.x += this.vx * delta;
        this.y += this.vy * delta;

        // Collide bricks
        for (let [i, brick] of bricks) {
            if (brick.getStrength() < 1) {
                continue;
            }

            let c: any = this.checkCollideRect(brick);
            if (c.hit) {
                // Move back to position before collision
                this.x = prevX;
                this.y = prevY;

                // Bounce
                if (Math.abs(c.distX) < Math.abs(c.distY)) {
                    // Collision with horizontal side
                    this.vy = -this.vy;
                } else {
                    // Collision with vertical side
                    this.vx = -this.vx;
                }

                // Lower strength of brick
                brick.decrementStrength(ballStrength);
                if (brick.getStrength() < 1) { 
                    gameState.incrementScoreBy(5);
                } else if (brick.getStrength() == 1) {
                    gameState.incrementScoreBy(2);
                } else {
                    gameState.incrementScoreBy(1);
                }

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
        } else if (this.y - board.getBottomEdgeY() < this.radius) {
            if(gameState.getFloor()){
                // If there is a solid floor, just bounce
                this.x = prevX;
                this.y = prevY;

                this.vy = -this.vy;
            }else{
                // Move back to original position
                this.x = BOARD_WIDTH / 2;
                this.y = 100;
                this.vx = 0; 
                this.vy = 0;
                this.radius = 10;
                gameState.endPowerUp();
                gameState.decrementLives();
                if (gameState.getLives() < 1) {
                    gameState.decrementScoreBy(gameState.getScore());
                    for (let i:number = 0; i<3; i++) { gameState.incrementLives(); }
                }
                document.querySelector<HTMLElement>("#hints")!.innerHTML = "Press space to drop the ball";
                return;
            }
            if (gameState.getGameMode() != "zenMode") {
                gameState.decrementLives();
                if (gameState.getLives() < 1) {
                    gameState.decrementScoreBy(gameState.getScore());
                    for (let i: number = 0; i < 3; i++) { gameState.incrementLives(); }
                }
            } 
            return;
        }

        // Collide paddle
        let c: any = this.checkCollideRect(paddle);
        if (c.hit) {
            // Move back to position before collision
            this.x = prevX;
            this.y = prevY;

            // Bounce
            if (Math.abs(c.distX) < Math.abs(c.distY)) {
                // Collision with horizontal side
                this.vy = -this.vy;
                this.vx = (this.x - paddle.getX()) / (paddle.getWidth() / 2) * 0.5;
                /* TODO remove "* 0.1" above and add real speed multiplier */
            } else {
                // Collision with vertical side
                this.vx = -this.vx;
            }
            return;
        }
    }

    checkCollideRect(rect: Rectangle) {
        let testX: number = this.x;
        var testY: number = this.y;

        if (this.x < rect.getLeftX()) { testX = rect.getLeftX() }
        else if (this.x > rect.getRightX()) { testX = rect.getRightX() }
        if (this.y < rect.getBottomY()) { testY = rect.getBottomY() }
        else if (this.y > rect.getTopY()) { testY = rect.getTopY() }

        let distX: number = this.x - testX;
        let distY: number = this.y - testY;
        let distance: number = Math.sqrt(distX * distX + distY * distY);

        return {
            "hit": distance <= this.radius,
            "distX": distX,
            "distY": distY
        };
    }

}
