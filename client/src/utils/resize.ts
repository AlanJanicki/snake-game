import { CanvasCommon, CssProperty } from '../models';

export const resizeGameWindow = () => {
  let scale: number;
  scale = Math.min(
    window.innerWidth / CanvasCommon.WIDTH,
    window.innerHeight / CanvasCommon.HEIGHT
  );
  if (scale > 2) {
    scale = 2;
  }
  document.documentElement.style.setProperty(CssProperty.SCALE_VALUE, `${scale}`);
};
