// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-green-600 text-white p-6">
            <div className="container mx-auto text-center">
                <div className="mb-4">
                    <h3 className="text-lg font-bold">SMART CROP</h3>
                    <p className="text-sm">Empowering farmers with technology.</p>
                </div>
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="#home" className="hover:underline">Home</a>
                    <a href="#about" className="hover:underline">About Us</a>
                    <a href="#services" className="hover:underline">Services</a>
                    <a href="#contact" className="hover:underline">Contact</a>
                </div>
                <p className="text-xs">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;