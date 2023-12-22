import React, { useCallback, useState } from "react";
import { ITEM_TYPES } from "./constants";
import LeftPanel from "./LeftPanel";
import Stage from "./Stage";
import PARAGRAPH1 from "./Paragraph";

const Builder = () => {
  //! Mock data list
  const [items, setItems] = useState([]);

  const [isNewItemAdding, setNewItemAdding] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  //! Portal :: this fn is imitation of adding new item
  const handleAddNewItem = useCallback(
    (type, hoveredIndex = items.length, shouldAddBelow = true) => {
      const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;
      setItems([
        ...items.slice(0, startIndex), // this adds elements from 0 index to the startIndex (excludes the start index)
        { id: items.length + 1, type: type },
        ...items.slice(startIndex), // this adds element from startIndex (includes startIndex) and till the last element of the array
      ]);
      //this setItems then wraps elements from 0 index to startIndex to the last Index and sets the state of the array

      //!!!!!!!!!!!! ATTENTION
      //! Portal :: We might change the last Added item logic like this, my recommendation is changing portal logic as well
      setSelectedItem({
        id: items.length + 1,
        index: startIndex,
      }); //This part creates a new object with two properties:
    },
    [items]
  );

  //! Portal :: Left Panel, Using memo will cause React to skip rendering a component if its props have not changed.
  const MemoLeftPanel = useCallback(
    () => (
      <LeftPanel
        addNewItem={handleAddNewItem}
        onNewItemAdding={setNewItemAdding}
        selectedItem={selectedItem}
      />
    ),
    [handleAddNewItem, selectedItem]
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <MemoLeftPanel />
      <Stage
        items={items}
        setItems={setItems}
        addNewItem={handleAddNewItem}
        isNewItemAdding={isNewItemAdding}
        onNewItemAdding={setNewItemAdding}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Builder;
