import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Item from "./item";
import { ITEM_TYPES } from "./constants";
import { useDrop } from "react-dnd";
import isEqual from "lodash/isEqual";
import update from "immutability-helper";

const Stage = ({
  items,
  // if u don't pass left n top here then on line 94 the left n top will not be able to find
  left,
  top,
  setItems,
  addNewItem,
  isNewItemAdding,
  setSelectedItem,
  selectedItem,
}) => {
  const [stageItems, setStageItems] = useState(items);

  // ! Portal :: mimic behavior of portal stage
  useEffect(() => {
    if (!isEqual(stageItems, items)) {
      setStageItems(items);
    }
  }, [items]);

  const moveBox = useCallback((id, left, top) => {
    setStageItems((prevStageItems) => {
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
  }, []);

  // If you change this code then only one item will get rendered rn it is correct
  const [, drop] = useDrop({
    accept: Object.keys(ITEM_TYPES), // Specify the accepted item type
    drop: (item, monitor) => {
      if (!item.id) {
        addNewItem(item.type);
      } else {
        const delta = monitor.getDifferenceFromInitialOffset();
        const newLeft = Math.round(item.left + delta.x);
        const newTop = Math.round(item.top + delta.y);
        moveBox(item.id, newLeft, newTop);
      }
    },
  });

  const memoItems = useMemo(() => {
    const itemsToMap = stageItems || [];
    return itemsToMap.map((item, index) => (
      <Item
        key={`id_${index}`}
        index={item.index}
        type={item.type}
        id={item.id}
        // if u dont add left n top here then item will not get dragged
        left={item.left}
        top={item.top}
        moveBox={moveBox}
        isNewItemAdding={isNewItemAdding}
        onClick={() => setSelectedItem({ id: item.id, index: index })}
        isSelected={!!item.id && item.id === selectedItem?.id}
      />
    ));
  }, [stageItems, selectedItem, isNewItemAdding, moveBox]);

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
        // this left and top is important
        left,
        top,
      }}
    >
      {memoItems}
    </div>
  );
};

export default Stage;
