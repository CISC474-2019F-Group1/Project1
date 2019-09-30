class GameState {
    score: number;
    lives: number;
    level: number;
    activePowerUp: PowerUp;
    gameMode: string;

    constructor(score: number, lives: number,
                level: number, activePowerUp: PowerUp,
                gameMode: string) {
        this.score = score;
        this.activePowerUp = activePowerUp;
        this.level = level;
        this.lives = lives;
        this.gameMode = gameMode;
    }

    updateGameState(gameMode: string) {
        if (gameMode == "normalMode") {
            $("#lives").text("Lives: " + gameState.getLives());
            $("#score").text("Score: " + gameState.getScore());
        } else if (gameMode == "zenMode") {
            $("#lives").text("Lives: ∞");
            $("#score").text("Score: " + gameState.getScore());
        } else if (gameMode == "hardCoreMode") {

        } else if (gameMode == "aiLab") {

        } else if (gameMode == "levelEditor") {

        }
    }

    setGameMode(str: string) { this.gameMode = str }

    decrementScoreBy(num: number) { this.score -= num }

    incrementScoreBy(num: number) { this.score += num }

    decrementLives() { this.lives -= 1 }

    incrementLives() { this.lives += 1 }

    getScore() { return this.score }

    getLives() { return this.lives }

    getGameMode() { return this.gameMode }
}
