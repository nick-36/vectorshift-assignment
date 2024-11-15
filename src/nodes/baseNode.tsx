import React, { ReactNode, useEffect, useState } from "react";
import { Handle, Position, HandleProps, HandleType } from "reactflow";

// Define the types for the component props
interface BaseNodeProps {
  id: string;
  title: string;
  handles: {
    type: HandleType;
    position: Position;
    id: string;
    style?: React.CSSProperties;
  }[];
  content: ReactNode;
}

const BaseNode: React.FC<BaseNodeProps> = ({ id, title, handles, content }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-sky-500">
      <div className="mb-2">
        <span className="text-gray-500 font-semibold text-md">{title}</span>
      </div>
      <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
        {content}
      </div>
      {handles.map((handle, index) => {
        return (
          <Handle
            key={index}
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.id}`}
            style={handle.style}
            className={
              "w-3 h-3 bg-white border-solid border-2 border-sky-500 rounded-full hover:bg-sky-500"
            }
          />
        );
      })}
    </div>
  );
};

export default BaseNode;
