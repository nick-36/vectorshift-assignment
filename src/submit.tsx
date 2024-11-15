import React from "react";
import { Edge, Node } from "reactflow";
import { useStore } from "./store";
import axios from "axios";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const handleSubmit = async () => {
    try {
      // Transform nodes and edges data to match backend expectations
      const transformedNodes = nodes.map((node: Node) => ({ id: node.id }));
      const transformedEdges = edges.map((edge: Edge) => ({
        source: edge.source,
        target: edge.target,
      }));

      const data = {
        nodes: transformedNodes,
        edges: transformedEdges,
      };

      // Send the transformed data to the backend
      const response = await axios.post(
        "http://localhost:8000/pipelines/parse",
        data
      );
      const result = response.data;

      // Display the result in an alert
      alert(
        `Number of nodes: ${result.num_nodes}\n` +
          `Number of edges: ${result.num_edges}\n` +
          `Is DAG: ${result.is_dag ? "Yes" : "No"}`
      );
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("There was an error submitting the data.");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        className="px-2 py-1 rounded-md bg-gray-950 text-white font-semibold border-solid border-2 border-gray-800"
        type="button"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};
