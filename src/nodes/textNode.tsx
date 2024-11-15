import React, { useEffect, useRef, ChangeEvent } from "react";
import {
  Position,
  useUpdateNodeInternals,
  HandleProps,
  HandleType,
} from "reactflow";
import BaseNode from "./baseNode";
import { useStore } from "../store"; // Import the Zustand store

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
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Access Zustand store functions and data
  const { nodes, updateNodeField } = useStore();
  const nodeData = nodes.find((node) => node.id === id)?.data || {};
  const currText = nodeData.text || "{{input}}";
  const variables = nodeData.variables || [];
  // Detect variables in the text input and calculate positions
  useEffect(() => {
    const variableMatches = Array.from(
      currText.matchAll(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g)
    );

    const detectedVariables = variableMatches.map((match: any, index) => {
      const lineIndex =
        currText.substring(0, match.index).split("\n").length - 1;
      return {
        name: match[1],
        line: lineIndex,
        top: lineIndex * 24 + 80, // Adjust line height and padding as needed
      };
    });

    updateNodeField(id, "variables", detectedVariables); // Update variables in the store
  }, [currText, id, updateNodeField]);

  // Adjust handles dynamically based on variable positions
  const handles: VariableHandle[] = [
    { type: "source", position: Position.Right, id: "output", key: "output" },
    ...variables.map((variable: any, index: number) => ({
      type: "target" as HandleType,
      position: Position.Left,
      id: `input-${variable.name}`,
      key: `handle-${index}`,
      style: { top: `${variable.top}px` }, // Set the top position dynamically
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

  // Update node internals whenever variables change
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  // Handle text change and update store
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateNodeField(id, "text", e.target.value);
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
