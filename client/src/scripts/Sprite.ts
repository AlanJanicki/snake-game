import { canvas } from './index';
import { Sprite as SpriteType } from '../models';

export class Sprite {
  #spriteImage: CanvasImageSource;
  #width: number;
  #height: number;
  #offset: {
    x: number;
    y: number;
  };

  constructor(sprite: SpriteType) {
    const { spriteImage, width, height, offset } = sprite;
    this.#spriteImage = spriteImage;
    this.#width = width;
    this.#height = height;
    this.#offset = offset;
  }

  draw() {
    canvas.context?.drawImage(
      this.#spriteImage,
      this.#offset.x,
      this.#offset.y,
      this.#width,
      this.#height
    );
  }

  get offset() {
    return this.#offset;
  }

  set offset(offset: SpriteType['offset']) {
    this.#offset = offset;
  }

  get spriteImage() {
    return this.#spriteImage;
  }

  set spriteImage(spriteImage: CanvasImageSource) {
    this.#spriteImage = spriteImage;
  }
}
