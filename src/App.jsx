import React, { useState, useEffect } from "react";
import Builder from "./pages/Builder";

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
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="w-full h-full overflow-hidden bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <Builder darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;
