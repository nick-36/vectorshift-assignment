import { nodeConfigs } from "./../nodes/nodeConfigs";
import { useEffect, useState } from "react";
import { HandleProps } from "reactflow";

const useDynamicHandles = (type: string, text: string) => {
  const [dynamicHandles, setDynamicHandles] = useState<HandleProps[]>([]);

  useEffect(() => {
    const config = nodeConfigs[type];
    if (config?.customLogic) {
      const handles = config.customLogic(text);
      setDynamicHandles(handles as any);
    }
  }, [text, type]);

  return dynamicHandles;
};

export default useDynamicHandles;
