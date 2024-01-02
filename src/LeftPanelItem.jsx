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
    <div className="LeftContainer">
      <div className="LeftItems" style={{ backgroundColor: "pink" }}>
        <div ref={dragRef}>
          <div type="image" onClick={onClick}>
            {/* this is responsible for the image in leftpanel */}
            <img
              src={ITEM_TYPES[itemType]}
              alt={itemType}
              height={"200px"}
              width={"200px"}
            />
            {/* This is responsible for the 'Form Link Document etc' written in below of the image in 
        left Panel */}
            {itemType}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanelItem;
