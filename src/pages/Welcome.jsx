import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/builder");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">Welcome to DragNBuild 🚀</h1>
        <p className="text-lg mb-10 leading-relaxed">
          Effortlessly design your website by dragging and dropping elements. Whether you're a
          beginner or a pro, build stunning pages in minutes with our intuitive builder.
        </p>
        <button
          onClick={handleContinue}
          className="bg-white text-indigo-600 hover:bg-indigo-100 px-6 py-3 rounded-full font-semibold text-lg shadow transition duration-300"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Welcome;
