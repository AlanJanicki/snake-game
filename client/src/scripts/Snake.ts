import { canvas, game, media, Sprite } from './index';

import { Axis, Direction, Offset, SnakeData, Sprite as SpriteType, SPRITE_SIZE } from '../models';

export class Snake extends Sprite {
  #direction = Direction.RIGHT;

  constructor(sprite: SpriteType) {
    super(sprite);
  }

  draw() {
    super.draw();
  }

  static #isFirstValueBiggerThanSecondOne(firstValue: number, secondValue: number) {
    return firstValue - secondValue >= 0;
  }

  static generate(offset: Snake['offset'], direction: Direction) {
    const length = SnakeData.INIT_LENGTH;
    const size = SPRITE_SIZE;

    for (let i = 0; i <= length; i++) {
      const snakeElement = new Snake({
        spriteImage:
          i === 0
            ? direction === Direction.RIGHT
              ? media.snakeHeadRightSprite
              : direction === Direction.LEFT
              ? media.snakeHeadLeftSprite
              : direction === Direction.DOWN
              ? media.snakeHeadDownSprite
              : media.snakeHeadUpSprite
            : i < length
            ? direction === Direction.LEFT || direction === Direction.RIGHT
              ? media.snakeBodyHorizontalSprite
              : media.snakeBodyVerticalSprite
            : direction === Direction.RIGHT
            ? media.snakeTailLeftSprite
            : direction === Direction.LEFT
            ? media.snakeTailRightSprite
            : direction === Direction.DOWN
            ? media.snakeTailUpSprite
            : media.snakeTailDownSprite,
        width: size,
        height: size,
        offset: {
          x:
            direction === Direction.RIGHT
              ? offset.x + 1 * size * length - size * i
              : direction === Direction.LEFT
              ? offset.x - size * (length + 1 - i)
              : offset.x,
          y:
            direction === Direction.DOWN
              ? offset.y + 1 * size * length - size * i
              : direction === Direction.UP
              ? offset.y - size * (length + 1 - i)
              : offset.y,
        },
      });
      game.snake.push(snakeElement);
    }
  }

  static reset(offset: Snake['offset'], newDirection: Direction, init?: boolean) {
    const { snake } = game;
    if (!init) {
      media.playSnakeCollisionSound();
      canvas.drawRedScreen();
    }
    snake.splice(0);
    this.generate(offset, newDirection);
    snake[0].#direction = newDirection;
  }

  static grow() {
    const { snake } = game;
    const size = SPRITE_SIZE;

    const getNewOffset = (axis: Axis) => {
      const lastElementOffset = snake[snake.length - 1].offset[axis];
      const penultimateElementOffset = snake[snake.length - 2].offset[axis];

      if (lastElementOffset === penultimateElementOffset) {
        return lastElementOffset;
      }

      return this.#isFirstValueBiggerThanSecondOne(lastElementOffset, penultimateElementOffset)
        ? lastElementOffset + size
        : lastElementOffset - size;
    };

    const newSnakeEl = new Snake({
      spriteImage: snake[snake.length - 1].spriteImage,
      width: size,
      height: size,
      offset: {
        x: getNewOffset(Axis.X),
        y: getNewOffset(Axis.Y),
      },
    });

    media.playHitAppleSound();
    snake.push(newSnakeEl);
    this.#handleSnakeBodyChange(snake[0].#direction);
  }

  static #handleSnakeBodyChange(direction: Direction) {
    const { snake } = game;
    const {
      snakeBodyBottomRightSprite,
      snakeBodyBottomLeftSprite,
      snakeBodyHorizontalSprite,
      snakeBodyTopLeftSprite,
      snakeBodyTopRightSprite,
      snakeBodyVerticalSprite,
      snakeHeadDownSprite,
      snakeHeadLeftSprite,
      snakeHeadRightSprite,
      snakeHeadUpSprite,
      snakeTailDownSprite,
      snakeTailLeftSprite,
      snakeTailRightSprite,
      snakeTailUpSprite,
    } = media;

    for (let i = snake.length - 1; i >= 0; i--) {
      if (snake[i - 1]) {
        if (
          snake[i].offset.y !== snake[i - 1].offset.y &&
          snake[i].offset.x === snake[i - 1].offset.x
        ) {
          if (snake[i + 1]) {
            if (snake[i].offset.x !== snake[i + 1].offset.x) {
              if (
                this.#isFirstValueBiggerThanSecondOne(snake[i].offset.x, snake[i + 1].offset.x) &&
                !this.#isFirstValueBiggerThanSecondOne(snake[i].offset.y, snake[i - 1].offset.y)
              ) {
                snake[i].spriteImage = snakeBodyBottomLeftSprite;
              } else if (
                this.#isFirstValueBiggerThanSecondOne(snake[i].offset.x, snake[i + 1].offset.x) &&
                this.#isFirstValueBiggerThanSecondOne(snake[i].offset.y, snake[i - 1].offset.y)
              ) {
                snake[i].spriteImage = snakeBodyTopLeftSprite;
              } else if (
                !this.#isFirstValueBiggerThanSecondOne(snake[i].offset.x, snake[i + 1].offset.x) &&
                !this.#isFirstValueBiggerThanSecondOne(snake[i].offset.y, snake[i - 1].offset.y)
              ) {
                snake[i].spriteImage = snakeBodyBottomRightSprite;
              } else if (
                !this.#isFirstValueBiggerThanSecondOne(snake[i].offset.x, snake[i + 1].offset.x) &&
                this.#isFirstValueBiggerThanSecondOne(snake[i].offset.y, snake[i - 1].offset.y)
              ) {
                snake[i].spriteImage = snakeBodyTopRightSprite;
              }
            } else {
              snake[i].spriteImage = snakeBodyVerticalSprite;
            }
          } else {
            snake[i].spriteImage = !this.#isFirstValueBiggerThanSecondOne(
              snake[i].offset.y,
              snake[i - 1].offset.y
            )
              ? snakeTailUpSprite
              : snakeTailDownSprite;
          }
        } else if (
          snake[i].offset.x !== snake[i - 1].offset.x &&
          snake[i].offset.y === snake[i - 1].offset.y
        ) {
          if (snake[i + 1]) {
            if (snake[i].offset.y !== snake[i + 1].offset.y) {
              if (
                this.#isFirstValueBiggerThanSecondOne(snake[i].offset.y, snake[i + 1].offset.y) &&
                !this.#isFirstValueBiggerThanSecondOne(snake[i].offset.x, snake[i - 1].offset.x)
              ) {
                snake[i].spriteImage = snakeBodyTopRightSprite;
              } else if (
                this.#isFirstValueBiggerThanSecondOne(snake[i].offset.y, snake[i + 1].offset.y) &&
                this.#isFirstValueBiggerThanSecondOne(snake[i].offset.x, snake[i - 1].offset.x)
              ) {
                snake[i].spriteImage = snakeBodyTopLeftSprite;
              } else if (
                !this.#isFirstValueBiggerThanSecondOne(snake[i].offset.y, snake[i + 1].offset.y) &&
                !this.#isFirstValueBiggerThanSecondOne(snake[i].offset.x, snake[i - 1].offset.x)
              ) {
                snake[i].spriteImage = snakeBodyBottomRightSprite;
              } else if (
                !this.#isFirstValueBiggerThanSecondOne(snake[i].offset.y, snake[i + 1].offset.y) &&
                this.#isFirstValueBiggerThanSecondOne(snake[i].offset.x, snake[i - 1].offset.x)
              ) {
                snake[i].spriteImage = snakeBodyBottomLeftSprite;
              }
            } else {
              snake[i].spriteImage = snakeBodyHorizontalSprite;
            }
          } else {
            snake[i].spriteImage = !this.#isFirstValueBiggerThanSecondOne(
              snake[i].offset.x,
              snake[i - 1].offset.x
            )
              ? snakeTailLeftSprite
              : snakeTailRightSprite;
          }
        }
      } else {
        snake[i].spriteImage =
          direction === Direction.UP
            ? snakeHeadUpSprite
            : direction === Direction.DOWN
            ? snakeHeadDownSprite
            : direction === Direction.RIGHT
            ? snakeHeadRightSprite
            : snakeHeadLeftSprite;
      }
    }
  }

  static #handleSnakeMove(direction: Direction) {
    const { snake } = game;

    for (let i = snake.length - 1; i >= 0; i--) {
      if (snake[i - 1]) {
        snake[i].offset = { ...snake[i - 1].offset };
      } else {
        const snakeOffset = snake[i].offset;
        switch (direction) {
          case Direction.UP:
            snakeOffset.y = snakeOffset.y - SPRITE_SIZE;
            break;
          case Direction.DOWN:
            snakeOffset.y = snakeOffset.y + SPRITE_SIZE;
            break;
          case Direction.RIGHT:
            snakeOffset.x = snakeOffset.x + SPRITE_SIZE;
            break;
          case Direction.LEFT:
            snakeOffset.x = snakeOffset.x - SPRITE_SIZE;
            break;
          default:
            break;
        }
      }
    }
    this.#handleSnakeBodyChange(direction);
  }

  static #isMoveValid(direction: Direction) {
    const { snake } = game;

    const isValid = (offset: Offset, axis: Axis) => {
      const snakeHeadOffset = snake[0].offset[axis];
      const snakeSecondElOffset = snake[1].offset[axis];
      const isOffsetDifferenceValid =
        offset === Offset.POSITIVE
          ? this.#isFirstValueBiggerThanSecondOne(snakeHeadOffset, snakeSecondElOffset)
          : !this.#isFirstValueBiggerThanSecondOne(snakeHeadOffset, snakeSecondElOffset);

      const isOffsetTheSame = snakeHeadOffset === snakeSecondElOffset;

      return isOffsetDifferenceValid || isOffsetTheSame;
    };

    switch (direction) {
      case Direction.DOWN:
        return isValid(Offset.POSITIVE, Axis.Y);
      case Direction.UP:
        return isValid(Offset.NEGATIVE, Axis.Y);
      case Direction.RIGHT:
        return isValid(Offset.POSITIVE, Axis.X);
      case Direction.LEFT:
        return isValid(Offset.NEGATIVE, Axis.X);
      default:
        return true;
    }
  }

  static move(newDirection: Direction) {
    const { snake } = game;

    if (this.#isMoveValid(newDirection)) {
      snake[0].#direction = newDirection;
    }
    this.#handleSnakeMove(snake[0].#direction);
  }
}
