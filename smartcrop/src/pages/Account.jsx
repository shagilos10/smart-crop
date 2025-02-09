import React, { useState } from "react";

const AccountPage = () => {
  const [user, setUser] = useState({
    name: "Ayele Kebebe",
    email: "website@example.com",
    phone: "0909090909",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      console.log("Password changed to:", newPassword);
      // Add logic to update the password
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Account deleted");
      // Add logic to delete the account
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Account Settings</h2>

      {/* Account Information Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Account Information</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Name:</p>
            <p className="text-gray-600">{user.name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Email:</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Phone:</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        </div>
      </section>

      {/* Change Password Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your new password"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Change Password
            </button>
          </div>
        </form>
      </section>

      {/* Two-Factor Authentication Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Two-Factor Authentication</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Enable Two-Factor Authentication</p>
          <button
            onClick={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
            className={`px-4 py-2 text-white rounded-md ${
              isTwoFactorEnabled ? "bg-lime-500" : "bg-gray-500"
            }`}
          >
            {isTwoFactorEnabled ? "Enabled" : "Enable"}
          </button>
        </div>
        {isTwoFactorEnabled && (
          <p className="text-gray-600 mt-2">Two-factor authentication is now enabled for your account.</p>
        )}
      </section>

      {/* Delete Account Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-red-600">Delete Account</h3>
        <button
          onClick={handleDeleteAccount}
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete My Account
        </button>
        {isDeleting && <p className="text-red-600 mt-2">This action cannot be undone.</p>}
      </section>
    </div>
  );
};

export default AccountPage;
