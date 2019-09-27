class Powerup {

    /*
       0 - no powerup
       1 - ???
       2 - ???
       3 - ???
    */

    pid: number;
    duration: number;
    state: string;
    x: number;
    y: number;

    constructor(p: number, d: number) {
        
        this.pid = p;
        this.duration = d;
        this.state = 'block';
        this.x = 0;
        this.y = 0;

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

    place(startX: number, startY: number){

        if((this.state === 'block') && (this.pid != 0)){
            this.x = startX;
            this.y = startY;
            this.state = 'falling';
        }

    }

    activate(){

        if(this.state === 'falling'){

            this.x = -100;
            this.y = -100;
            this.state = 'activated';

        }

    } 

    updatePowerup(){

        if(this.state === 'falling'){

            this.y -= 1;

        }

    }

}
