// builder.jsx
// adds new item
// has a drag funciton
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

      setMousePosition({ x: clientX, y: clientY });
    };

    document.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const handleAddNewItem = useCallback(
    (type) => {
      const newItem = {
        id: items.length + 1,
        type,
        left: mousePosition.x,
        top: mousePosition.y,
      };
      console.log("New Item:", newItem);
      // Update the positions of existing items only if there are existing items
      const updatedItems = items.length
        ? items.map((item) => ({ ...item }))
        : [...items];
      setItems([...updatedItems, newItem]);
      setSelectedItem(newItem);
    },
    [items, mousePosition, setItems, setSelectedItem]
  );

  // const [, handleAddNewItemDrag] = useDrag({
  //   item: {
  //     type: Object.keys(ITEM_TYPES)[0], // Adjust this based on your ITEM_TYPES structure
  //     id: "dummy", // Use a dummy id for the drag item
  //     left: 0,
  //     top: 0,
  //   },

  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  const [, handleAddNewItemDrag] = useDrag({
    item: {
      type: Object.keys(ITEM_TYPES)[0], // Adjust this based on your ITEM_TYPES structure
      id: "dummy", // Use a dummy id for the drag item
      left: 0,
      top: 0,
    },
    collect: (monitor) => {
      const isDragging = monitor.isDragging();
      // Log the isDragging value
      console.log("isDragging:", isDragging);
      return {
        isDragging,
      };
    },
  });

  const MemoLeftPanel = useCallback(
    () => (
      <LeftPanel
        addNewItem={handleAddNewItem}
        onNewItemAdding={setNewItemAdding}
        selectedItem={selectedItem}
        handleAddNewItemDrag={handleAddNewItemDrag}
      />
    ),
    [handleAddNewItem, selectedItem, handleAddNewItemDrag]
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

// // builder.jsx
// import React, { useCallback, useState, useEffect } from "react";
// import { useRef } from "react";
// import { useDrag, useDrop } from "react-dnd";
// import { ITEM_TYPES } from "./constants";
// import LeftPanel from "./LeftPanel";
// import Stage from "./Stage";
// import { moveBox } from "./Stage";
// import { object } from "prop-types";

// // import { ITEM_TYPES } from "./constants";

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
// };

// const Builder = () => {
//   const [items, setItems] = useState([]);
//   const [isNewItemAdding, setNewItemAdding] = useState(false);
//   const [selectedItem, setSelectedItem] = useState({});
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       setMousePosition({ x: event.clientX, y: event.clientY });
//     };

//     document.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   // const handleAddNewItem = useCallback(
//   //   (type) => {
//   //     const newItem = {
//   //       id: items.length + 1,
//   //       type,
//   //       left: items.left,
//   //       top: items.top,
//   //     };
//   //     console.log("New Item:", newItem);
//   //     // Update the positions of existing items only if there are existing items
//   //     const updatedItems = items.length
//   //       ? items.map((item) => ({ ...item }))
//   //       : [...items];

//   //     setItems([...updatedItems, newItem]);
//   //     setSelectedItem(newItem);
//   //   },
//   //   [items, mousePosition]
//   // );
//   // console.log(handleAddNewItem.newItem);

//   const handleAddNewItem = useCallback(
//     (type) => {
//       const newItem = {
//         id: items.length + 1,
//         type,
//         left: mousePosition.x,
//         top: mousePosition.y,
//       };

//       console.log("New Item:", newItem);

//       // Update the positions of existing items only if there are existing items
//       const updatedItems = items.length
//         ? items.map((item) => ({ ...item }))
//         : [...items];

//       setItems([...updatedItems, newItem]);
//       setSelectedItem(newItem);
//     },
//     [items, mousePosition, setItems, setSelectedItem]
//   );

//   // console.log(handleaddnewitemm.item);
//   // Portal :: Left Panel, Using memo will cause React to skip rendering a component if its props have not changed.
//   const MemoLeftPanel = useCallback(
//     () => (
//       <LeftPanel
//         addNewItem={handleAddNewItem}
//         onNewItemAdding={setNewItemAdding}
//         selectedItem={selectedItem}
//         // handleaddnewitemm={handleaddnewitemm}
//       />
//     ),
//     [handleAddNewItem, selectedItem]
//   );

//   return (
//     <div style={styles.container}>
//       <MemoLeftPanel />
//       <Stage
//         items={items}
//         setItems={setItems}
//         addNewItem={handleAddNewItem}
//         isNewItemAdding={isNewItemAdding}
//         onNewItemAdding={setNewItemAdding}
//         setSelectedItem={setSelectedItem}
//         selectedItem={selectedItem}
//       />
//     </div>
//   );
// };

// export default Builder;

// import React, { useCallback, useState } from "react";
// import { ITEM_TYPES } from "./constants";
// import LeftPanel from "./LeftPanel";
// import Stage from "./Stage";
// import { moveBox } from "./Stage";

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "space-between",
//     // "@media (max-width: 500px)": {
//     //   justifyContent: "row",
//     // },
//   },
// };

// const Builder = () => {
//   //! Mock data list
//   const [items, setItems] = useState([]);

//   const [isNewItemAdding, setNewItemAdding] = useState(false);
//   const [selectedItem, setSelectedItem] = useState({});

//   const handleAddNewItem = useCallback(
//     (type, cursorX, cursorY) => {
//       const newItem = {
//         id: items.length + 1,
//         type,
//         left: cursorX,
//         top: cursorY,
//       };
//       setItems((prevItems) => [...prevItems, newItem]);
//       console.log(cursorX);
//       console.log(cursorY);
//       setSelectedItem(newItem);
//     },
//     [items]
//   );

//   //! Portal :: Left Panel, Using memo will cause React to skip rendering a component if its props have not changed.
//   const MemoLeftPanel = useCallback(
//     () => (
//       <LeftPanel
//         addNewItem={handleAddNewItem}
//         onNewItemAdding={setNewItemAdding}
//         selectedItem={selectedItem}
//       />
//     ),
//     [handleAddNewItem, selectedItem]
//   );

//   return (
//     <div style={styles.container}>
//       <MemoLeftPanel />
//       <Stage
//         items={items}
//         setItems={setItems}
//         addNewItem={handleAddNewItem}
//         isNewItemAdding={isNewItemAdding}
//         onNewItemAdding={setNewItemAdding}
//         setSelectedItem={setSelectedItem}
//         selectedItem={selectedItem}
//       />
//     </div>
//   );
// };

// export default Builder;
