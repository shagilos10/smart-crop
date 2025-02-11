import React, { useState } from "react";

const PrivacyPage = () => {
  const [dataVisibility, setDataVisibility] = useState("Public");
  const [shareActivity, setShareActivity] = useState(false);
  const [useLocationData, setUseLocationData] = useState(false);

  const handleDataVisibilityChange = (visibility) => setDataVisibility(visibility);
  const handleShareActivityToggle = () => setShareActivity(!shareActivity);
  const handleUseLocationDataToggle = () => setUseLocationData(!useLocationData);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Privacy Settings</h2>

      {/* Data Visibility */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Data Visibility</h3>
        <div className="space-x-4">
          <button
            onClick={() => handleDataVisibilityChange("Public")}
            className={`px-4 py-2 rounded-full ${
              dataVisibility === "Public" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Public
          </button>
          <button
            onClick={() => handleDataVisibilityChange("Private")}
            className={`px-4 py-2 rounded-full ${
              dataVisibility === "Private" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Private
          </button>
        </div>
      </div>

      {/* Activity Sharing */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Activity Sharing</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Share My Activity</span>
          <button
            onClick={handleShareActivityToggle}
            className={`px-4 py-2 rounded-full ${
              shareActivity ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {shareActivity ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Location Data */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Location Data</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Allow Access to Location Data</span>
          <button
            onClick={handleUseLocationDataToggle}
            className={`px-4 py-2 rounded-full ${
              useLocationData ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {useLocationData ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Privacy Policy</h3>
        <p className="text-gray-600">
          We value your privacy. Please review our <a href="#" className="text-blue-500">Privacy Policy</a> for more information.
        </p>
      </div>

      {/* Save Privacy Settings */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
};

export default PrivacyPage;
