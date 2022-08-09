import { Apple, canvas, Common, gameState, gameResult, media, menu, Snake } from './index';
import {
  Axis,
  CanvasCommon,
  Direction,
  GameResult,
  KeyboardKey,
  SnakeData,
  SPRITE_SIZE,
  TopBarOffset,
} from '../models/';

class Game extends Common {
  #apple: Apple;
  #gameLoop: number;
  #gameLoopPrevTimeStamp = 0;
  #snake: Snake[] = [];
  #newSnakeDirection: Direction = Direction.RIGHT;

  constructor() {
    super();
  }

  playGame(level: number) {
    window.addEventListener('keydown', (e) => this.#handlePlayerPressKeys(e));
    this.setGameState(level);
    canvas.openCanvas();
    this.resetGame();
    this.#apple = new Apple();
    media.playBackgroundMusic();
    this.#handleGameEnd();
  }

  pauseGame() {
    window.removeEventListener('keydown', (e) => this.#handlePlayerPressKeys(e));
    media.stopBackgroundMusic();
    window.cancelAnimationFrame(this.#gameLoop);
  }

  resumeGame() {
    window.addEventListener('keydown', (e) => this.#handlePlayerPressKeys(e));
    media.playBackgroundMusic();
    menu.showOpenGameMenuButton();
    this.#handleGameEnd();
  }

  resetGame() {
    Snake.reset({ x: SnakeData.INIT_OFFSET_X, y: SnakeData.INIT_OFFSET_Y }, Direction.RIGHT, true);
    gameState.resetPlayerStats();
    this.#newSnakeDirection = Direction.RIGHT;
  }

  setGameState(level: number) {
    const updatedSnakeSpeed = SnakeData.INIT_SPEED - level * 40;
    gameState.actualLevel = level;
    gameState.snakeSpeed = Math.max(updatedSnakeSpeed, 50);
    gameState.pointsToWin = level * 30;
  }

  #runGameLoop() {
    canvas.drawGame();
    this.#drawGameElementsOnCanvas();
    this.#handleGameStatus();
  }

  #drawGameElementsOnCanvas() {
    this.#snake.forEach((snakeElement) => snakeElement.draw());
    this.#apple.draw();
  }

  #handleSnakeMove() {
    media.playSnakeMoveSound();
    Snake.move(this.#newSnakeDirection);
  }

  #handlePlayerPressKeys(e: KeyboardEvent) {
    const { key } = e;
    this.#newSnakeDirection =
      key === KeyboardKey.ARROW_UP
        ? Direction.UP
        : key === KeyboardKey.ARROW_DOWN
        ? Direction.DOWN
        : key === KeyboardKey.ARROW_RIGHT
        ? Direction.RIGHT
        : Direction.LEFT;
  }

  #handleGameStatus() {
    this.#handlePlayerMove();
    this.#handleGameEnd();
  }

  #handleGameResult(result: GameResult) {
    this.pauseGame();
    canvas.drawBackground();
    gameResult.openResult();
    result === GameResult.DEFEAT ? gameResult.handlePlayerDefeat() : gameResult.handlePlayerWin();
  }

  #handleGameEnd() {
    const { playerLives, playerScore, pointsToWin } = gameState;

    if (playerLives < 1) {
      this.#handleGameResult(GameResult.DEFEAT);
    } else if (playerScore === pointsToWin) {
      this.#handleGameResult(GameResult.WIN);
    } else {
      this.#gameLoop = window.requestAnimationFrame((timestamp: number) => {
        if (
          this.#gameLoopPrevTimeStamp === 0 ||
          timestamp - this.#gameLoopPrevTimeStamp > gameState.snakeSpeed
        ) {
          this.#gameLoopPrevTimeStamp = timestamp;
          this.#handleSnakeMove();
        }
        this.#runGameLoop();
      });
    }
  }

  #handlePlayerMove() {
    const {
      offset: { x, y },
    } = this.#snake[0];

    this.#handleSnakeCollisionWithBarrier(x, y);
    this.#handleSnakeInnerCollision(x, y);
    this.#handleSnakeHitApple();
  }

  #handleSnakeCollisionWithBarrier(snakeHeadX: number, snakeHeadY: number) {
    const collisionRight = snakeHeadX > CanvasCommon.WIDTH - 16;
    const collisionLeft = snakeHeadX < 0;
    const collisionTop = snakeHeadY < TopBarOffset.Y;
    const collisionDown = snakeHeadY > CanvasCommon.HEIGHT - SPRITE_SIZE;

    if (!collisionRight && !collisionLeft && !collisionTop && !collisionDown) {
      return;
    }

    gameState.playerLives--;
    Snake.reset(
      {
        x: collisionRight
          ? CanvasCommon.WIDTH
          : collisionLeft
          ? SnakeData.INIT_OFFSET_X
          : snakeHeadX,
        y: collisionDown ? CanvasCommon.HEIGHT : collisionTop ? SPRITE_SIZE : snakeHeadY,
      },
      collisionRight
        ? Direction.LEFT
        : collisionLeft
        ? Direction.RIGHT
        : collisionDown
        ? Direction.UP
        : Direction.DOWN
    );
  }

  #handleSnakeInnerCollision(snakeHeadX: number, snakeHeadY: number) {
    const isInnerCollision = this.#snake.some(
      (snakeEl, i) => i !== 0 && snakeEl.offset.x === snakeHeadX && snakeEl.offset.y === snakeHeadY
    );

    if (!isInnerCollision) {
      return;
    }

    gameState.playerLives--;
    Snake.reset(
      {
        x:
          this.#newSnakeDirection === Direction.RIGHT
            ? CanvasCommon.WIDTH
            : this.#newSnakeDirection === Direction.LEFT
            ? SnakeData.INIT_OFFSET_X
            : snakeHeadX,
        y:
          this.#newSnakeDirection === Direction.UP
            ? 0
            : this.#newSnakeDirection === Direction.DOWN
            ? CanvasCommon.HEIGHT
            : snakeHeadY,
      },
      this.#newSnakeDirection === Direction.RIGHT
        ? Direction.LEFT
        : this.#newSnakeDirection === Direction.LEFT
        ? Direction.RIGHT
        : this.#newSnakeDirection === Direction.UP
        ? Direction.DOWN
        : Direction.UP
    );
  }

  #handleSnakeHitApple() {
    const { X, Y } = Axis;
    const isCollisionOnAxis = (axis: Axis) =>
      Math.abs(this.#snake[0].offset[axis] - this.#apple.offset[axis]) < SPRITE_SIZE;

    if (isCollisionOnAxis(X) && isCollisionOnAxis(Y)) {
      Snake.grow();
      this.#apple.move();
      gameState.playerScore += 10;
    }
  }

  get apple() {
    return this.#apple;
  }

  get snake() {
    return this.#snake;
  }
}

export const game = new Game();
