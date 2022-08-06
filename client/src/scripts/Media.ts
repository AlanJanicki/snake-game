import { Common, modal } from './index';

class Media extends Common {
  #appleSprite: HTMLImageElement;
  #backgroundMusic: HTMLAudioElement;
  #gameDefeatSound: HTMLAudioElement;
  #gameWinSound: HTMLAudioElement;
  #hitAppleSound: HTMLAudioElement;
  #isMusicAllowed = true;
  #isSoundAllowed = true;
  #musicVolume = 0.1;
  #snakeBodyBottomLeftSprite: HTMLImageElement;
  #snakeBodyBottomRightSprite: HTMLImageElement;
  #snakeBodyHorizontalSprite: HTMLImageElement;
  #snakeBodyTopLeftSprite: HTMLImageElement;
  #snakeBodyTopRightSprite: HTMLImageElement;
  #snakeBodyVerticalSprite: HTMLImageElement;
  #snakeCollisionSound: HTMLAudioElement;
  #snakeHeadDownSprite: HTMLImageElement;
  #snakeHeadLeftSprite: HTMLImageElement;
  #snakeHeadRightSprite: HTMLImageElement;
  #snakeHeadUpSprite: HTMLImageElement;
  #snakeMoveSound: HTMLAudioElement;
  #snakeTailDownSprite: HTMLImageElement;
  #snakeTailLeftSprite: HTMLImageElement;
  #snakeTailRightSprite: HTMLImageElement;
  #snakeTailUpSprite: HTMLImageElement;
  #soundVolume = 0.5;

  constructor() {
    super();
  }

