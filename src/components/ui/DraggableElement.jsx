import React from "react";

const DraggableElement = ({ type, label, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className="cursor-move bg-white p-3 rounded shadow mb-3 hover:bg-gray-50 text-center select-none"
      style={{ userSelect: "none" }}
    >
      {label}
    </div>
  );
};

export default DraggableElement;
