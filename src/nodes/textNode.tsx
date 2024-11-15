import React, { useEffect, useRef, ChangeEvent } from "react";
import { useState } from "react";
import {
  Position,
  useUpdateNodeInternals,
  HandleProps,
  HandleType,
} from "reactflow";
import BaseNode from "./baseNode";

// Define the props interface for the TextNode component
interface TextNodeProps {
  id: string;
  data: {
    text?: string;
  };
}

// Define a type for each variable's handle configuration
interface VariableHandle extends HandleProps {
  id: string;
  key: string;
  style?: React.CSSProperties;
}

// Define the TextNode component as a functional component with typed props
function TextNode({ id, data }: TextNodeProps): JSX.Element {
  const updateNodeInternals = useUpdateNodeInternals();
  const [currText, setCurrText] = useState<string>(data?.text || "{{input}}");
  const [variables, setVariables] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Define the handles configuration, adding handles for each detected variable
  const handles: VariableHandle[] = [
    { type: "source", position: Position.Right, id: "output", key: "output" },
    ...variables.map((variable, index) => ({
      type: "target" as HandleType,
      position: Position.Left,
      id: `input-${variable}`,
      key: `handle-${index}`,
      style: { top: `${index * 20 + 80}px` }, // Adjust position of each handle on the left
    })),
  ];

  // Adjust the width and height of the input field based on its content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.width = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      inputRef.current.style.width = `${inputRef.current.scrollWidth}px`;
    }
  }, [currText]);

  // Detect variables in the text input
  useEffect(() => {
    const variableMatches = Array.from(
      currText.matchAll(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g)
    );
    const detectedVariables = variableMatches.map((match) => match[1]);
    setVariables(detectedVariables);
  }, [currText, id, updateNodeInternals]);

  // Update node internals whenever variables change
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  // Handle text change and update current text
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrText(e.target.value);
  };

  // Define the content specific to TextNode
  const content = (
    <label className="flex flex-col space-y-2">
      <textarea
        ref={inputRef}
        value={currText}
        onChange={handleTextChange}
        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        placeholder="Enter text with variables like {{input}}"
      />
    </label>
  );

  return <BaseNode id={id} title="Text" handles={handles} content={content} />;
}

export default TextNode;
