// ImageItem.js
import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "./constants";

const DOCUMENT = ({ id, index, moveItem }) => {
  const itemRef = useRef(null);

  const [, drag] = useDrag({
    item: { type: ITEM_TYPES.DOCUMENT, id, index },
  });

  drag(itemRef);

  const backgroundImageStyle = {
    backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/887/887997.png)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <div
      ref={itemRef}
      style={{
        padding: "10px",
        margin: "10px",
        border: "1px solid silver",
        // backgroundImage: `url(https://cdn-icons-png.flaticon.com/512/887/887997.png)`,
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/887/887997.png"
        alt={`Image ${id}`}
        style={{ width: "50%" }}
      />
    </div>
  );
};

export default DOCUMENT;
