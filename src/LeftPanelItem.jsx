import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "./constants";

const LeftPanelItem = ({ itemType, onClick, onNewItemAdding }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: itemType },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    onNewItemAdding(isDragging);
  }, [isDragging, onNewItemAdding]);

  const itemStyle = ITEM_TYPES[itemType]?.style || {};

  return (
    <div ref={dragRef}>
      <button
        type="button"
        onClick={onClick}
        style={{
          background: "blue",
          color: "#fff",
          padding: "20px",
          margin: "10px",
          border: "none",
        }}
      >
        {itemType}
      </button>
    </div>
  );
};

export default LeftPanelItem;
