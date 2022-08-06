import { canvas, Common, form, menu, settings } from './index';

import { JsId, KeyboardKey, Visibility } from './../models';

class Modal extends Common {
  constructor() {
    super(JsId.MODAL);
    this.#bindToModalElements();
  }

  #bindToModalElements() {
    const closeButton = this.bindToElement(JsId.CLOSE_BUTTON);

    closeButton.addEventListener('click', () => this.closeModal());
    window.addEventListener('keydown', (e) => this.#closeModalWithKeyboard(e));
  }

  openModal() {
    this.changeVisibility([[this.element, Visibility.SHOW]]);
  }

  closeModal() {
    this.changeVisibility([[this.element, Visibility.HIDE]]);

    if (form.formType === JsId.DELETE_ACCOUNT_FORM) {
      form.closeForm();
      this.changeVisibility([[menu.element, Visibility.SHOW]]);
    }

    if (this.isVisible(settings.element) && !this.isVisible(canvas.element)) {
      settings.closeSettings();
      this.changeVisibility([[menu.element, Visibility.SHOW]]);
    } else if (this.isVisible(settings.element) && this.isVisible(canvas.element)) {
      settings.closeSettings();
      menu.handleOpenGameMenu();
    } else if (!this.isVisible(settings.element) && this.isVisible(menu.gameMenu)) {
      menu.handleCloseGameMenu();
    }

    window.removeEventListener('keydown', (e) => this.#closeModalWithKeyboard(e));
  }

  #closeModalWithKeyboard(e: KeyboardEvent) {
    e.key === KeyboardKey.ESCAPE &&
      this.isVisible(this.element) &&
      !this.isVisible(menu.gameMenu) &&
      this.closeModal();
  }
}

export const modal = new Modal();
