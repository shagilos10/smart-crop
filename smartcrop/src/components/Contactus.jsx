// src/components/ContactUs.js
import React, { useState } from 'react';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", { name, email, message });
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <section className="p-6 bg-white" id="contact">
            <h2 className="text-2xl font-bold text-center mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded mb-4" 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded mb-4" 
                    required 
                />
                <textarea 
                    placeholder="Your Message" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded mb-4" 
                    required 
                />
                <button
                 type="submit"
                  className=" w-40 py-2 mt-4 text-white text-center bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
                >
                  Send Message
                </button>
            </form>
        </section>
    );
};

export default ContactUs;