import { CanvasCommon } from '../models';

export enum Direction {
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
}

export enum Offset {
  NEGATIVE = 'NEGATIVE',
  POSITIVE = 'POSITIVE',
}

export enum SnakeData {
  INIT_LENGTH = 3,
  INIT_OFFSET_X = 0,
  INIT_OFFSET_Y = CanvasCommon.HEIGHT / 2,
  INIT_SPEED = 450,
}
