import React, { useMemo } from "react";
import { ITEM_TYPES } from "./constants";
import LeftPanelItem from "./LeftPanelItem";

const LeftPanel = ({ addNewItem, onNewItemAdding, selectedItem }) => {
  const LeftPanelItems = useMemo(
    () =>
      Object.keys(ITEM_TYPES).map((itemType) => {
        return (
          <LeftPanelItem
            key={itemType}
            type="image"
            itemType={itemType}
            onClick={() => addNewItem(itemType, selectedItem?.index, true)}
            onNewItemAdding={onNewItemAdding}
            style={{
              display: "flex",
              margin: "10px",
            }}
          >
            {/* {<img src={bhkImage} />} */}
            {/* {itemType} */}
          </LeftPanelItem>
        );
      }),
    [addNewItem, onNewItemAdding, selectedItem]
  );

  return <div>{LeftPanelItems}</div>;
};

export default LeftPanel;
