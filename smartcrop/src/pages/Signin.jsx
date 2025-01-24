import React, { useState } from 'react';
import logo from '/src/assets/images/g16.svg'
import '../styles/styles.css'
import {Link} from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <div className='flex justify-center items-center'>
          <div><img src={logo} alt="logo" className='w-16 h-auto'/></div>
          <div><h2 className="text-2xl font-bold text-center">Smart <span className="custom-green" >Crop</span></h2></div>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">


          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
          >
            Sign In
          </button>

          <div className="flex justify-center">
            <p><Link to="/forgotpassword">Forgot your password?</Link></p>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Signup;
