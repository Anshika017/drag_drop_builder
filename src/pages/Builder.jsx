import React, { useState, useMemo } from "react";
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

  const selectedElement = useMemo(
    () => elements.find((el) => el.id === selectedId),
    [elements, selectedId]
  );

  const panelHeight = 500;

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

      {/* Top panel with horizontal margin */}
      <div className="mx-6 flex justify-between items-center h-14 px-4 py-[2px] bg-white dark:bg-slate-800 border-b border-gray-300 dark:border-slate-700">
  <h3 className="text-xl font-extrabold select-none ml-6 tracking-wide">
    DragNBuild
  </h3>

  <button
    onClick={toggleDarkMode}
    className="bg-indigo-600 dark:bg-indigo-400 text-white dark:text-gray-900 px-4 py-1 my-[2px] rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-500 transition-colors text-sm"
    aria-label="Toggle Dark Mode"
  >
    {darkMode ? "☀️ Light" : "🌙 Dark"}
  </button>
</div>


      {/* Main Builder Area fills remaining height */}
      <main className="flex flex-1 overflow-hidden">

        {/* Element Palette */}
        <aside className="w-1/5 min-w-[220px] bg-white dark:bg-slate-800 border-r border-gray-300 dark:border-slate-700 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6 text-center border-b border-gray-300 dark:border-slate-700 pb-2">
            🎨 Element Palette
          </h2>
          <ElementPalette onDragStart={onDragStart} />
        </aside>

        {/* Canvas */}
        <section className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 flex flex-col items-center overflow-auto">
          <h2 className="text-lg font-semibold mb-6 text-center border-b border-gray-300 dark:border-slate-700 w-full pb-2">
            🧲 Canvas
          </h2>
          <BuilderCanvas
            elements={elements}
            setElements={setElements}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            canvasHeight={panelHeight}
          />
        </section>

        {/* Properties Panel */}
        <aside className="w-1/4 min-w-[280px] bg-white dark:bg-slate-800 border-l border-gray-300 dark:border-slate-700 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6 text-center border-b border-gray-300 dark:border-slate-700 pb-2">
            ⚙️ Properties
          </h2>
          <PropertiesPanel
            selectedElement={selectedElement}
            updateElement={updateElement}
            darkMode={darkMode}
          />
        </aside>
      </main>
    </div>
  );
};

export default Builder;
