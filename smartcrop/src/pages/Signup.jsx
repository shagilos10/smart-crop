import React, { useState } from 'react';
import logo from '/src/assets/images/g16.svg';
import '../styles/styles.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported for API calls

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cityName: '',
    state: '',
    country: '',
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/cadmin/register', formData);
      console.log('Registration successful:', response.data);
      navigate('/signin')
      // You can redirect or show a success message here
    } catch (error) {
      console.error('Error registering city admin:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <div className='flex justify-center items-center'>
          <div><img src={logo} alt="logo" className='w-16 h-auto'/></div>
          <div><h2 className="text-2xl font-bold text-center">Smart <span className="custom-green">Crop</span></h2></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
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
          <div>
            <label htmlFor="cityName" className="block text-sm font-medium text-gray-700">
              City Name
            </label>
            <input
              type="text"
              id="cityName"
              name="cityName"
              value={formData.cityName}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
          <p>By creating an account, you agree to our Terms and have read and acknowledge the Privacy Policy.</p>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-green-700 rounded-md hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-300"
          >
            Sign Up
          </button>

          <div className="flex justify-center">
            <p>Already have an account? <Link to="/signin"><span className="text-green-600">Sign in.</span></Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;