import { game, media, Snake, Sprite } from './index';
import { Axis, CanvasCommon, SPRITE_SIZE } from '../models';

const generateRandomOffset = (): Snake['offset'] => {
  const { snake } = game;

  const getNewPosition = (range: number) =>
    Math.round((Math.random() * (range - SPRITE_SIZE * 4) + SPRITE_SIZE * 2) / SPRITE_SIZE) *
    SPRITE_SIZE;

  const isPositionValid = (snakeEl: Snake, axis: Axis) =>
    Math.abs(snakeEl.offset[axis] - newOffset[axis]) > SPRITE_SIZE;

  const validatePosition = () =>
    snake.every(
      (snakeEl) => isPositionValid(snakeEl, Axis.X) || isPositionValid(snakeEl, Axis.Y)
    ) &&
    newOffset.x % 24 === 0 &&
    newOffset.y % 24 === 0;

  const newOffset = {
    x: getNewPosition(CanvasCommon.WIDTH),
    y: getNewPosition(CanvasCommon.HEIGHT),
  };

  return validatePosition() ? newOffset : generateRandomOffset();
};

export class Apple extends Sprite {
  constructor() {
    super({
      spriteImage: media.appleSprite,
      width: SPRITE_SIZE,
      height: SPRITE_SIZE,
      offset: generateRandomOffset(),
    });
  }

  draw() {
    super.draw();
  }

  move() {
    game.apple.offset = generateRandomOffset();
  }
}
