import { Common, gameResult, gameState, GameState, menu, settings } from './index';
import {
  CanvasCommon,
  JsId,
  GameState as Info,
  KeyboardKey,
  TopBarOffset,
  Visibility,
} from '../models';

const getFormattedGameStateInfo = (gameState: GameState) => [
  {
    text: Info.LEVEL,
    offsetX: 10,
  },
  {
    text: `${gameState.actualLevel}`,
    offsetX: 70,
  },
  {
    text: Info.WIN_THRESHOLD,
    offsetX: 90,
  },
  {
    text: `${gameState.pointsToWin} pkt`,
    offsetX: 220,
  },
  {
    text: Info.YOURS_SCORE,
    offsetX: 290,
  },
  {
    text: `${gameState.playerScore} pkt`,
    offsetX: 400,
  },
  {
    text: Info.YOURS_LIVES,
    offsetX: 460,
  },
  {
    text: `${gameState.playerLives}`,
    offsetX: 560,
  },
];

class Canvas extends Common {
  #context: CanvasRenderingContext2D | null;

  constructor() {
    super(JsId.CANVAS);
    this.#setCanvas();
    window.addEventListener('keydown', (e) => this.#handleGameMenu(e));
  }

  #setCanvas() {
    const element = this.element as HTMLCanvasElement;
    this.#context = element.getContext('2d');
    if (this.#context) {
      this.#context.canvas.width = CanvasCommon.WIDTH;
      this.#context.canvas.height = CanvasCommon.HEIGHT;
      this.#context.font = CanvasCommon.FONT;
      this.#context.fillStyle = '#fff';
    }
  }

  openCanvas() {
    this.changeVisibility([[this.element, Visibility.SHOW]]);
    menu.showOpenGameMenuButton();
  }

  closeCanvas() {
    this.changeVisibility([[this.element, Visibility.HIDE]]);
    menu.hideOpenGameMenuButton();
  }

  drawGame() {
    this.#context?.clearRect(0, 0, CanvasCommon.WIDTH, CanvasCommon.HEIGHT);
    this.drawBackground();
    this.#drawGameStateInfo();
  }

  drawRedScreen() {
    if (!this.#context) {
      return;
    }
    this.#context.fillStyle = CanvasCommon.RED_COLOR;
    this.#context.fillRect(0, 0, CanvasCommon.WIDTH, CanvasCommon.HEIGHT);
  }

  drawBackground() {
    this.#context?.clearRect(0, 0, CanvasCommon.WIDTH, CanvasCommon.HEIGHT);
    this.element.style.backgroundColor = '#a5d03b';
    this.element.style.backgroundImage = `
    repeating-linear-gradient(
      45deg,
      #acd643 25%,
      transparent 25%,
      transparent 75%,
      #acd643 75%,
      #acd643
    ),
    repeating-linear-gradient(45deg, #acd643 25%, #a5d03b 25%, #a5d03b 75%, #acd643 75%, #acd643)`;
    this.element.style.backgroundPosition = `0 0, 10px 10px`;
    this.element.style.backgroundSize = `20px 20px`;
  }

  #drawGameStateInfo() {
    if (!this.#context) {
      return;
    }
    const gameStateFormattedInfo = getFormattedGameStateInfo(gameState);

    for (let i = 0; i < gameStateFormattedInfo.length; i++) {
      const { text, offsetX } = gameStateFormattedInfo[i];

      this.#context.fillStyle = i % 2 === 0 ? CanvasCommon.BLUE_COLOR : CanvasCommon.RED_COLOR;
      this.#context.fillText(text, offsetX, TopBarOffset.Y);
    }
  }

  #handleGameMenu(e: KeyboardEvent) {
    if (
      e.key === KeyboardKey.ESCAPE &&
      this.isVisible(this.element) &&
      !this.isVisible(gameResult.element)
    ) {
      if (!this.isVisible(menu.gameMenu)) {
        menu.handleOpenGameMenu();
        this.isVisible(settings.element) && settings.closeSettings();
      } else {
        menu.handleCloseGameMenu();
      }
    }
  }

  get context() {
    return this.#context;
  }
}

export const canvas = new Canvas();
