import { Common, game, menu, User } from './index';
import { CssClass, JsId, Visibility } from '../models';

class LevelSelect extends Common {
  constructor() {
    super(JsId.LEVEL_SELECT);
    this.#bindToLevelSelectElements();
  }

  #bindToLevelSelectElements() {
    const backToMenuButton = this.bindToElement(JsId.LEVEL_SELECT_BACK_TO_MAIN_MENU_BUTTON);

    backToMenuButton.addEventListener('click', () => this.#backToMenu());
  }

  openLevelSelect() {
    this.changeVisibility([[this.element, Visibility.SHOW]]);
    this.#generateLevels();
  }

  closeLevelSelect() {
    this.changeVisibility([[this.element, Visibility.HIDE]]);
  }

  #backToMenu() {
    this.closeLevelSelect();
    this.changeVisibility([[menu.element, Visibility.SHOW]]);
  }

  #generateLevels() {
    if (!User.userData) {
      return;
    }

    const levels = document.getElementById(JsId.LEVELS);
    if (!levels) {
      return;
    }

    const { gameLevel } = User.userData;

    while (levels.firstChild) {
      levels.removeChild(levels.firstChild);
    }

    for (let i = 0; i < gameLevel; i++) {
      const level = document.createElement('button');
      level.classList.add(CssClass.LEVEL_SELECT);
      level.innerText = `${i + 1}`;
      level.addEventListener('click', () => this.#playLevel(i + 1));
      levels.appendChild(level);
    }
  }

  #playLevel(level: number) {
    game.playGame(level);
  }
}

export const levelSelect = new LevelSelect();
