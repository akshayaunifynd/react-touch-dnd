// ImageItem.js
import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "./constants";

const FROM = ({ id, index, moveItem }) => {
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
        src="https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_740,h_900/https://cdn.marketing123.123formbuilder.com/wp-content/uploads/2023/04/private-school-application-form.jpg"
        alt={`Image ${id}`}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default FROM;
