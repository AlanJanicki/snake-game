export enum Axis {
  X = 'x',
  Y = 'y',
}

export enum CanvasCommon {
  BLUE_COLOR = '#001e88',
  FONT = '12px Roboto Mono',
  HEIGHT = 480,
  RED_COLOR = 'red',
  WIDTH = 624,
}

export enum TopBarOffset {
  Y = 15,
}

export type TopBarInfo = {
  color: string;
  offsetX: number;
  text: string;
};
