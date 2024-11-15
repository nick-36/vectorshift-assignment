import { useStore } from "./../store";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Handle, Position, HandleType, Connection } from "reactflow";

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
  const [connectedHandles, setConnectedHandles] = useState<Set<string>>(
    new Set()
  );
  const { edges, onConnect, onEdgesChange } = useStore(); // Access edges and onConnect from Zustand store

  // Function to update the connected handles set based on current edges
  const updateConnectedHandles = useCallback(() => {
    const connectedIds = new Set(
      edges
        .filter((edge) => edge.source === id || edge.target === id)
        .map((edge) =>
          edge.source === id ? edge.sourceHandle : edge.targetHandle
        )
        .filter(
          (handleId): handleId is string =>
            handleId !== null && handleId !== undefined
        )
    );
    setConnectedHandles(connectedIds);
  }, [edges, id]);

  // Update connected handles initially and whenever edges change
  useEffect(() => {
    updateConnectedHandles();
  }, [edges, updateConnectedHandles]);

  // Call onConnect directly when needed
  const handleConnect = (connection: Connection) => {
    onConnect(connection); // Pass the actual connection object
    const handleId =
      connection.source === id
        ? connection.sourceHandle
        : connection.targetHandle;
    if (handleId) {
      setConnectedHandles((prev) => new Set(prev).add(handleId));
    }
  };

  return (
    <div className="p-[2px] rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 transition-colors duration-300">
      {/* Inner container for white background and rounded corners */}
      <div className="p-4 bg-white shadow-lg rounded-md">
        <div className="mb-2">
          <span className="text-gray-500 font-semibold text-md">{title}</span>
        </div>
        <div className="bg-gray-50 p-2 rounded-md border border-gray-200">
          {content}
        </div>
        {handles.map((handle, index) => (
          <Handle
            key={index}
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.id}`}
            style={handle.style}
            onConnect={handleConnect}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              connectedHandles.has(`${id}-${handle.id}`)
                ? "bg-purple-600" // Filled style when connected
                : "bg-white border-2 border-purple-600" // Outlined style when not connected
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BaseNode;
