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

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getPid(){
        return this.pid;
    }

    getState(){
        return this.state;
    }

    getDuration(){
        return this.duration;
    }

}
