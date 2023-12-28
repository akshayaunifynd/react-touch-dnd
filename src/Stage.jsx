import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Item from "./item";
import { ITEM_TYPES } from "./constants";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import isEqual from "lodash/isEqual";
import ImageItem from "./ImageItem";
import DOCUMENT from "./Document";

const Stage = ({
  items,
  setItems,
  addNewItem,
  isNewItemAdding,
  setSelectedItem,
  selectedItem,
}) => {
  const [stageItems, setStageItems] = useState(items);

  //! Portal :: mimic behavior of portal stage
  useEffect(() => {
    if (!isEqual(stageItems, items)) {
      setStageItems(items);
    }
  }, [items]);

  //! Portal :: useDrop for stage process
  const [{ isOver, draggingItemType }, dropRef] = useDrop({
    accept: Object.keys(ITEM_TYPES),
    drop: (droppedItem) => {
      const { type, id } = droppedItem;
      if (!id) {
        // a new item added
        addNewItem(type);
      } else {
        // the result of sorting is applying the mock data
        setItems(stageItems);
      }
      console.log(
        "droppedItem: ",
        type,
        "order: ",
        isNewItemAdding ? "new item added!" : ""
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      draggingItemType: monitor.getItemType(),
    }),
  });

  const memoItems = useMemo(() => {
    return stageItems?.map((item, index) => {
      const { id, type } = item;

      return (
        <Item
          key={`id_${index}`}
          index={index}
          type={type}
          id={id}
          isNewItemAdding={isNewItemAdding}
          onClick={() => setSelectedItem({ id: id, index: index })}
          isSelected={!!id && id === selectedItem?.id}
        />
      );
    });
  }, [stageItems, selectedItem, isNewItemAdding]);

  return (
    <div
      ref={dropRef}
      style={{
        width: "1000px",
        height: "auto",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid silver",
      }}
    >
      {memoItems}
    </div>
  );
};

export default Stage;
