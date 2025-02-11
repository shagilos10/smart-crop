import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityAdmin = () => {
  // State for registering district admin
  const [adminData, setAdminData] = useState({
    username: '',
    email: '',
    password: '',
    districtId: '',
  });

  // State for creating district
  const [districtData, setDistrictData] = useState({
    name: '',
    location: '',
  });

  // State for listing districts
  const [districts, setDistricts] = useState([]);

  // Handle input changes for admin registration
  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  // Handle input changes for district creation
  const handleDistrictChange = (e) => {
    const { name, value } = e.target;
    setDistrictData({ ...districtData, [name]: value });
  };

  // Register district admin
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/cadmin/register-district-admin', adminData);
      alert(response.data.message);
      setAdminData({ username: '', email: '', password: '', districtId: '' }); // Reset form
    } catch (error) {
      console.error('Error registering district admin:', error);
      alert(error.response.data.message);
    }
  };

  // Create district
  const handleDistrictSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/cadmin/create-district', districtData, {
        headers: { Authorization: `Bearer ${token}` }, // Replace with actual token
      });
      alert('District created successfully!');
      setDistrictData({ name: '', location: '' }); // Reset form
    } catch (error) {
      console.error('Error creating district:', error);
      alert(error.response.data.message);
    }
  };

  // Fetch districts and admins
  useEffect(() => {
    const fetchDistrictAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cadmin/get-district-admins', {
          headers: { Authorization: `Bearer ${token}` }, // Replace with actual token
        });
        setDistricts(response.data.districts);
      } catch (error) {
        console.error('Error fetching district admins:', error);
      }
    };

    fetchDistrictAdmins();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">City Administration Dashboard</h1>

      {/* Register District Admin */}
      <form onSubmit={handleAdminSubmit} className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Register District Admin</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={adminData.username}
          onChange={handleAdminChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={adminData.email}
          onChange={handleAdminChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={adminData.password}
          onChange={handleAdminChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="districtId"
          placeholder="District ID"
          value={adminData.districtId}
          onChange={handleAdminChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 transition"
        >
          Register
        </button>
      </form>

      {/* Create District */}
      <form onSubmit={handleDistrictSubmit} className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Create District</h2>
        <input
          type="text"
          name="name"
          placeholder="District Name"
          value={districtData.name}
          onChange={handleDistrictChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={districtData.location}
          onChange={handleDistrictChange}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-500 transition"
        >
          Create District
        </button>
      </form>

      {/* List Districts and Their Admins */}
      <div>
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Districts and Their Admins</h2>
        <ul className="space-y-4">
          {districts.map(district => (
            <li key={district.districtId} className="p-4 bg-white rounded-lg shadow">
              <h3 className="text-xl font-bold">{district.name}</h3>
              <p className="text-gray-700">Location: {district.location}</p>
              {district.admin ? (
                <div>
                  <p className="text-gray-800">Admin Username: {district.admin.username}</p>
                  <p className="text-gray-800">Admin Email: {district.admin.email}</p>
                </div>
              ) : (
                <p className="text-gray-600">No admin assigned.</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityAdmin;