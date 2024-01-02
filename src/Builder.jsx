import React, { useCallback, useState } from "react";
import { ITEM_TYPES } from "./constants";
import LeftPanel from "./LeftPanel";
import Stage from "./Stage";
import PARAGRAPH1 from "./Paragraph";

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

  // ! Portal :: this fn is imitation of adding new item
  const handleAddNewItem = useCallback(
    (type, hoveredIndex = items.length, shouldAddBelow = true) => {
      const startIndex = hoveredIndex;
      setItems([
        ...items.slice(0, startIndex),
        { id: items.length + 1, type: type },
        ...items.slice(startIndex),
      ]);

      setSelectedItem({
        id: items.length + 1,
        index: startIndex,
      }); //This part creates a new object with two properties:
    },
    [items]
  );

  // const handleAddNewItem = useCallback(
  //   (type, hoveredIndex = items.length, shouldAddBelow = true) => {
  //     const startIndex = shouldAddBelow ? hoveredIndex + 1 : hoveredIndex;
  //     setItems([
  //       ...items.slice(0, startIndex),
  //       { id: items.length + 1, type: type },
  //       ...items.slice(startIndex),
  //     ]);

  //     //!!!!!!!!!!!! ATTENTION
  //     //! Portal :: We might change the last Added item logic like this, my recommendation is changing portal logic as well
  //     setSelectedItem({
  //       id: items.length + 1,
  //       index: startIndex,
  //     });
  //   },
  //   [items]
  // );

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
