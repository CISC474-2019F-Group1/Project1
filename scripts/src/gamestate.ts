class GameState {
    score: number;
    lives: number;
    level: number;
    activePowerUp: Powerup;
    gameMode: string;
    timer: number;
    solidFloor: boolean;
    
    constructor(score: number,
                lives: number,
                level: number,
                activePowerUp: Powerup,
                gameMode: string) {
        this.score = score;
        this.activePowerUp = activePowerUp;
        this.level = level;
        this.lives = lives;
        this.gameMode = gameMode;
        this.timer = 0;
        this.solidFloor = false;
    }

    setGameMode(str:string) {
        this.gameMode = str;
    }

    setPowerup(p:Powerup){

        this.activePowerUp = p;
        clearTimeout(this.timer);
        this.timer = setTimeout(this.endPowerUp, p.getDuration()*1000);

    }

    endPowerUp(){

        this.activePowerUp = new Powerup(0,0);
        console.log("Cleared powerup");

    }

    setFloor(sf: boolean){
        this.solidFloor = sf;
    }

    decrementScoreBy(num:number) {
        this.score -= num;
    }

    incrementScoreBy(num:number) {
        this.score += num;
    }

    decrementLives() {
        this.lives -= 1;
    }

    incrementLives() {
        this.lives += 1;
    }


    getScore() {
        return this.score;
    }
    
    getLives() {
        return this.lives;
    }

    getGameMode() {
        return this.gameMode;
    }

    getPowerup(){
        return this.activePowerUp;
    }

    getFloor(){
        return this.solidFloor; 
    }
}
