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

  #decreaseMusicVolume() {
    this.#increaseBackgroundMusicVolumeButton.disabled = false;
    this.#increaseBackgroundMusicVolumeButton.classList.remove(CssClass.SOUND_DISABLED_BUTTON);

    media.decreaseMusicVolume();
    if (media.musicVolume === 0) {
      this.#decreaseBackgroundMusicVolumeButton.disabled = true;
      this.#decreaseBackgroundMusicVolumeButton.classList.add(CssClass.SOUND_DISABLED_BUTTON);
    }
  }

  #decreaseSoundVolume() {
    this.#increaseSoundVolumeButton.disabled = false;
    this.#increaseSoundVolumeButton.classList.remove(CssClass.SOUND_DISABLED_BUTTON);

    media.decreaseSoundVolume();
    if (media.soundVolume === 0) {
      this.#decreaseSoundVolumeButton.disabled = true;
      this.#decreaseSoundVolumeButton.classList.add(CssClass.SOUND_DISABLED_BUTTON);
    }
  }

  #increaseMusicVolume() {
    this.#decreaseBackgroundMusicVolumeButton.disabled = false;
    this.#decreaseBackgroundMusicVolumeButton.classList.remove(CssClass.SOUND_DISABLED_BUTTON);

    media.increaseMusicVolume();
    if (media.musicVolume === 1) {
      this.#increaseBackgroundMusicVolumeButton.disabled = true;
      this.#increaseBackgroundMusicVolumeButton.classList.add(CssClass.SOUND_DISABLED_BUTTON);
    }
  }

  #increaseSoundVolume() {
    this.#decreaseSoundVolumeButton.disabled = false;
    this.#decreaseSoundVolumeButton.classList.remove(CssClass.SOUND_DISABLED_BUTTON);

    media.increaseSoundVolume();
    if (media.soundVolume === 1) {
      this.#increaseSoundVolumeButton.disabled = true;
      this.#increaseSoundVolumeButton.classList.add(CssClass.SOUND_DISABLED_BUTTON);
    }
  }
}

export const settings = new Settings();
