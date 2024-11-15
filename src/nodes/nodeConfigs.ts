import { HandleType, Position } from "reactflow";

// Define the configuration type for each node type
interface NodeConfig {
  title: string;
  type?: string;
  fields: {
    name: string;
    label?: string;
    type: string;
    placeholder?: string;
    options?: string[];
  }[];
  handles: {
    type: HandleType;
    position: Position;
    id: string;
  }[];
  customLogic?: (data: any) => {};
  defaultData?: Record<string, any>; // Make defaultData optional
}

// Define nodeConfigs with specific configurations for each node type
export const nodeConfigs: Record<string, NodeConfig> = {
  customInput: {
    title: "Input",
    type: "customInput",
    fields: [
      {
        name: "inputName",
        label: "Name",
        type: "text",
        placeholder: "Enter name",
      },
      {
        name: "inputType",
        label: "Type",
        type: "select",
        options: ["Text", "File"],
      },
    ],
    handles: [{ type: "source", position: Position.Right, id: "value" }],
    defaultData: { inputName: "Default Input Name", inputType: "Text" },
  },
  customOutput: {
    title: "Output",
    type: "customOutput",
    fields: [
      {
        name: "outputName",
        label: "Name",
        type: "text",
        placeholder: "Enter output name",
      },
      {
        name: "outputType",
        label: "Type",
        type: "select",
        options: ["Text", "Image"],
      },
    ],
    handles: [{ type: "target", position: Position.Left, id: "value" }],
    // defaultData: { outputName: "Default Output Name", outputType: "Text" },
  },
  llm: {
    title: "LLM",
    type: "llm",
    fields: [
      {
        name: "llmName",
        type: "para",
      },
    ],
    handles: [
      { type: "target", position: Position.Left, id: "system" },
      { type: "target", position: Position.Left, id: "prompt" },
      { type: "source", position: Position.Right, id: "response" },
    ],
  },
  //   text: {
  //     title: "Text",
  //     type: "text",
  //     fields: [
  //       {
  //         name: "text",
  //         label: "Text",
  //         type: "textarea",
  //         placeholder: "Enter {{variables}}",
  //       },
  //     ],
  //     handles: [{ type: "source", position: Position.Right, id: "output" }],
  //     customLogic: (text: string) => {
  //       const variables = Array.from(
  //         text.matchAll(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g)
  //       ).map((match) => match[1]);
  //       return variables.map((variable, index) => ({
  //         type: "target" as HandleType,
  //         position: Position.Left,
  //         id: `input-${variable}`,
  //         style: { top: `${index * 20 + 80}px` },
  //       }));
  //     },
  //   },
  fileSave: {
    title: "File Save",
    fields: [
      {
        name: "fileName",
        label: "File Name",
        type: "text",
        placeholder: "Enter file name",
      },
      {
        name: "fileFormat",
        label: "File Format",
        type: "select",
        options: ["CSV", "JSON", "TXT"],
      },
    ],
    handles: [{ type: "target", position: Position.Left, id: "input" }],
  },
  note: {
    title: "Note",
    fields: [
      {
        name: "noteContent",
        label: "Content",
        type: "textarea",
        placeholder: "Enter your note here",
      },
    ],
    handles: [{ type: "source", position: Position.Right, id: "output" }],
  },
};
