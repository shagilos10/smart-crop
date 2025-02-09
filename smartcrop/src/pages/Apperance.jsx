import React, { useState } from "react";

const AppearancePage = () => {
  // State to manage theme, font, and layout
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("sans-serif");
  const [fontSize, setFontSize] = useState("medium");
  const [layout, setLayout] = useState("default");
  const [accentColor, setAccentColor] = useState("#4CAF50");

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleFontChange = (newFont) => {
    setFont(newFont);
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleAccentColorChange = (color) => {
    setAccentColor(color);
  };

  return (
    <div className="p-6 mx-auto shadow-lg rounded-lg max-w-4xl">
      <h2 className="text-2xl font-bold text-center mb-6">Appearance Settings</h2>

      {/* Theme Section */}
      <div className="mb-6  border border-lime-500 p-2 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Theme</h3>
        <p className="text-gray-600 mb-2">Choose the theme for your application:</p>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              theme === "light" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleThemeChange("light")}
          >
            Light
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              theme === "dark" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleThemeChange("dark")}
          >
            Dark
          </button>
        </div>
      </div>

      {/* Font Settings Section */}
      <div className="mb-6  border border-lime-500 p-2 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Font Settings</h3>
        <p className="text-gray-600 mb-2">Choose your preferred font family:</p>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              font === "sans-serif" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleFontChange("sans-serif")}
          >
            Sans-serif
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              font === "serif" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleFontChange("serif")}
          >
            Serif
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              font === "monospace" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleFontChange("monospace")}
          >
            Monospace
          </button>
        </div>
      </div>

      {/* Font Size Section */}
      <div className="mb-6  border border-lime-500 p-2 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Font Size</h3>
        <p className="text-gray-600 mb-2">Choose your preferred font size:</p>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              fontSize === "small" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleFontSizeChange("small")}
          >
            Small
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              fontSize === "medium" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleFontSizeChange("medium")}
          >
            Medium
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              fontSize === "large" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleFontSizeChange("large")}
          >
            Large
          </button>
        </div>
      </div>

      {/* Layout Settings Section */}
      <div className="mb-6  border border-lime-500 p-2 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Layout Settings</h3>
        <p className="text-gray-600 mb-2">Choose your preferred layout:</p>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              layout === "default" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleLayoutChange("default")}
          >
            Default
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              layout === "compact" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleLayoutChange("compact")}
          >
            Compact
          </button>
        </div>
      </div>

      {/* Accent Color Section */}
      <div className="mb-6 border-lime-500 p-2 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Accent Color</h3>
        <p className="text-gray-600 mb-2">Choose your preferred accent color:</p>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 rounded-lg bg-green-500 text-white"
            onClick={() => handleAccentColorChange("#4CAF50")}
            style={{ backgroundColor: accentColor === "#4CAF50" ? "#388E3C" : "#4CAF50" }}
          >
            Green
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
            onClick={() => handleAccentColorChange("#2196F3")}
            style={{ backgroundColor: accentColor === "#2196F3" ? "#1976D2" : "#2196F3" }}
          >
            Blue
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white"
            onClick={() => handleAccentColorChange("#F44336")}
            style={{ backgroundColor: accentColor === "#F44336" ? "#D32F2F" : "#F44336" }}
          >
            Red
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-6 border-lime-500 p-2 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Preview</h3>
        <div
          className="p-6 border-2 rounded-lg"
          style={{
            fontFamily: font,
            fontSize: fontSize === "small" ? "12px" : fontSize === "medium" ? "16px" : "20px",
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            borderColor: accentColor,
          }}
        >
          <h4 className="font-bold">This is a preview</h4>
          <p>This is how your settings will look on the page. Feel free to customize and see the changes in real-time.</p>
        </div>
      </div>
    </div>
  );
};

export default AppearancePage;
