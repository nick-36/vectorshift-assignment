import React, { ChangeEvent, useState } from "react";
import BaseNode from "./baseNode";
import { useInputNode } from "../hooks/useInputNode";
import { HandleType, Position } from "reactflow";
import { useStore } from "./../store";

export const InputNode = ({ id, data }: { id: string; data: any }) => {
  const [currName, setCurrName] = useState(data?.inputName);
  const [inputType, setInputType] = useState(data.inputType || "Text");
  const { updateNodeField } = useStore();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField(id, "inputName", value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setInputType(value);
    updateNodeField(id, "inputType", value);
  };

  const content = (
    <div className="flex flex-col space-y-4">
      <label className="flex flex-col">
        <span className="text-sm text-gray-500">Name</span>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="recipients"
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm text-gray-500">Type</span>
        <select
          value={inputType}
          onChange={handleTypeChange}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </div>
  );

  const handles = [
    {
      type: "source" as HandleType,
      position: Position.Right,
      id: "value",
      style: { stroke: "red" },
    },
  ];

  return <BaseNode id={id} title="Input" handles={handles} content={content} />;
};
