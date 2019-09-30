class GameState {
    score: number;
    lives: number;
    level: number;
    activePowerUp: PowerUp;
    paddle: Paddle;
    gameMode: string;

    constructor(score: number, lives: number,
                level: number, activePowerUp: PowerUp,
                paddle: Paddle, gameMode: string) {
        this.score = score;
        this.activePowerUp = activePowerUp;
        this.level = level;
        this.lives = lives;
        this.gameMode = gameMode;
        this.paddle = paddle;
    }

    startGameState() {
        console.log("this is running")
        if (this.gameMode == "NormalMode") {
            this.lives = 3;
        } else if (this.gameMode == "HardCoreMode") {
            this.paddle.setWidthMultBy(.5);
            this.lives = 1;
        } else if (this.gameMode == "AILab") {

        } else if (this.gameMode == "LevelEditor") {

        }
    }

    updateGameState() {
        if (this.gameMode == "NormalMode") {
            $("#lives").text("Lives: " + this.lives);
            $("#score").text("Score: " + this.score);
        } else if (this.gameMode == "ZenMode") {
            $("#lives").text("Lives: ∞");
            $("#score").text("Score: " + this.score);
        } else if (this.gameMode == "HardCoreMode") {
            $("#lives").text("Lives: " + this.lives);
            $("#score").text("Score: " + this.score);
        } else if (this.gameMode == "AILab") {

        } else if (this.gameMode == "LevelEditor") {

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
