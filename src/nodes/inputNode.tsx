import React, { ChangeEvent, useState } from "react";
import BaseNode from "./baseNode";
import { HandleType, Position } from "reactflow";
import { useStore } from "./../store";

export const InputNode = ({ id, data }: { id: string; data: any }) => {
  const { nodes, updateNodeField } = useStore();

  // Access the current node data directly from Zustand state
  const currentNode = nodes.find((node) => node.id === id);
  const currName = currentNode?.data.inputName || "";
  const inputType = currentNode?.data.inputType || "Text";

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNodeField(id, "inputName", e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateNodeField(id, "inputType", e.target.value);
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
