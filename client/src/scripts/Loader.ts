import { Common, media } from './index';
import {
  Asset,
  CssClass,
  Error,
  Event as EventEnum,
  Information,
  JsId,
  UserData,
  Visibility,
} from '../models';

import appleSprite from '../assets/images/apple.png';
import backgroundMusic from '../assets/sounds/music-background.mp3';
import gameDefeatSound from '../assets/sounds/game-defeat.mp3';
import gameWinSound from '../assets/sounds/game-win.mp3';
import hitAppleSound from '../assets/sounds/hit-apple.wav';
import snakeBodyBottomLeftSprite from '../assets/images/snake/body_bottomleft.png';
import snakeBodyBottomRightSprite from '../assets/images/snake/body_bottomright.png';
import snakeBodyHorizontalSprite from '../assets/images/snake/body_horizontal.png';
import snakeBodyTopLeftSprite from '../assets/images/snake/body_topleft.png';
import snakeBodyTopRightSprite from '../assets/images/snake/body_topright.png';
import snakeBodyVerticalSprite from '../assets/images/snake/body_vertical.png';
import snakeCollisionSound from '../assets/sounds/hit-barrier.wav';
import snakeHeadDownSprite from '../assets/images/snake/head_down.png';
import snakeHeadLeftSprite from '../assets/images/snake/head_left.png';
import snakeHeadRightSprite from '../assets/images/snake/head_right.png';
import snakeHeadUpSprite from '../assets/images/snake/head_up.png';
import snakeMoveSound from '../assets/sounds/snake-move.mp3';
import snakeTailDownSprite from '../assets/images/snake/tail_down.png';
import snakeTailLeftSprite from '../assets/images/snake/tail_left.png';
import snakeTailRightSprite from '../assets/images/snake/tail_right.png';
import snakeTailUpSprite from '../assets/images/snake/tail_up.png';

const SPRITES = [
  { name: 'appleSprite', sprite: appleSprite },
  { name: 'snakeBodyBottomLeftSprite', sprite: snakeBodyBottomLeftSprite },
  { name: 'snakeBodyBottomRightSprite', sprite: snakeBodyBottomRightSprite },
  { name: 'snakeBodyHorizontalSprite', sprite: snakeBodyHorizontalSprite },
  { name: 'snakeBodyTopLeftSprite', sprite: snakeBodyTopLeftSprite },
  { name: 'snakeBodyTopRightSprite', sprite: snakeBodyTopRightSprite },
  { name: 'snakeBodyVerticalSprite', sprite: snakeBodyVerticalSprite },
  { name: 'snakeHeadDownSprite', sprite: snakeHeadDownSprite },
  { name: 'snakeHeadLeftSprite', sprite: snakeHeadLeftSprite },
  { name: 'snakeHeadRightSprite', sprite: snakeHeadRightSprite },
  { name: 'snakeHeadUpSprite', sprite: snakeHeadUpSprite },
  { name: 'snakeTailDownSprite', sprite: snakeTailDownSprite },
  { name: 'snakeTailLeftSprite', sprite: snakeTailLeftSprite },
  { name: 'snakeTailRightSprite', sprite: snakeTailRightSprite },
  { name: 'snakeTailUpSprite', sprite: snakeTailUpSprite },
];

const SOUNDS = [
  {
    name: 'backgroundMusic',
    sound: backgroundMusic,
  },
  {
    name: 'gameDefeatSound',
    sound: gameDefeatSound,
  },
  {
    name: 'gameWinSound',
    sound: gameWinSound,
  },
  {
    name: 'hitAppleSound',
    sound: hitAppleSound,
  },
  {
    name: 'snakeCollisionSound',
    sound: snakeCollisionSound,
  },
  {
    name: 'snakeMoveSound',
    sound: snakeMoveSound,
  },
];

class Loader extends Common {
  #isLoadingComplete: boolean;
  #loadedElements: HTMLElement;
  #loadedElementsAmount: number;
  #loadingHeader: HTMLElement;
  #loadingInfoElements: HTMLElement;
  #loadingInfoUser: HTMLElement;
  #loadingSpinner: HTMLElement;
  #totalElements: HTMLElement;
  #totalElementsAmount: number;