  #resetAudioElement(element: HTMLAudioElement) {
    !element.paused && element.pause();
    element.currentTime = 0;
  }

  increaseMusicVolume() {
    this.#musicVolume += 0.1;
    if (this.#musicVolume > 1) {
      this.#musicVolume = 1;
      return;
    }
    this.#backgroundMusic.volume = this.#musicVolume;
  }

  decreaseMusicVolume() {
    this.#musicVolume -= 0.1;
    if (this.#musicVolume < 0.11) {
      this.#musicVolume = 0;
      return;
    }
    this.#backgroundMusic.volume = this.#musicVolume;
  }

  increaseSoundVolume() {
    this.#soundVolume += 0.1;
    if (this.#soundVolume > 1) {
      this.#soundVolume = 1;
      return;
    }
    this.#gameDefeatSound.volume = this.#soundVolume;
    this.#gameWinSound.volume = this.#soundVolume;
    this.#snakeMoveSound.volume = this.#soundVolume;
    this.#hitAppleSound.volume = this.#soundVolume;
    this.#snakeCollisionSound.volume = this.#soundVolume;
  }

  decreaseSoundVolume() {
    this.#soundVolume -= 0.1;
    if (this.#soundVolume < 0.11) {
      this.#soundVolume = 0;
      return;
    }
    this.#gameDefeatSound.volume = this.#soundVolume;
    this.#gameWinSound.volume = this.#soundVolume;
    this.#snakeMoveSound.volume = this.#soundVolume;
    this.#hitAppleSound.volume = this.#soundVolume;
    this.#snakeCollisionSound.volume = this.#soundVolume;
  }

  playBackgroundMusic() {
    if (this.#isMusicAllowed && !this.isVisible(modal.element)) {
      this.#backgroundMusic.loop = true;
      this.#backgroundMusic.play();
    }
  }

  stopBackgroundMusic() {
    !this.#backgroundMusic.paused && this.#backgroundMusic.pause();
  }

  playGameWinSound() {
    this.#isSoundAllowed && this.#gameWinSound.play();
  }

  playGameDefeatSound() {
    this.#isSoundAllowed && this.#gameDefeatSound.play();
  }

  playSnakeMoveSound() {
    if (this.#isSoundAllowed) {
      this.#resetAudioElement(this.#snakeMoveSound);
      this.#snakeMoveSound.play();
    }
  }

  playHitAppleSound() {
    if (this.#isSoundAllowed) {
      this.#resetAudioElement(this.#hitAppleSound);
      this.#hitAppleSound.play();
    }
  }

  playSnakeCollisionSound() {
    if (this.#isSoundAllowed) {
      this.#resetAudioElement(this.#snakeCollisionSound);
      this.#snakeCollisionSound.play();
    }
  }

  toggleBackgroundMusic() {
    this.#isMusicAllowed = !this.#isMusicAllowed;
    this.#isMusicAllowed ? this.stopBackgroundMusic() : this.playBackgroundMusic();
  }

  toggleSound() {
    this.#isSoundAllowed = !this.#isSoundAllowed;
  }

  areAllMediaElementsLoaded() {
    return (
      !!media.appleSprite &&
      !!media.backgroundMusic &&
      !!media.gameDefeatSound &&
      !!media.gameWinSound &&
      !!media.#hitAppleSound &&
      !!media.#snakeCollisionSound &&
      !!media.snakeBodyBottomLeftSprite &&
      !!media.snakeBodyBottomRightSprite &&
      !!media.snakeBodyHorizontalSprite &&
      !!media.snakeBodyTopLeftSprite &&
      !!media.snakeBodyTopRightSprite &&
      !!media.snakeBodyVerticalSprite &&
      !!media.snakeHeadDownSprite &&
      !!media.snakeHeadLeftSprite &&
      !!media.snakeHeadRightSprite &&
      !!media.snakeHeadUpSprite &&
      !!media.snakeMoveSound &&
      !!media.snakeTailDownSprite &&
      !!media.snakeTailLeftSprite &&
      !!media.snakeTailRightSprite &&
      !!media.snakeTailUpSprite
    );
  }

  get appleSprite() {
    return this.#appleSprite;
  }

  get backgroundMusic() {
    return this.#backgroundMusic;
  }

  get gameDefeatSound() {
    return this.#gameDefeatSound;
  }

  get gameWinSound() {
    return this.#gameWinSound;
  }

  get hitAppleSound() {
    return this.#hitAppleSound;
  }

  get snakeCollisionSound() {
    return this.#snakeCollisionSound;
  }

  get musicVolume() {
    return this.#musicVolume;
  }

  get snakeBodyBottomLeftSprite() {
    return this.#snakeBodyBottomLeftSprite;
  }

  get snakeBodyBottomRightSprite() {
    return this.#snakeBodyBottomRightSprite;
  }

  get snakeBodyHorizontalSprite() {
    return this.#snakeBodyHorizontalSprite;
  }

  get snakeBodyTopLeftSprite() {
    return this.#snakeBodyTopLeftSprite;
  }

  get snakeBodyTopRightSprite() {
    return this.#snakeBodyTopRightSprite;
  }

  get snakeBodyVerticalSprite() {
    return this.#snakeBodyVerticalSprite;
  }

  get snakeHeadDownSprite() {
    return this.#snakeHeadDownSprite;
  }

  get snakeHeadLeftSprite() {
    return this.#snakeHeadLeftSprite;
  }

  get snakeHeadRightSprite() {
    return this.#snakeHeadRightSprite;
  }

  get snakeHeadUpSprite() {
    return this.#snakeHeadUpSprite;
  }

  get snakeMoveSound() {
    return this.#snakeMoveSound;
  }

  get snakeTailDownSprite() {
    return this.#snakeTailDownSprite;
  }

  get snakeTailLeftSprite() {
    return this.#snakeTailLeftSprite;
  }

  get snakeTailRightSprite() {
    return this.#snakeTailRightSprite;
  }

  get snakeTailUpSprite() {
    return this.#snakeTailUpSprite;
  }

  get soundVolume() {
    return this.#soundVolume;
  }

  set appleSprite(src) {
    this.#appleSprite = src;
  }

  set backgroundMusic(src) {
    this.#backgroundMusic = src;
    this.#backgroundMusic.volume = this.#musicVolume;
  }

  set gameDefeatSound(src) {
    this.#gameDefeatSound = src;
    this.#gameDefeatSound.volume = this.#soundVolume;
  }

  set gameWinSound(src) {
    this.#gameWinSound = src;
    this.#gameWinSound.volume = this.#soundVolume;
  }

  set hitAppleSound(src) {
    this.#hitAppleSound = src;
    this.#hitAppleSound.volume = this.#soundVolume;
  }

  set snakeCollisionSound(src) {
    this.#snakeCollisionSound = src;
    this.#snakeCollisionSound.volume = this.#soundVolume;
  }

  set snakeBodyBottomLeftSprite(src) {
    this.#snakeBodyBottomLeftSprite = src;
  }

  set snakeBodyBottomRightSprite(src) {
    this.#snakeBodyBottomRightSprite = src;
  }

  set snakeBodyHorizontalSprite(src) {
    this.#snakeBodyHorizontalSprite = src;
  }

  set snakeBodyTopLeftSprite(src) {
    this.#snakeBodyTopLeftSprite = src;
  }

  set snakeBodyTopRightSprite(src) {
    this.#snakeBodyTopRightSprite = src;
  }

  set snakeBodyVerticalSprite(src) {
    this.#snakeBodyVerticalSprite = src;
  }

  set snakeHeadDownSprite(src) {
    this.#snakeHeadDownSprite = src;
  }

  set snakeHeadLeftSprite(src) {
    this.#snakeHeadLeftSprite = src;
  }

  set snakeHeadRightSprite(src) {
    this.#snakeHeadRightSprite = src;
  }

  set snakeHeadUpSprite(src) {
    this.#snakeHeadUpSprite = src;
  }

  set snakeMoveSound(src) {
    this.#snakeMoveSound = src;
    this.#snakeMoveSound.volume = this.#soundVolume;
  }

  set snakeTailDownSprite(src) {
    this.#snakeTailDownSprite = src;
  }

  set snakeTailLeftSprite(src) {
    this.#snakeTailLeftSprite = src;
  }

  set snakeTailRightSprite(src) {
    this.#snakeTailRightSprite = src;
  }

  set snakeTailUpSprite(src) {
    this.#snakeTailUpSprite = src;
  }
}

export const media = new Media();
