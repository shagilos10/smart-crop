import React, { useState } from 'react';

const CityAdmin = () => {
    const [districtAdmins, setDistrictAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ id: '', name: '' });

    const handleAddAdmin = () => {
        if (newAdmin.name.trim()) {
            setDistrictAdmins([...districtAdmins, { ...newAdmin, id: Date.now().toString() }]);
            setNewAdmin({ id: '', name: '' }); // Reset input
        }
    };

    const handleDeleteAdmin = (adminId) => {
        setDistrictAdmins(districtAdmins.filter(admin => admin.id !== adminId));
    };

    const handleEditAdmin = (adminId) => {
        const adminToEdit = districtAdmins.find(admin => admin.id === adminId);
        setNewAdmin(adminToEdit);
        handleDeleteAdmin(adminId); // Remove admin from list first
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
            <h1 className="text-2xl font-bold text-center mb-4">Manage District Admins</h1>
            <div className="flex mb-4">
                <input 
                    type="text" 
                    placeholder="District Admin Name" 
                    className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    value={newAdmin.name} 
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                />
                <button 
                    className="bg-green-600 text-white p-2 rounded-r-lg hover:bg-green-700 transition duration-200"
                    onClick={handleAddAdmin}
                >
                    Add District Admin
                </button>
            </div>
            <ul className="list-none">
                {districtAdmins.map(admin => (
                    <li className='flex justify-between items-center bg-gray-100 p-2 mb-2 rounded-md shadow-sm' key={admin.id}>
                        <span className="text-lg">{admin.name}</span>
                        <div>
                            <button 
                                className="bg-blue-600 text-white p-1 rounded mr-1 hover:bg-blue-700 transition duration-200" 
                                onClick={() => handleEditAdmin(admin.id)}
                            >
                                Edit
                            </button>
                            <button 
                                className="bg-red-600 text-white p-1 rounded hover:bg-red-700 transition duration-200" 
                                onClick={() => handleDeleteAdmin(admin.id)}
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

export default CityAdmin;