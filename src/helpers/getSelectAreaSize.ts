import { Сoordinates } from "../data";

export const getSelectAreaSize = (start: Сoordinates, end: Сoordinates) => {
  const width = Math.abs(start.x - end.x);
  const height = Math.abs(start.y - end.y);
  const x = (start.x + end.x) / 2;
  const y = (start.y + end.y) / 2;

  return { width, height, x, y };
};
