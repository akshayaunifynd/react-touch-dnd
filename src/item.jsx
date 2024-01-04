import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ITEM_TYPES } from "./constants";

const Item = ({
  //if you don't add this left and top then you will get error that left and top not found
  left = 0,
  top = 0,
  type,
  id,
  index,
  moveBox,
  isNewItemAdding,
  onClick,
}) => {
  const itemRef = useRef(null);

  // with the below code the item is getting dragged properly
  const [{ isDragging }, drag] = useDrag({
    item: { type: type, id, index, left, top }, // if u don't pass left and top here then you wont be able to drag element over here
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(itemRef);

  return (
    <div
      ref={itemRef}
      style={{
        padding: "10px",
        margin: "10px",
        width: "20%",
        height: "20%",
        // cursor: isNewItemAdding ? "not-allowed" : "move",
        backgroundColor: "yellowgreen",
        // if you don't add this then item will get added but will not be moved
        top,
        left,
        //this position is imp if this is not there then the items overlap every time a new item is drapped
        position: "relative",
      }}
      onClick={onClick}
    >
      <img
        src={ITEM_TYPES[type]}
        alt={type}
        height={"100%"}
        width={"100%"}
        //this position is imp if this is not there then the items overlap every time a new item is drapped
        position={"absolute"}
      />
      {type}
    </div>
  );
};

export default Item;
