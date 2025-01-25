// src/components/Farmers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FarmerCrud = () => {
    const [farmers, setFarmers] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location,setLocation]=useState('')
    const [admissionDate, setAdmissionDate] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [currentId, setCurrentId] = useState(null); // To track the ID of the farmer being edited

    const apiUrl = 'http://localhost:5000/api/farmers'; // Replace with your actual backend URL

    // Fetch farmers from the backend on component mount
    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const response = await axios.get(apiUrl);
                setFarmers(response.data);
            } catch (error) {
                console.error("Error fetching farmers:", error);
            }
        };
        fetchFarmers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const farmerData = { name, phone, admissionDate,Location };

        if (editIndex !== null) {
            // Update existing farmer
            try {
                await axios.put(`${apiUrl}/${currentId}`, farmerData);
                const updatedFarmers = farmers.map((farmer, index) =>
                    index === editIndex ? farmerData : farmer
                );
                setFarmers(updatedFarmers);
                setEditIndex(null);
                setCurrentId(null);
            } catch (error) {
                console.error("Error updating farmer:", error);
            }
        } else {
            // Add new farmer
            try {
                const response = await axios.post(apiUrl, farmerData);
                setFarmers([...farmers, response.data]);
            } catch (error) {
                console.error("Error adding farmer:", error);
            }
        }

        // Reset form fields
        setName('');
        setPhone('');
        setAdmissionDate('');
        setLocation('')
    };

    const handleEdit = (index) => {
        setName(farmers[index].name);
        setPhone(farmers[index].phone);
        setAdmissionDate(farmers[index].admissionDate);
        setLocation(farmers[index].Location);
        setEditIndex(index);
        setCurrentId(farmers[index]._id); // Set the ID for editing
    };

    const handleDelete = async (index) => {
        try {
            await axios.delete(`${apiUrl}/${farmers[index]._id}`);
            const updatedFarmers = farmers.filter((_, i) => i !== index);
            setFarmers(updatedFarmers);
        } catch (error) {
            console.error("Error deleting farmer:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Farmers List</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter farmer name"
                    className="border border-gray-300 p-2 rounded mr-2"
                    required
                />
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="border border-gray-300 p-2 rounded mr-2"
                    required
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter Location"
                    className="border border-gray-300 p-2 rounded mr-2"
                    required
                />
                <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    className="border border-gray-300 p-2 rounded mr-2"
                    required
                />
                <button type="submit" className="bg-green-600 text-white p-2 rounded">
                    {editIndex !== null ? 'Update Farmer' : 'Add Farmer'}
                </button>
            </form>
            <ul>
                {farmers.map((farmer, index) => (
                    <li key={farmer._id} className="flex justify-between items-center mb-2">
                        <span>{farmer.name} - {farmer.phone} -{farmer.Location} - {farmer.admissionDate}</span>
                        <div>
                            <button
                                onClick={() => handleEdit(index)}
                                className="bg-blue-500 text-white p-1 rounded mr-1"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 text-white p-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FarmerCrud;