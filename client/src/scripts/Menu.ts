import { canvas, Common, form, game, levelSelect, loader, modal, settings, User } from './index';

import { CssClass, Event, JsId, Url, User as UserType, UserData, Visibility } from '../models';

import { debounce, resizeGameWindow } from '../utils';

export class Menu extends Common {
  #gameMenu: HTMLElement;
  #loginButton: HTMLElement;
  #menuUserLoggedIn: HTMLElement;
  #menuUserLoggedOut: HTMLElement;
  #openGameMenuButton: HTMLElement;
  #playButton: HTMLElement;

  constructor() {
    super(JsId.MAIN_MENU);
    this.#bindToMenuElements();
    this.handleUserLoggedIn();
    resizeGameWindow();
    window.addEventListener(
      'resize',
      debounce(() => resizeGameWindow(), 1000)
    );
  }

  #bindToMenuElements() {
    const backToMainMenuButton = this.bindToElement(JsId.BACK_TO_MAIN_MENU_BUTTON);
    const deleteAccountButton = this.bindToElement(JsId.DELETE_ACCOUNT_BUTTON);
    this.#gameMenu = this.bindToElement(JsId.GAME_MENU);
    this.#loginButton = this.bindToElement(JsId.LOGIN_BUTTON);
    const logoutButton = this.bindToElement(JsId.LOGOUT_BUTTON);
    this.#menuUserLoggedIn = this.bindToElement(JsId.MENU_USER_LOGGED_IN);
    this.#menuUserLoggedOut = this.bindToElement(JsId.MENU_USER_LOGGED_OUT);
    this.#openGameMenuButton = this.bindToElement(JsId.OPEN_GAME_MENU_BUTTON);
    this.#playButton = this.bindToElement(JsId.PLAY_BUTTON);
    const registerButton = this.bindToElement(JsId.REGISTER_BUTTON);
    const resetGameButton = this.bindToElement(JsId.RESET_GAME_BUTTON);
    const resumeGameButton = this.bindToElement(JsId.RESUME_GAME_BUTTON);
    const settingsButton = this.bindToElement(JsId.SETTINGS_BUTTON);
    const settingsGameMenuButton = this.bindToElement(JsId.SETTINGS_GAME_MENU_BUTTON);

    backToMainMenuButton.addEventListener('click', () => this.handleBackToMainMenu());
    deleteAccountButton.addEventListener('click', () => this.#handleUserAccountAction(Url.DELETE));
    this.#loginButton.addEventListener('click', () => this.#handleUserAccountAction(Url.LOGIN));
    logoutButton.addEventListener('click', () => this.#handleUserAccountAction(Url.LOGOUT));
    this.#openGameMenuButton.addEventListener('click', () => this.handleOpenGameMenu());
    this.#playButton.addEventListener('click', () => this.#handlePlay());
    registerButton.addEventListener('click', () => this.#handleUserAccountAction(Url.REGISTER));
    resetGameButton.addEventListener('click', () => this.#handleResetGame());
    resumeGameButton.addEventListener('click', () => this.handleCloseGameMenu());
    settingsButton.addEventListener('click', () => this.#openSettings());
    settingsGameMenuButton.addEventListener('click', () => this.#handleSettingsInGame());
  }

  handleUserLoggedIn(loggedUser?: UserType) {
    if (!loggedUser) {
      loader.loadGameElements();
      window.addEventListener(Event.ELEMENTS_LOADED, () => this.#showMenuForUser());
    } else {
      this.#showMenuForUser(loggedUser);
    }
  }

  handleUserLoggedOut() {
    User.removeUserData();
    this.#showMenuForUser(undefined, true);
  }

  async #showMenuForUser(loggedUser?: UserType, userHasLoggedOut?: boolean) {
    if (!loggedUser && !userHasLoggedOut) {
      try {
        loader.handleUserLoadingStatus(UserData.LOADING);
        await User.isUserSessionValid();
      } catch (err) {
        console.log(err);
        return loader.handleUserLoadingStatus(UserData.ERROR);
      }
    }

    const user = User.userData;
    this.isVisible(loader.element) && this.changeVisibility([[loader.element, Visibility.HIDE]]);
    window.removeEventListener(Event.ELEMENTS_LOADED, () => this.#showMenuForUser());
    modal.closeModal();
    this.changeVisibility([
      [this.element, Visibility.SHOW],
      [this.#menuUserLoggedIn, user ? Visibility.SHOW : Visibility.HIDE],
      [this.#menuUserLoggedOut, user ? Visibility.HIDE : Visibility.SHOW],
    ]);
    this.#playButton.innerText = user ? `Graj, ${user.name}!` : '';
  }

  #closeMenu() {
    this.changeVisibility([[this.element, Visibility.HIDE]]);
  }

  #handleUserAccountAction(url: Url) {
    if (url === Url.LOGOUT) {
      return this.handleUserLoggedOut();
    }

    modal.openModal();
    form.openForm(
      url === Url.LOGIN
        ? JsId.LOGIN_FORM
        : url === Url.REGISTER
        ? JsId.REGISTER_FORM
        : JsId.DELETE_ACCOUNT_FORM
    );
    url === Url.DELETE && this.#closeMenu();
  }

  showOpenGameMenuButton() {
    this.changeVisibility([[this.#openGameMenuButton, Visibility.SHOW]]);
  }

  hideOpenGameMenuButton() {
    this.changeVisibility([[this.#openGameMenuButton, Visibility.HIDE]]);
  }

  #openGameMenu() {
    modal.openModal();
    this.changeVisibility([[this.#gameMenu, Visibility.SHOW]]);
    this.#openGameMenuButton.classList.add(CssClass.OPEN_GAME_MENU_BUTTON_ACTIVE);
  }

  #closeGameMenu() {
    this.changeVisibility([[this.#gameMenu, Visibility.HIDE]]);
    modal.closeModal();
  }

  #openSettings() {
    modal.openModal();
    settings.openSettings();
    this.#closeMenu();
  }

  #handlePlay() {
    this.#closeMenu();
    levelSelect.openLevelSelect();
  }

  handleOpenGameMenu() {
    this.#openGameMenu();
    game.pauseGame();
  }

  handleCloseGameMenu() {
    this.#closeGameMenu();
    game.resumeGame();
    this.#openGameMenuButton.classList.remove(CssClass.OPEN_GAME_MENU_BUTTON_ACTIVE);
  }

  #handleSettingsInGame() {
    this.#closeGameMenu();
    this.#openSettings();
  }

  #handleResetGame() {
    this.#closeGameMenu();
    game.resetGame();
    game.resumeGame();
  }

  handleBackToMainMenu() {
    canvas.closeCanvas();
    this.#closeGameMenu();
    levelSelect.closeLevelSelect();
    this.#openGameMenuButton.classList.remove(CssClass.OPEN_GAME_MENU_BUTTON_ACTIVE);
    this.#showMenuForUser();
  }

  get loginButton() {
    return this.#loginButton;
  }

  get gameMenu() {
    return this.#gameMenu;
  }
}
