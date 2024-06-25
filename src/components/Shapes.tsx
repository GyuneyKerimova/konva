import { FC } from "react";
import { Shape, ShapeType, Tool } from "../data";
import { Ellipse, Line, Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";

interface ShapesProps {
  shapes: Shape[];
  tool: Tool;
  onDragEnd: (e: KonvaEventObject<MouseEvent>) => void;
}

const Shapes: FC<ShapesProps> = ({ shapes, onDragEnd, tool }) => {
  const common = {
    onDragEnd,
    draggable: tool === Tool.POINTER,
    onMouseOver: (e: KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (stage) {
        stage.container().style.cursor = "grab";
      }
    },
    onMouseLeave: (e: KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage();
      if (stage) {
        stage.container().style.cursor =
          tool === Tool.GRAB ? "crosshair" : "default";
      }
    },
  };

  return (
    <>
      {shapes.map((shape) => {
        const activeProps = shape.selected ? { shadowBlur: 1 } : {};
        switch (shape.type) {
          case ShapeType.CIRCLE:
            return (
              <Ellipse
                key={shape.id}
                {...shape}
                {...common}
                {...activeProps}
                width={shape.radiusX * 2}
                height={shape.radiusY * 2}
              />
            );
          case ShapeType.RECTANGLE:
            return (
              <Rect key={shape.id} {...shape} {...common} {...activeProps} />
            );
          case ShapeType.PENCIL:
            return (
              <Line
                key={shape.id}
                {...shape}
                {...common}
                {...activeProps}
                x={0}
                y={0}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default Shapes;
