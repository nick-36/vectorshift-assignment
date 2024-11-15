import React, { useState, ChangeEvent } from "react";
import { Position, HandleProps, HandleType } from "reactflow";
import BaseNode from "./baseNode"; // Import the BaseNode component

// Define props for OutputNode component
interface OutputNodeProps {
  id: string;
  data: {
    outputName?: string;
    outputType?: string;
  };
}

export const OutputNode: React.FC<OutputNodeProps> = ({ id, data }) => {
  // Define state for the output node's specific fields
  const [currName, setCurrName] = useState<string>(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState<string>(
    data.outputType || "Text"
  );

  // Handlers for input changes
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOutputType(e.target.value);
  };

  // Define the content of the node with specific input fields
  const content = (
    <div className="flex flex-col gap-2">
      <label>
        Name:
        <input
          className="ml-1 p-1"
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Type:
        <select className="ml-1" value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </div>
  );

  // Define the handles configuration
  const handles: HandleProps[] = [
    { type: "target" as HandleType, position: Position.Left, id: "value" },
  ];

  // Render the BaseNode with specific title, handles, and content
  return (
    <BaseNode id={id} title="Output" handles={handles} content={content} />
  );
};

export default OutputNode;
