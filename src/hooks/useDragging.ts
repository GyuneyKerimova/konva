import { KonvaEventObject } from "konva/lib/Node";
import { useState, useCallback } from "react";

export const useDragging = () => {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [stageScale, setStageScale] = useState<number>(1);

  const onWheel = useCallback(
    (e: KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();
      const scaleBy = 1.05; 
      const stage = e.target.getStage();
      if (!stage) return;
      const oldScale = stage.scaleX();

      const pointerPosition = stage?.getPointerPosition();
      if (!pointerPosition) return;

      const mousePointTo = {
        x: (pointerPosition.x - stage.x()) / oldScale,
        y: (pointerPosition.y - stage.y()) / oldScale,
      };

      const newScale =
        e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

      setStageScale(newScale);
      setStagePos({
        x: pointerPosition.x - mousePointTo.x * newScale,
        y: pointerPosition.y - mousePointTo.y * newScale,
      });
    },
    []
  );

  return { stagePos, stageScale, onWheel };
};