  constructor() {
    super(JsId.LOADING);
    this.#bindToLoaderElements();
    this.#resetLoaderStatus();
  }

  #bindToLoaderElements() {
    this.#loadedElements = this.bindToElement(JsId.LOADED_ELEMENTS);
    this.#loadingHeader = this.bindToElement(JsId.LOADING_HEADER);
    this.#loadingInfoElements = this.bindToElement(JsId.LOADING_INFO_ELEMENTS);
    this.#loadingInfoUser = this.bindToElement(JsId.LOADING_INFO_USER);
    this.#loadingSpinner = this.bindToElement(JsId.LOADING_SPINNER);
    this.#totalElements = this.bindToElement(JsId.TOTAL_ELEMENTS);
  }

  #loadMedia(src: string, type: Asset) {
    !this.isVisible(this.element) && this.changeVisibility([[this.element, Visibility.SHOW]]);
    this.#isLoadingComplete = false;
    this.#totalElementsAmount++;
    this.#totalElements.innerText = `${this.#totalElementsAmount}`;

    if (type === Asset.IMAGE) {
      const img = new Image();
      img.src = src;
      img.addEventListener('load', (e) => this.#handleElementLoaded(e));
      return img;
    }
    const audio = new Audio();
    audio.src = src;
    audio.load();
    audio.addEventListener('canplaythrough', (e) => this.#handleElementLoaded(e));
    return audio;
  }

  #handleElementLoaded(e: Event) {
    if (!e.target) {
      return;
    }

    e.target.removeEventListener(e.type, this.#handleElementLoaded);
    this.#loadedElementsAmount++;
    this.#loadedElements.innerText = `${this.#loadedElementsAmount}`;

    if (this.#loadedElementsAmount === this.#totalElementsAmount) {
      this.#resetLoaderStatus();
      window.dispatchEvent(new CustomEvent(EventEnum.ELEMENTS_LOADED));
    }
  }

  handleUserLoadingStatus(status: UserData) {
    this.changeVisibility([[this.#loadingInfoElements, Visibility.HIDE]]);
    if (status === UserData.LOADING) {
      this.#loadingInfoUser.innerText = Information.FETCHING_USER_DATA;
      return;
    }
    this.changeVisibility([[this.#loadingHeader, Visibility.HIDE]]);
    this.#loadingInfoUser.classList.add(CssClass.FORM_ERROR);
    this.#loadingInfoUser.innerText = Error.FETCHING_USER_DATA_FAIL;
  }

  #resetLoaderStatus() {
    this.#isLoadingComplete = true;
    this.#loadedElementsAmount = 0;
    this.#totalElementsAmount = 0;
  }

  loadGameElements() {
    if (media.areAllMediaElementsLoaded()) {
      window.dispatchEvent(new CustomEvent(EventEnum.ELEMENTS_LOADED));
      return;
    }

    const getAsset = (asset: Asset, index: number) =>
      asset === Asset.IMAGE ? SPRITES[index].sprite : SOUNDS[index].sound;

    const getKey = (asset: Asset, index: number) =>
      asset === Asset.IMAGE
        ? (SPRITES[index].name as keyof typeof media)
        : (SOUNDS[index].name as keyof typeof media);

    const loadElements = (asset: Asset) => {
      const loadingImages = asset === Asset.IMAGE;

      for (let i = 0; loadingImages ? i < SPRITES.length : i < SOUNDS.length; i++) {
        const key = getKey(loadingImages ? Asset.IMAGE : Asset.SOUND, i);
        if (!media[key] && key !== 'soundVolume' && key !== 'musicVolume') {
          media[key] = this.#loadMedia(
            getAsset(loadingImages ? Asset.IMAGE : Asset.SOUND, i),
            loadingImages ? Asset.IMAGE : Asset.SOUND
          ) as any;
        }
      }
    };

    loadElements(Asset.IMAGE);
    loadElements(Asset.SOUND);
  }
}

export const loader = new Loader();
