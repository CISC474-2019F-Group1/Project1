class gameState {
    score: number;
    mode: number;
    activePowerup: Powerup;
    level: number;
    
    constructor(score: number,
                mode: number,
                activePowerup: Powerup,
                level: number) {
        this.score = score;
        this.mode = mode;
        this.activePowerup = activePowerup;
        this.level = level;
    }
}
