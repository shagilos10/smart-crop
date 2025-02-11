// src/ForgotPassword.js
import React, { useState } from 'react';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        // Simulate sending the reset link
        // Replace this with your API call to send the OTP
        setTimeout(() => {
            setMessage('A password reset link has been sent to your email address.');
            setEmail('');
            setError('');
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-xl font-bold text-center mb-4">Forgot Password?</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email address" 
                        className="w-full p-2 border border-gray-300 rounded-md mb-4" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-green-700 text-white p-2 rounded-md hover:bg-green-800 transition duration-200"
                    >
                        Send OTP
                    </button>
                </form>
                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default ForgotPass;