// ImageItem.js
import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "./constants";

const PARAGRAPH1 = ({ id, index, moveItem }) => {
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
        src="https://academic-englishuk.com/wp-content/uploads/2020/03/A-basic-paragraph-on-CSR-by-AEUK.png"
        alt={`Image ${id}`}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default PARAGRAPH1;
