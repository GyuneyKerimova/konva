import { useState } from "react";
import { Tool } from "../data";

export const useTool = () => {
  const [tool, setTool] = useState<Tool>(Tool.POINTER);

  return { tool, setTool: setTool as (tool: Tool) => void };
};
