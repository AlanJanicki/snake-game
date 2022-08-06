import { Common, game, gameState, media, menu, User } from './index';
import {
  CssClass,
  JsId,
  GameResultButton,
  HttpRequest,
  Visibility,
  User as UserType,
  UserData,
  Information,
  Error,
} from '../models';
import { getArrayOfData, httpRequest } from '../utils';

class GameResult extends Common {
  #backToMainMenuButton: HTMLElement;
  #resultIcon: HTMLElement;
  #resultInfo: HTMLElement;

  constructor() {
    super(JsId.RESULT);
    this.#bindToResultElements();
  }

  #bindToResultElements() {
    this.#backToMainMenuButton = this.bindToElement(JsId.BACK_TO_MAIN_MENU_BUTTON_RESULT_SCREEN);
    this.#resultIcon = this.bindToElement(JsId.RESULT_ICON);
    this.#resultInfo = this.bindToElement(JsId.RESULT_INFO);
    this.#backToMainMenuButton.addEventListener('click', () => this.#backToMainMenu());
  }

  openResult() {
    this.changeVisibility([[this.element, Visibility.SHOW]]);
    menu.hideOpenGameMenuButton();
  }

  #clearResult() {
    this.#resultInfo.innerText = '';
    this.#resultIcon.classList.remove(CssClass.RESULT_ICON_DEFEAT, CssClass.RESULT_ICON_WIN);
    const resultButtons = document.querySelectorAll(`#${JsId.RESULT_BUTTON}`);
    resultButtons.forEach((button) => button.remove());
  }

  handlePlayerDefeat() {
    this.#clearResult();
    this.#resultInfo.innerText = Information.DEFEAT;
    this.#resultIcon.classList.add(CssClass.RESULT_ICON_DEFEAT);
    this.#generateResultButton(GameResultButton.PLAY_AGAIN, Information.PLAY_AGAIN);
    media.playGameDefeatSound();
  }

  handlePlayerWin() {
    this.#clearResult();
    if (User.userData && gameState.actualLevel < User.userData.gameLevel) {
      this.#resultInfo.innerText = Information.WIN;
      this.#resultIcon.classList.add(CssClass.RESULT_ICON_WIN);
      this.#generateResultButton(
        GameResultButton.PLAY_NEXT_LEVEL,
        `${Information.PLAY_NEXT_LEVEL} ${gameState.actualLevel + 1}`
      );
    } else {
      this.#resultInfo.innerText = Information.NEW_LEVEL_UNLOCKED;
      this.#resultIcon.classList.add(CssClass.RESULT_ICON_WIN);
      this.#handlePlayerUnlockNewLevel();
    }
    media.playGameWinSound();
  }

  #backToMainMenu() {
    this.changeVisibility([[this.element, Visibility.HIDE]]);
    menu.handleBackToMainMenu();
    game.resetGame();
  }

  #handlePlayMore(level?: number) {
    level && game.setGameState(level);
    game.resetGame();
    this.changeVisibility([[this.element, Visibility.HIDE]]);
    game.resumeGame();
  }

  #generateResultButton(type: GameResultButton, text: string) {
    const button = document.createElement('button');
    button.id = JsId.RESULT_BUTTON;
    button.classList.add(CssClass.RESULT_BUTTON);
    button.innerText = text;

    button.addEventListener('click', () =>
      type === GameResultButton.PLAY_AGAIN
        ? this.#handlePlayMore()
        : type === GameResultButton.PLAY_NEW_LEVEL
        ? this.#handlePlayMore(gameState.actualLevel + 1)
        : User.userData && this.#handlePlayMore(User.userData.gameLevel)
    );

    this.#backToMainMenuButton.parentNode?.insertBefore(button, this.#backToMainMenuButton);
  }

  #handleServerErrors(errors: any[]) {
    errors.forEach((err) => {
      const errorMessage = Object.values(err).toString();
      if (!errorMessage) {
        return;
      }

      const error = document.createElement('span');
      error.classList.add(CssClass.RESULT_ERROR);
      error.innerText = `${Error.SERVER_ERROR} ${errorMessage}`;
      this.#backToMainMenuButton.parentNode?.insertBefore(error, this.#backToMainMenuButton);
    });
  }

  async #handlePlayerUnlockNewLevel() {
    if (!User.userData) {
      return;
    }

    const { gameLevel } = User.userData;

    try {
      const res = (await httpRequest(HttpRequest.PATCH, 'update', {
        [UserData.GAMELEVEL]: gameLevel + 1,
      })) as UserType;
      const { gameLevel: updatedGameLevel } = res;

      User.userData.gameLevel = updatedGameLevel;
      this.#generateResultButton(
        GameResultButton.PLAY_NEW_LEVEL,
        `${Information.PLAY_NEXT_LEVEL} ${updatedGameLevel}`
      );
    } catch (error: any) {
      console.log(error);
      this.#handleServerErrors(getArrayOfData(error));
    }
  }
}

export const gameResult = new GameResult();
