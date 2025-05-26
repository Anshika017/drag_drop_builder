import React from "react";

const PropertiesPanel = ({ selectedElement, updateElement }) => {
  if (!selectedElement) {
    return (
      <div className="text-sm text-center text-gray-500 dark:text-gray-400">
        Select an element to see properties
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateElement(selectedElement.id, {
      [name]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* Content property */}
      <div>
        <label className="block text-sm mb-1">Content</label>
        {(selectedElement.type === "button" ||
          selectedElement.type === "input" ||
          selectedElement.type === "text") && (
          <input
            type="text"
            name="content"
            value={selectedElement.content || ""}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
          />
        )}
      </div>

      {/* Position X */}
      <div>
        <label className="block text-sm mb-1">Position X</label>
        <input
          type="number"
          name="x"
          value={selectedElement.x}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      {/* Position Y */}
      <div>
        <label className="block text-sm mb-1">Position Y</label>
        <input
          type="number"
          name="y"
          value={selectedElement.y}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      {/* Width */}
      <div>
        <label className="block text-sm mb-1">Width</label>
        <input
          type="number"
          name="width"
          value={selectedElement.width}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm mb-1">Height</label>
        <input
          type="number"
          name="height"
          value={selectedElement.height}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
        />
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm mb-1">Text Color</label>
        <input
          type="color"
          name="color"
          value={selectedElement.color}
          onChange={handleChange}
          className="w-full h-8 p-0 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 cursor-pointer"
        />
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm mb-1">Background Color</label>
        <input
          type="color"
          name="backgroundColor"
          value={selectedElement.backgroundColor}
          onChange={handleChange}
          className="w-full h-8 p-0 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PropertiesPanel;
