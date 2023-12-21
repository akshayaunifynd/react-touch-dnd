import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ITEM_TYPES } from "./constants";

const Item = ({
  // all are custom parameters
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

  //! Portal :: useDrop hook for builderItem
  // TODO :: refactor and split here while adding portal
  //handlerId, drop, and monitor are not custom terms but rather part of the API provided by the react-dnd
  const [{ handlerId }, drop] = useDrop({
    accept: Object.keys(ITEM_TYPES),
    //The collect function is used to retrieve information about the drag state and return it as an object
    collect(monitor) {
      return {
        //The handler is a component that initiates the drag operation. and handlerId is its id
        handlerId: monitor.getHandlerId(),
      };
    },
    // hover funciton : It calculates the position of the cursor relative to the hovered item and decides whether to reorder items or add a new item.
    hover(item, monitor) {
      if (!itemRef.current && !itemRef.current?.getBoundingClientRect) {
        return;
      }

      //! Position arrangement for item sorting and adding
      const { top, bottom, height } = itemRef.current.getBoundingClientRect();
      const { y } = monitor.getClientOffset(); // getClientOffset() is a method of the monitor object that returns the current cursor position.
      const hoverIndex = index;
      const dragIndex = item.index;

      const hoverMiddleY = (bottom - top) / 2; //center of the hovered item
      const hoverClientY = y - top; // Calculates the vertical distance from the top of the hovered item to the cursor's Y position.

      //! Portal :: compare id and tempID in here
      if (!id || dragIndex === hoverIndex) {
        return;
      }

      //! Portal :: reorder items
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // if isNewItemAdding is false it means that v r not adding new item, v r arranging a existing item in stage
      if (!isNewItemAdding) {
        onNewAddingItemProps({ hoveredIndex: hoverIndex });
        moveItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      } else {
        //If isNewItemAdding is true, it calculates a threshold (belowThreshold) based on the middle of the hovered item and determines whether the dragged item should be added above or below that threshold.
        const belowThreshold = top + height / 2;
        const newShould = y >= belowThreshold;
        onNewAddingItemProps({
          hoveredIndex: hoverIndex,
          shouldAddBelow: newShould,
        });
      }
    },
  });

  //! Portal :: isDragging prop. might be use for styling changes in dnd process or something like that purposes
  //The useDrag hook returns an array where the first element is an object containing information about the drag state, and the second element is a function (drag) that is used to attach the drag source props to a DOM element.
  const [{ isDragging }, drag] = useDrag({
    // the type in item.jsx was not getting assigned so I have just installed lower version of react-dnd which is      :-after this it got assigned properly

    item: { type: type, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //! Portal :: trigger the item as dnd object
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
        border,
      }}
      onClick={onClick}
    >
      {type}
    </div>
  );
};

export default Item;
