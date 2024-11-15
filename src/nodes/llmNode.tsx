import BaseNode from "./baseNode";
import { HandleType, Position } from "reactflow";

export const LLMNode = ({ id }: { id: string }) => {
  const content = <span>This is a LLM.</span>;

  const handles = [
    {
      type: "target" as HandleType,
      position: Position.Left,
      id: "system",
      top: 33,
    },
    {
      type: "target" as HandleType,
      position: Position.Left,
      id: "prompt",
      top: 66,
      label: "styled label",
      labelStyle: { fill: "red", fontWeight: 700 },
      arrowHeadType: "arrow",
    },
    {
      type: "source" as HandleType,
      position: Position.Right,
      id: "xyz",
      animated: true,
      label: "animated styled edge",
    },
  ];

  return <BaseNode id={id} title="LLM" handles={handles} content={content} />;
};
