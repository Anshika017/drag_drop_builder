import React, { useState } from "react";
import ElementPalette from "../components/ui/ElementPalette";
import BuilderCanvas from "../components/ui/BuilderCanvas";
import PropertiesPanel from "../components/ui/PropertiesPanel";

const Builder = ({ darkMode, toggleDarkMode }) => {
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const onDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  const updateElement = (id, updates) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const selectedElement = elements.find((el) => el.id === selectedId);

  const panelHeight = 500;

  return (
    <div className="relative w-full max-w-5xl mx-auto h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

      {/* Main Builder Layout */}
      <div
        className="flex overflow-hidden"
        style={{ height: `calc(100vh - 80px)` }}
      >
        {/* Left - Element Palette */}
        <div
          className="w-1/5 min-w-[220px] bg-white dark:bg-slate-800 border-r border-gray-300 dark:border-slate-700 p-4 flex flex-col items-center"
          style={{ height: panelHeight }}
        >
          <h2 className="font-semibold text-lg mb-6 text-center border-b border-gray-300 dark:border-slate-700 w-full pb-2">
            🎨 Element Palette
          </h2>
          <ElementPalette onDragStart={onDragStart} />
        </div>

        {/* Center - Canvas */}
        <div
          className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 relative flex flex-col items-center"
          style={{ height: panelHeight, position: "relative" }} // ensure relative
        >
          <h2 className="font-semibold text-lg mb-6 text-center border-b border-gray-300 dark:border-slate-700 w-full pb-2">
            🧲 Canvas
          </h2>
          <BuilderCanvas
            elements={elements}
            setElements={setElements}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            canvasHeight={panelHeight}  // pass height to clamp positions
            canvasWidth={undefined} // pass width if you want (or calculate)
          />
        </div>

        {/* Right - Properties Panel */}
        <div
          className="w-1/4 min-w-[280px] bg-white dark:bg-slate-800 border-l border-gray-300 dark:border-slate-700 p-4 flex flex-col items-center"
          style={{ height: panelHeight }}
        >
          <h2 className="font-semibold text-lg mb-6 text-center border-b border-gray-300 dark:border-slate-700 w-full pb-2">
            ⚙️ Properties
          </h2>
          <PropertiesPanel
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        </div>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-10 right-10 bg-indigo-600 dark:bg-indigo-400 text-white dark:text-gray-900 px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors duration-300 select-none"
        aria-label="Toggle Theme"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
};

export default Builder;
