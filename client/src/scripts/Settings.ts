import { Common, media } from './index';

import { CssClass, JsId, Visibility } from '../models';

class Settings extends Common {
  #decreaseBackgroundMusicVolumeButton: HTMLButtonElement;
  #decreaseSoundVolumeButton: HTMLButtonElement;
  #increaseBackgroundMusicVolumeButton: HTMLButtonElement;
  #increaseSoundVolumeButton: HTMLButtonElement;
  #toggleBackgroundMusicButton: HTMLButtonElement;
  #toggleSoundButton: HTMLButtonElement;

  constructor() {
    super(JsId.SETTINGS);
    this.#bindToSettingsElements();
  }

  #bindToSettingsElements() {
    this.#toggleBackgroundMusicButton = this.bindToElement(
      JsId.TOGGLE_BACKGROUND_MUSIC_BUTTON
    ) as HTMLButtonElement;
    this.#increaseBackgroundMusicVolumeButton = this.bindToElement(
      JsId.INCREASE_BACKGROUND_MUSIC_VOLUME_BUTTON
    ) as HTMLButtonElement;
    this.#decreaseBackgroundMusicVolumeButton = this.bindToElement(
      JsId.DECREASE_BACKGROUND_MUSIC_VOLUME_BUTTON
    ) as HTMLButtonElement;
    this.#toggleSoundButton = this.bindToElement(JsId.TOGGLE_SOUND_BUTTON) as HTMLButtonElement;
    this.#increaseSoundVolumeButton = this.bindToElement(
      JsId.INCREASE_SOUND_VOLUME_BUTTON
    ) as HTMLButtonElement;
    this.#decreaseSoundVolumeButton = this.bindToElement(
      JsId.DECREASE_SOUND_VOLUME_BUTTON
    ) as HTMLButtonElement;

    this.#toggleBackgroundMusicButton.addEventListener('click', () =>
      this.#toggleBackgroundMusic()
    );
    this.#toggleSoundButton.addEventListener('click', () => this.#toggleSound());
    this.#decreaseBackgroundMusicVolumeButton.addEventListener('click', () =>
      this.#decreaseMusicVolume()
    );
    this.#decreaseSoundVolumeButton.addEventListener('click', () => this.#decreaseSoundVolume());
    this.#increaseBackgroundMusicVolumeButton.addEventListener('click', () =>
      this.#increaseMusicVolume()
    );
    this.#increaseSoundVolumeButton.addEventListener('click', () => this.#increaseSoundVolume());
  }

  openSettings() {
    this.changeVisibility([[this.element, Visibility.SHOW]]);
  }

  closeSettings() {
    this.changeVisibility([[this.element, Visibility.HIDE]]);
  }

  #toggleBackgroundMusic() {
    this.#toggleBackgroundMusicButton.classList.contains(CssClass.MUSIC_ON_BUTTON)
      ? this.#toggleBackgroundMusicButton.classList.remove(CssClass.MUSIC_ON_BUTTON)
      : this.#toggleBackgroundMusicButton.classList.add(CssClass.MUSIC_ON_BUTTON);

    media.toggleBackgroundMusic();
  }

  #toggleSound() {
    const toggleSoundIconEl = document.getElementById(JsId.TOGGLE_SOUND_ICON);
    if (!toggleSoundIconEl) {
      return;
    }
    if (this.#toggleSoundButton.classList.contains(CssClass.SOUND_ON_BUTTON)) {
      this.#toggleSoundButton.classList.remove(CssClass.SOUND_ON_BUTTON);
      toggleSoundIconEl.classList.remove(CssClass.SOUND_ON_ICON);
      toggleSoundIconEl.classList.add(CssClass.SOUND_OFF_ICON);
    } else {
      this.#toggleSoundButton.classList.add(CssClass.SOUND_ON_BUTTON);
      toggleSoundIconEl.classList.remove(CssClass.SOUND_OFF_ICON);
      toggleSoundIconEl.classList.add(CssClass.SOUND_ON_ICON);
    }

    media.toggleSound();
  }

  #toggleDisabledStatus(button: HTMLButtonElement, disabled: boolean) {
    button.disabled = disabled;
    disabled
      ? button.classList.add(CssClass.SOUND_DISABLED_BUTTON)
      : button.classList.remove(CssClass.SOUND_DISABLED_BUTTON);
  }

  #decreaseMusicVolume() {
    this.#toggleDisabledStatus(this.#increaseBackgroundMusicVolumeButton, false);
    media.decreaseMusicVolume();

    media.musicVolume === 0 &&
      this.#toggleDisabledStatus(this.#decreaseBackgroundMusicVolumeButton, true);
  }

  #decreaseSoundVolume() {
    this.#toggleDisabledStatus(this.#increaseSoundVolumeButton, false);
    media.decreaseSoundVolume();

    media.soundVolume === 0 && this.#toggleDisabledStatus(this.#decreaseSoundVolumeButton, true);
  }

  #increaseMusicVolume() {
    this.#toggleDisabledStatus(this.#decreaseBackgroundMusicVolumeButton, false);
    media.increaseMusicVolume();

    media.musicVolume === 1 &&
      this.#toggleDisabledStatus(this.#increaseBackgroundMusicVolumeButton, true);
  }

  #increaseSoundVolume() {
    this.#toggleDisabledStatus(this.#decreaseSoundVolumeButton, false);
    media.increaseSoundVolume();

    media.soundVolume === 1 && this.#toggleDisabledStatus(this.#increaseSoundVolumeButton, true);
  }
}

export const settings = new Settings();
