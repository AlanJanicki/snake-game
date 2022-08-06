export const SPRITE_SIZE = 24;

export type Sprite = {
  spriteImage: CanvasImageSource;
  width: number;
  height: number;
  offset: {
    x: number;
    y: number;
  };
};
