import React, { useCallback, useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "./constants";
import LeftPanel from "./LeftPanel";
import Stage from "./Stage";

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
};

const Builder = () => {
  const [items, setItems] = useState([]);
  const [isNewItemAdding, setNewItemAdding] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      const clientX =
        event.clientX ||
        (event.touches && event.touches.length > 0 && event.touches[0].clientX);
      const clientY =
        event.clientY ||
        (event.touches && event.touches.length > 0 && event.touches[0].clientY);

      setTimeout(() => setMousePosition({ x: clientX, y: clientY }), 0);
    };

    document.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("touchmove", handlePointerMove);

    return () => {
      document.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

  // const [, drag] = useDrag({
  //   item: { type: "", id: "dummy" },
  // });

  const handleAddNewItem = useCallback(
    (type) => {
      const newItem = {
        id: items.length + 1,
        type,
        left: mousePosition.x,
        top: mousePosition.y,
      };
      // Update the positions of existing items only if there are existing items
      const updatedItems = items.length
        ? items.map((item) => ({ ...item }))
        : [...items];
      setItems([...updatedItems, newItem]);
      setSelectedItem(newItem);
    },
    [items, mousePosition, setItems, setSelectedItem]
  );

  const MemoLeftPanel = useCallback(
    () => (
      <LeftPanel
        addNewItem={handleAddNewItem}
        onNewItemAdding={setNewItemAdding}
        selectedItem={selectedItem}
        // drag={drag}
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
