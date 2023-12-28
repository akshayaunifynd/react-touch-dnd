import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ITEM_TYPES } from "./constants";
import bhkImage from "./images/BHK.png";
import rkImage from "./images/RK.png";

const Item = ({
  type,
  id,
  index,
  moveItem,
  isNewItemAdding,
  onNewAddingItemProps,
  onClick,
  isSelected,
}) => {
  const itemRef = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: Object.keys(ITEM_TYPES),
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: type, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(itemRef));

  const opacity = isNewItemAdding && !id ? "0.3" : "1";
  const border = isSelected ? "3px dashed blue" : "1px solid silver";
  return (
    <div
      data-handler-id={handlerId}
      ref={itemRef}
      style={{
        padding: "10px",
        margin: "10px",
        width: "300px",
        height: "300px",
      }}
      onClick={onClick}
    >
      <img src={ITEM_TYPES[type]} alt={type} height={"300px"} width={"300px"} />

      {type}
    </div>
  );
};

export default Item;
