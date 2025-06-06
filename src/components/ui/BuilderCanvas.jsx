import React, { useState, useRef } from "react";

const BuilderCanvas = ({ elements, setElements, selectedId, setSelectedId }) => {
  const canvasRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, id) => {
    e.stopPropagation();
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

  const handleMouseMove = (e) => {
    if (!draggingId) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const el = elements.find((el) => el.id === draggingId);
    if (!el) return;

    let newX = e.clientX - canvasRect.left - dragOffset.x;
    let newY = e.clientY - canvasRect.top - dragOffset.y;

    newX = Math.max(0, Math.min(newX, canvasRect.width - el.width));
    newY = Math.max(0, Math.min(newY, canvasRect.height - el.height));

    setElements((prev) =>
      prev.map((el) =>
        el.id === draggingId
          ? { ...el, x: newX, y: newY }
          : el
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleCanvasClick = () => {
    setSelectedId(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const newElement = {
      id: Date.now().toString(),
      type,
      x,
      y,
      width: type === "image" ? 150 : 150,
      height: type === "image" ? 100 : 40,
      color: "#000000",
      backgroundColor: "#ffffff",
      content: type === "text" ? "New Text" : type === "button" ? "Button" : "",
      src: type === "image" ? "/default.jpg" : undefined,
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
                  fontWeight: "600",
                }}
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

          case "image":
            return (
              <img
                key={el.id}
                src={el.src}
                alt="Image"
                onClick={handleClick}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                style={{
                  ...style,
                  objectFit: "cover",
                  padding: 0,
                  borderRadius: "6px",
                }}
                draggable={false}
              />
            );

          case "text":
          default:
            return (
              <div
                key={el.id}
                onClick={handleClick}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                style={style}
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
