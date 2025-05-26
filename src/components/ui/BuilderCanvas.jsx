import React, { useState, useRef } from "react";

const BuilderCanvas = ({ elements, setElements, selectedId, setSelectedId }) => {
  const canvasRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Mouse down on element to start drag
  const handleMouseDown = (e, id) => {
    e.stopPropagation(); // prevent deselect
    setSelectedId(id);

    const el = elements.find((el) => el.id === id);
    if (!el) return;

    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setDraggingId(id);
  };

  // Mouse move during drag
  const handleMouseMove = (e) => {
    if (!draggingId) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const el = elements.find((el) => el.id === draggingId);
    if (!el) return;

    let newX = e.clientX - canvasRect.left - dragOffset.x;
    let newY = e.clientY - canvasRect.top - dragOffset.y;

    // Clamp positions to keep element inside canvas boundaries
    newX = Math.max(0, Math.min(newX, canvasRect.width - el.width));
    newY = Math.max(0, Math.min(newY, canvasRect.height - el.height));

    setElements((prev) =>
      prev.map((el) =>
        el.id === draggingId
          ? {
              ...el,
              x: newX,
              y: newY,
            }
          : el
      )
    );
  };

  // Mouse up to stop drag
  const handleMouseUp = () => {
    setDraggingId(null);
  };

  // Clicking empty canvas area deselects any selected element
  const handleCanvasClick = () => {
    setSelectedId(null);
  };

  // Drop new element from palette on canvas
  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const newElement = {
      id: Date.now().toString(),
      type,
      content: type === "text" ? "New Text" : type === "button" ? "Button" : "",
      x,
      y,
      width: 150,
      height: 40,
      color: "#000000",
      backgroundColor: "#ffffff",
    };

    setElements((prev) => [...prev, newElement]);
  };

  return (
    <div
      ref={canvasRef}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="relative w-full h-full border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
      style={{ userSelect: "none" }}
    >
      {elements.map((el) => {
        const style = {
          position: "absolute",
          left: el.x,
          top: el.y,
          width: el.width,
          height: el.height,
          color: el.color,
          backgroundColor: el.backgroundColor,
          border: selectedId === el.id ? "2px solid blue" : "1px solid gray",
          padding: "4px",
          cursor: "move",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          userSelect: "none",
        };

        const handleClick = (e) => {
          e.stopPropagation();
          setSelectedId(el.id);
        };

        switch (el.type) {
          case "button":
            return (
              <button
                key={el.id}
                onClick={handleClick}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                style={{
                  ...style,
                  cursor: "move",
                  backgroundColor: el.backgroundColor,
                  color: el.color,
                  fontWeight: "600",
                  userSelect: "none",
                }}
                type="button"
              >
                {el.content || "Button"}
              </button>
            );
          case "input":
            return (
              <input
                key={el.id}
                onClick={handleClick}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                style={{
                  ...style,
                  cursor: "move",
                  backgroundColor: el.backgroundColor,
                  color: el.color,
                  paddingLeft: "8px",
                  userSelect: "text",
                }}
                value={el.content || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setElements((prev) =>
                    prev.map((item) =>
                      item.id === el.id ? { ...item, content: val } : item
                    )
                  );
                }}
                placeholder="Input"
              />
            );
          case "text":
          default:
            return (
              <div
                key={el.id}
                onClick={handleClick}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                style={{
                  ...style,
                  cursor: "move",
                  backgroundColor: el.backgroundColor,
                  color: el.color,
                  paddingLeft: "6px",
                  userSelect: "text",
                }}
                contentEditable={false}
              >
                {el.content}
              </div>
            );
        }
      })}
    </div>
  );
};

export default BuilderCanvas;
