import { Layer, Rect, Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import Toolbar from "./components/Toolbar";
import { useEffect, useState } from "react";
import { Shape, Tool } from "./data";
import { useDragging } from "./hooks/useDragging";
import Shapes from "./components/Shapes";
import { useDrawing } from "./hooks/useDrawing";
import { useTool } from "./hooks/useTool";

function App() {
  const { tool, setTool } = useTool();
  const [shapes, setShapes] = useState<Shape[]>([]);
  const defaultStyle = {
    stroke: "black",
    strokeWidth: 2,
    cornerRadius: 2,
    fill: "transparent",
  };

  const { stageScale, stagePos, ...draggingProps } = useDragging();


  const onSelectShape = (shapeId: string) =>
    setShapes((p) =>
      p.map((shape) => ({ ...shape, selected: shape.id === shapeId }))
    );

  const unselectShapes = () =>
    setShapes((p) => p.map((shape) => ({ ...shape, selected: false })));

  const handleAppendShape = (shape: Shape) =>
    setShapes((p) => [
      ...p.map((x) => ({ ...x, selected: false })),
      { ...shape, selected: true },
    ]);

  const { selectedArea, previewLayerRef, ...selectHandlers } = useDrawing({
    tool,
    style: defaultStyle,
    onAppendShape: handleAppendShape,
    selectShape: onSelectShape,
    unselectShapes,
  });

  useEffect(unselectShapes, [tool]);

  const handleDragShape = (e: KonvaEventObject<MouseEvent>) => {
    if (!("id" in e.target.attrs)) return;

    const shapeId = e.target.attrs?.id as string;

    setShapes((p) =>
      p.map((shape) =>
        shape.id === shapeId
          ? { ...shape, x: e.target.x(), y: e.target.y() }
          : shape
      )
    );
  };

  return (
    <main className="w-full relative">
      <Toolbar activeTool={tool} onChange={(tool: Tool) => setTool(tool)} />

      <Stage
        draggable={tool === Tool.GRAB}
        {...draggingProps}
        {...stagePos}
        {...selectHandlers}
        scale={{ x: stageScale, y: stageScale }}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          <Shapes tool={tool} shapes={shapes} onDragEnd={handleDragShape} />
        </Layer>
        <Layer>
          <Rect {...selectedArea} border="#dedede" />
        </Layer>
        <Layer ref={previewLayerRef}></Layer>
      </Stage>
    </main>
  );
}

export default App;
