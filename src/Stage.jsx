import React, { useCallback, useEffect, useMemo } from "react";
import Item from "./item";
import { ITEM_TYPES } from "./constants";
import { useDrop } from "react-dnd";
import isEqual from "lodash/isEqual";
import update from "immutability-helper";

const Stage = ({
  items,
  left,
  top,
  setItems,
  addNewItem,
  isNewItemAdding,
  setSelectedItem,
  selectedItem,
}) => {
  const [, drop] = useDrop({
    accept: Object.keys(ITEM_TYPES), // Specify the accepted item type
    drop: (item, monitor) => {
      if (!item.id) {
        addNewItem(item.type);
      } else {
        const delta = monitor.getDifferenceFromInitialOffset(); //This calculation is performed relative to the entire screen.
        const newLeft = Math.round(item.left + delta.x);
        const newTop = Math.round(item.top + delta.y);
        moveBox(item.id, newLeft, newTop);
      }
    },
  });

  const moveBox = useCallback(
    (id, left, top) => {
      setItems((prevStageItems) => {
        const itemIndex = prevStageItems.findIndex((item) => item.id === id);

        if (itemIndex !== -1) {
          return update(prevStageItems, {
            [itemIndex]: {
              $merge: { left, top },
            },
          });
        }

        return prevStageItems;
      });
    },
    [setItems]
  );

  const memoItems = useMemo(() => {
    const itemsToMap = items || [];
    return itemsToMap.map((item, index) => (
      <Item
        key={`id_${index}`}
        index={item.index}
        type={item.type}
        id={item.id}
        left={item.left}
        top={item.top}
        moveBox={moveBox}
        isNewItemAdding={isNewItemAdding}
        onClick={() => setSelectedItem({ id: item.id, index: index })}
        isSelected={!!item.id && item.id === selectedItem?.id}
      />
    ));
  }, [items, selectedItem, isNewItemAdding, moveBox]);

  return (
    <div
      ref={drop}
      style={{
        width: "1000px",
        height: "1000px",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid silver",
        position: "relative",
        left,
        top,
      }}
    >
      {memoItems}
    </div>
  );
};

export default Stage;
