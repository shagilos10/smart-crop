// src/ChangePassword.js
import React, { useState } from 'react';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();


        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        // Simulate password change
        // Replace this with your API call to change the password
        setTimeout(() => {
            setMessage('Password changed successfully!');
            setError('');
            setNewPassword('');
            setConfirmPassword('');
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-xl font-bold text-center mb-4">Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="New Password" 
                        className="w-full p-2 border border-gray-300 rounded-md mb-4" 
                        required 
                    />
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm New Password" 
                        className="w-full p-2 border border-gray-300 rounded-md mb-4" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-green-700 text-white p-2 rounded-md hover:bg-green-800 transition duration-200"
                    >
                        Change Password
                    </button>
                </form>
                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default ChangePassword;