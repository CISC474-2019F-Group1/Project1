class GameState {
    score: number;
    lives: number;
    level: number;
    activePowerUp: PowerUp;
    gameMode: string;
    timer: number;
    solidFloor: boolean;
    
    constructor(score: number,
                lives: number,
                level: number,
                activePowerUp: PowerUp,
                gameMode: string) {
        this.score = score;
        this.activePowerUp = activePowerUp;
        this.level = level;
        this.lives = lives;
        this.gameMode = gameMode;
        this.timer = 0;
        this.solidFloor = false;
    }

    updateGameState(gameMode: string) {
        if (gameMode == "normalMode") {
            $("#lives").text("Lives: " + gameState.getLives());
            $("#score").text("Score: " + gameState.getScore());
        } else if (gameMode == "zenMode") {
            $("#lives").text("Lives: ∞");
            $("#score").text("Score: " + gameState.getScore());
        } else if (gameMode == "hardCoreMode") {
        }
    }

    setPowerup(p:PowerUp){

        this.activePowerUp = p;
        clearTimeout(this.timer);
        this.timer = setTimeout(this.endPowerUp, p.getDuration()*1000);

    }

    endPowerUp(){

        this.activePowerUp = new PowerUp(0,0);
        console.log("Cleared powerup");

    }

    setFloor(sf: boolean){
        this.solidFloor = sf;
    }

    setGameMode(str: string) { this.gameMode = str }

    decrementScoreBy(num: number) { this.score -= num }

    incrementScoreBy(num: number) { this.score += num }

    getPowerup(){
        return this.activePowerUp;
    }

    getFloor(){
        return this.solidFloor; 
    }
    decrementLives() { this.lives -= 1 }

    incrementLives() { this.lives += 1 }

    getScore() { return this.score }

    getLives() { return this.lives }

    getGameMode() { return this.gameMode }
}
