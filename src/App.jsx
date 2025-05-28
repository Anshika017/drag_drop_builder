import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Builder from "./pages/Builder";
import Welcome from "./pages/Welcome";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <Router basename="/drag_drop_builder">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/builder"
            element={<Builder darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
