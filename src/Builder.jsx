import React, { useCallback, useState } from "react";
import { ITEM_TYPES } from "./constants";
import LeftPanel from "./LeftPanel";
import Stage from "./Stage";
import { moveBox } from "./Stage";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    // "@media (max-width: 500px)": {
    //   justifyContent: "row",
    // },
  },
};

const Builder = () => {
  //! Mock data list
  const [items, setItems] = useState([]);

  const [isNewItemAdding, setNewItemAdding] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const handleAddNewItem = useCallback(
    (type, cursorX, cursorY) => {
      const newItem = {
        id: items.length + 1,
        type,
        left: cursorX,
        top: cursorY,
      };
      setItems((prevItems) => [...prevItems, newItem]);
      setSelectedItem(newItem);
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
    <div style={styles.container}>
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
