import React from "react";

const elements = [
  { type: "text", label: "Text" },
  { type: "button", label: "Button" },
  { type: "input", label: "Input" },
];

const ElementPalette = ({ onDragStart }) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      {elements.map((el) => (
        <div
          key={el.type}
          draggable
          onDragStart={(e) => onDragStart(e, el.type)}
          className="cursor-move p-5 text-center rounded border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition text-lg font-semibold select-none"
          style={{ minHeight: 60,minWidth: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {el.label}
        </div>
      ))}
    </div>
  );

};

export default ElementPalette;
