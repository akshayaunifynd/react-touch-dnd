import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import Builder from "./Builder";
import "./styles.css";
import MultiBackend, {
  DndProvider,
  TouchTransition,
  MouseTransition,
  Preview,
} from "react-dnd-multi-backend";

import Item from "./item";

export const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};
//this is custom preview
export const generatePreview = (props) => {
  const { item, style } = props;
  const newStyle = {
    ...style,
  };

  return (
    <div style={newStyle}>
      <Item {...item} />
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        {/* if you do not use the <Preview /> component then you will see the default drag n drop behaviour i.e  u will see semi-transparent representation of the dragged item following the cursor  */}
        <Preview>{generatePreview}</Preview>
        <Builder />
      </DndProvider>
    </div>
  );
}
