// src/OtpVerification.js
import React, { useState } from 'react';

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!otp) {
            setError('Please enter the OTP.');
            return;
        }

        // Simulate OTP verification
        // Replace this with your API call to verify the OTP
        const validOtp = "123456"; // Example valid OTP for simulation
        if (otp === validOtp) {
            setMessage('OTP verified successfully!');
            setError('');
            // Proceed to the next step (e.g., redirect to reset password page)
        } else {
            setError('Invalid OTP. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-xl font-bold text-center mb-4">OTP Verification</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        placeholder="Enter your OTP" 
                        className="w-full p-2 border border-gray-300 rounded-md mb-4" 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-green-700 text-white p-2 rounded-md hover:bg-green-800 transition duration-200"
                    >
                        Verify OTP
                    </button>
                </form>
                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>
    );
};

export default OtpVerification;