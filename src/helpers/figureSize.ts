import { Сoordinates, Size } from "../data";

export const figureSize = {
  getCircleSize: ({ height, width }: Size, { x, y }: Сoordinates) => ({
    radiusX: width / 2,
    radiusY: height / 2,
    x,
    y,
  }),
  getRectSize: ({ height, width }: Size, { x, y }: Сoordinates) => ({
    width,
    height,
    x: x - width / 2,
    y: y - height / 2,
  }),
};
