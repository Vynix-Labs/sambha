// src/components/CanvasArea/TextItem.tsx
"use client";
import React from "react";
import { TextItem as TextItemType } from "types";

interface TextItemProps {
  textItem: TextItemType;
  handleDragStart?: (
    item: TextItemType,
    itemType: "text",
    event: React.MouseEvent
  ) => void;
}

const TextItem: React.FC<TextItemProps> = ({ textItem, handleDragStart }) => {
  return (
    <div
      className="absolute cursor-move text-gray-700"
      style={{
        left: textItem.position.x,
        top: textItem.position.y,
        fontFamily: textItem.fontFamily,
        fontSize: "16px",
      }}
      onMouseDown={
        handleDragStart
          ? (e) => handleDragStart(textItem, "text", e)
          : undefined
      }
    >
      {textItem.text}
    </div>
  );
};

export default TextItem;
