import { useState } from "react";
import { useStore } from "./../store";

export const useInputNode = (initialName, initialType) => {
  const [currName, setCurrName] = useState(initialName);
  const [inputType, setInputType] = useState(initialType);
  const { updateNodeField } = useStore();

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCurrName(value);
    updateNodeField("inputName", value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setInputType(value);
    updateNodeField("inputType", value);
  };

  return { currName, inputType, handleNameChange, handleTypeChange };
};
