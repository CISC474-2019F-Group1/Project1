class PowerUp {

    /*
       0 - no powerup
       1 - super strength
       2 - solid floor
       3 - bigger paddle
    */

    pid: number;
    duration: number;
    state: string;
    x: number;
    y: number;
    radius: number;

    constructor(p: number, d: number) {
        this.pid = p;
        this.duration = d;
        this.state = 'block';
        this.x = 0;
        this.y = 0;
        this.radius = 15;
    }

    place(startX: number, startY: number) {
        if ((this.state === 'block') && (this.pid != 0)) {
            this.x = startX;
            this.y = startY;
            this.state = 'falling';
        }
    }

    activate() {
        if (this.state === 'falling') {
            this.x = -100;
            this.y = -100;
            this.state = 'activated';
        }
    }

    updatePowerUp() {
        if (this.state === 'falling') { this.y -= 1 }
        if (this.checkCollideRect(paddle)) { console.log("Collided") }
    }

    checkCollideRect(rect: Rectangle) {
        let testX: number = this.x;
        var testY: number = this.y;

        if (this.x < rect.getLeftX()) {
            testX = rect.getLeftX();
        } else if (this.x > rect.getRightX()) {
            testX = rect.getRightX();
        }
        if (this.y < rect.getBottomY()) {
            testY = rect.getBottomY();
        }
        else if (this.y > rect.getTopY()) {
            testY = rect.getTopY();
        }

        let distX: number = this.x - testX;
        let distY: number = this.y - testY;
        let distance: number = Math.sqrt(distX * distX + distY * distY);

        return {
            "hit": distance <= this.radius,
            "distX": distX,
            "distY": distY
        };
    }

    getX() { return this.x }

    getY() { return this.y }

    getPid() { return this.pid }

    getState() { return this.state }

}
