class GameState {
    score: number;
    lives: number;
    level: number;
    activePowerUp: Powerup;
    gameMode: string;
    
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
    }

    setGameMode(str:string) {
        this.gameMode = str;
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
}
