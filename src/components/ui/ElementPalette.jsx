import React from "react";

const elements = [
  { type: "text", label: "Text" },
  { type: "button", label: "Button" },
  { type: "input", label: "Input" },
];

const ElementPalette = ({ onDragStart }) => {
  return (
    <div className="flex flex-col gap-4">
      {elements.map((el) => (
        <div
          key={el.type}
          role="button"
          tabIndex={0}
          draggable
          aria-grabbed="false"
          onDragStart={(e) => onDragStart(e, el.type)}
          className="cursor-move p-4 text-center rounded-md border border-gray-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-150 text-base font-medium select-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          style={{
            minHeight: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {el.label}
        </div>
      ))}
    </div>
  );
};

export default ElementPalette;
