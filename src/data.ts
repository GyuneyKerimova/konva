export enum Tool {
  POINTER = "POINTER",
  GRAB = "GRAB",
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE",
  TEXT = "TEXT",
  PENCIL = "PENCIL",
  LINE = "LINE",
}

export enum ShapeType {
  RECTANGLE = "RECTANGLE",
  CIRCLE = "CIRCLE",
  TEXT = "TEXT",
  PENCIL = "PENCIL",
}

export interface ShapeStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
  cornerRadius: number;
}

export interface Сoordinates {
  x: number;
  y: number;
}
export interface Size {
  width: number;
  height: number;
}

export interface CommonStyle {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface CommonShape extends Сoordinates {
  id: string;
  selected?: boolean;
  type: ShapeType;
}

export interface Rectangle extends CommonShape, Size, CommonStyle {
  type: ShapeType.RECTANGLE;
}

export interface Circle extends CommonShape, Size, CommonStyle {
  type: ShapeType.CIRCLE;
  radiusX: number;
  radiusY: number;
}


export interface Pencil extends CommonShape, CommonStyle {
  type: ShapeType.PENCIL;
  points: number[];
}

export type Shape = Rectangle | Circle | Pencil;
