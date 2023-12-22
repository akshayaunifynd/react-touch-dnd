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
    hover(item, monitor) {
      if (!itemRef.current && !itemRef.current?.getBoundingClientRect) {
        return;
      }
      const { top, bottom, height } = itemRef.current.getBoundingClientRect();
      const { y } = monitor.getClientOffset();
      const hoverIndex = index;
      const dragIndex = item.index;
      const hoverMiddleY = (bottom - top) / 2;
      const hoverClientY = y - top;
      if (!id || dragIndex === hoverIndex) {
        return;
      }

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (!isNewItemAdding) {
        onNewAddingItemProps({ hoveredIndex: hoverIndex });
        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      } else {
        const belowThreshold = top + height / 2;
        const newShould = y >= belowThreshold;
        onNewAddingItemProps({
          hoveredIndex: hoverIndex,
          shouldAddBelow: newShould,
        });
      }
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
        opacity,
        // border,
      }}
      onClick={onClick}
    >
      <img src={ITEM_TYPES[type]} alt={type} height={"300px"} width={"300px"} />

      {type}
    </div>
  );
};

export default Item;
