// ImageItem.js
import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "./constants";

const ImageItem = ({ id, index, moveItem }) => {
  const itemRef = useRef(null);

  const [, drag] = useDrag({
    item: { type: ITEM_TYPES.IMAGE, id, index },
  });

  drag(itemRef);

  return (
    <div
      ref={itemRef}
      style={{ padding: "10px", margin: "10px", border: "1px solid silver" }}
    >
      <img
        src="https://cdn.shopify.com/s/files/1/1199/8502/files/persian-doll-face.jpg"
        alt={`Image ${id}`}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ImageItem;
