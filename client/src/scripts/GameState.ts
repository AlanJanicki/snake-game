import { SnakeData } from '../models';

export class GameState {
  #actualLevel: number;
  #playerLives = 3;
  #playerScore = 0;
  #pointsToWin: number;
  #snakeSpeed: number = SnakeData.INIT_SPEED;

  resetPlayerStats() {
    this.#playerLives = 3;
    this.#playerScore = 0;
  }

  get actualLevel() {
    return this.#actualLevel;
  }

  get playerLives() {
    return this.#playerLives;
  }

  get playerScore() {
    return this.#playerScore;
  }

  get pointsToWin() {
    return this.#pointsToWin;
  }

  get snakeSpeed() {
    return this.#snakeSpeed;
  }

  set actualLevel(level: number) {
    this.#actualLevel = level;
  }

  set playerLives(lives: number) {
    this.#playerLives = lives;
  }

  set playerScore(score: number) {
    this.#playerScore = score;
  }

  set pointsToWin(points: number) {
    this.#pointsToWin = points;
  }

  set snakeSpeed(speed: number) {
    this.#snakeSpeed = speed;
  }
}

export const gameState = new GameState();
