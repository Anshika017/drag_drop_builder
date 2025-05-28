import React from "react";

const PropertiesPanel = ({ selectedElement, updateElement, darkMode = false }) => {
  if (!selectedElement) {
    return (
      <div
        style={{
          padding: 10,
          fontStyle: "italic",
          textAlign: "center",
          color: darkMode ? "#94a3b8" : "#6b7280",
        }}
      >
        Select an element to see its properties.
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = ["x", "y", "width", "height"].includes(name)
      ? Number(value)
      : value;
    updateElement(selectedElement.id, { [name]: newValue });
  };

  const inputStyle = {
    width: "100%",
    marginTop: 4,
    marginBottom: 12,
    padding: "6px 8px",
    borderRadius: 4,
    border: `1px solid ${darkMode ? "#475569" : "#cbd5e1"}`,
    backgroundColor: darkMode ? "#1e293b" : "#fff",
    color: darkMode ? "#f8fafc" : "#000",
  };

  return (
    <div
      style={{
        padding: 15,
        border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
        borderRadius: 6,
        width: "100%",
        maxWidth: 280,
        backgroundColor: darkMode ? "#0f172a" : "#f9fafb",
        color: darkMode ? "#f1f5f9" : "#111827",
        fontFamily: "Arial, sans-serif",
      }}
    >

      {/* Content (for text-like elements) */}
      {["button", "input", "text"].includes(selectedElement.type) && (
        <label style={{ fontSize: 13, display: "block" }}>
          Content:
          <input
            type="text"
            name="content"
            value={selectedElement.content ?? ""}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>
      )}

      {/* Position X */}
      <label style={{ fontSize: 13, display: "block" }}>
        Position X:
        <input
          type="number"
          name="x"
          value={selectedElement.x ?? 0}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      {/* Position Y */}
      <label style={{ fontSize: 13, display: "block" }}>
        Position Y:
        <input
          type="number"
          name="y"
          value={selectedElement.y ?? 0}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      {/* Width */}
      <label style={{ fontSize: 13, display: "block" }}>
        Width:
        <input
          type="number"
          name="width"
          value={selectedElement.width ?? 100}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      {/* Height */}
      <label style={{ fontSize: 13, display: "block" }}>
        Height:
        <input
          type="number"
          name="height"
          value={selectedElement.height ?? 30}
          onChange={handleChange}
          style={inputStyle}
        />
      </label>

      {/* Text Color */}
      <label style={{ fontSize: 13, display: "block" }}>
        Text Color:
        <input
          type="color"
          name="color"
          value={selectedElement.color || "#000000"}
          onChange={handleChange}
          style={{
            marginTop: 4,
            marginBottom: 12,
            width: "100%",
            height: 30,
            border: "none",
            backgroundColor: "transparent",
          }}
        />
      </label>

      {/* Background Color */}
      <label style={{ fontSize: 13, display: "block" }}>
        Background Color:
        <input
          type="color"
          name="backgroundColor"
          value={selectedElement.backgroundColor || "#ffffff"}
          onChange={handleChange}
          style={{
            marginTop: 4,
            width: "100%",
            height: 30,
            border: "none",
            backgroundColor: "transparent",
          }}
        />
      </label>
    </div>
  );
};

export default PropertiesPanel;
