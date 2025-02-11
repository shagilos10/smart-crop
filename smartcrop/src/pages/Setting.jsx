import React, { useState } from "react";
import Notification from "./Notifications";
import AppearancePage from "./Apperance";
import PrivacyPage from "./Privacy";
import HelpAndSupportPage from "./HelpAndSuportPage";
import AccountPage from "./Account";




// Main Settings Page Component
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountPage />;
      case "notification":
        return <Notification />;
      case "appearance":
        return <AppearancePage />;
      case "privacy":
        return <PrivacyPage />;
      case "help":
        return <HelpAndSupportPage />;
     
      default:
        return <Account />;
    }
  };

  return (
    <div className="p-6 mx-auto h-screen overflow-y-auto shadow-lg bg-white  rounded-lg px-10">
      <h2 className="text-2xl font-bold text-center mb-4">Settings</h2>

      {/* Tab Navigation */}
      <div className="flex justify-around text-lg">
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "account" ? "bg-green-700 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("account")}
        >
          Account
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "notification" ? "bg-green-700 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("notification")}
        >
          Notification
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "appearance" ? "bg-green-700 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("appearance")}
        >
          Appearance
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "privacy" ? "bg-green-700 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("privacy")}
        >
          Privacy & Accuracy
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activeTab === "help" ? "bg-green-700 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("help")}
        >
          Help & Support
        </button>
      
      </div>

      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsPage;
