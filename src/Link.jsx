// ImageItem.js
import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "./constants";

const LINK = ({ id, index, moveItem }) => {
  const itemRef = useRef(null);

  const [, drag] = useDrag({
    item: { type: ITEM_TYPES.DOCUMENT, id, index },
  });

  drag(itemRef);

  return (
    <div
      ref={itemRef}
      style={{ padding: "10px", margin: "10px", border: "1px solid silver" }}
    >
      <img
        src="https://static.wikia.nocookie.net/characterprofile/images/a/a1/LinkZelda.png/revision/latest?cb=20160105030137"
        alt={`Image ${id}`}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default LINK;
