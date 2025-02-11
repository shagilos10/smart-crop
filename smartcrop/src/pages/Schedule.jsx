import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Schedule = () => {
  // Sample data for farmers' schedules including fertilizer names
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateCompletion = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter((value) => value.trim() !== "").length;
    return Math.round((filledFields / totalFields) * 100);
  };

  const completionPercentage = calculateCompletion();
  const [farmersQueue] = useState([
    {
      id: 1,
      name: "John Doe",
      meetingDate: "2024-11-30",
      fertilizerDeliveryDate: "2024-12-05",
      operationDate: "2024-12-01",
      fertilizerName: "Nitrogen Fertilizer",
      operationName: "Soil Preparation",
    },
    {
      id: 2,
      name: "Jane Smith",
      meetingDate: "2024-12-02",
      fertilizerDeliveryDate: "2024-12-06",
      operationDate: "2024-12-03",
      fertilizerName: "Phosphorus Fertilizer",
      operationName: "Seeding",
    },
    {
      id: 3,
      name: "Carlos Perez",
      meetingDate: "2024-12-04",
      fertilizerDeliveryDate: "2024-12-07",
      operationDate: "2024-12-05",
      fertilizerName: "Potassium Fertilizer",
      operationName: "Harvesting",
    },
  ]);

  return (
    <div className="container mx-auto  p-5 grid grid-cols-2 gap-10 my-10">


      <div className="overflow-x-auto mb-8">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Operation Schedule</h3>
        <table className="min-w-full backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_100vw_#1e8449] shadow-lg rounded-lg">
          <thead className="bg-yellow-700 text-white font-nunito">
            <tr>
              <th className="py-3 px-6 text-left">Farmer Name</th>
              <th className="py-3 px-6 text-left">Operation Date</th>
              <th className="py-3 px-6 text-left">Operation Name</th>
            </tr>
          </thead>
          <tbody>
            {farmersQueue.map((farmer) => (
              <tr key={farmer.id} className="border-t">
                <td className="py-3 px-6 text-left font-nunito text-yellow-400">{farmer.name}</td>
                <td className="py-3 px-6 text-left font-nunito text-yellow-400">{farmer.operationDate}</td>
                <td className="py-3 px-6 text-left font-nunito text-yellow-400">{farmer.operationName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Second Table: Fertilizer details */}
      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Fertilizer Schedule</h3>
        <table className="min-w-full backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_100vw_#1e8449]   rounded-lg">
          <thead className="bg-yellow-700 text-white font-nunito">
            <tr>
              <th className="py-3 px-6 text-left font-nunito ">Farmer Name</th>
              <th className="py-3 px-6 text-left font-nunito ">Fertilizer Delivery Date</th>
              <th className="py-3 px-6 text-left font-nunito ">Fertilizer Name</th>
            </tr>
          </thead>
          <tbody>
            {farmersQueue.map((farmer) => (
              <tr key={farmer.id} className="border-t">
                <td className="py-3 px-6 text-left font-nunito text-yellow-400">{farmer.name}</td>
                <td className="py-3 px-6 text-left font-nunito text-yellow-400">{farmer.fertilizerDeliveryDate}</td>
                <td className="py-3 px-6 text-left font-nunito text-yellow-400">{farmer.fertilizerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    <div className='rounded-md grid grid-cols-4 gap-10 col-span-2'>
      <div className='backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_300px_#1e8449 rounded-md p-4'>
         <h1 className='font-nunito text-green-600'>Current Farmer Turn</h1>
         <span className='font-nunito text-green-400'>Ayele Mulugeta </span>
      </div>
      <div className='backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_300px_#1e8449 rounded-md p-4'>
         <h1 className='font-nunito text-yellow-600'>Last Farmer Turn</h1>
         <span className='font-nunito text-yellow-400'>Ayele Mulugeta </span>
      </div>
      <div className='backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_300px_#1e8449 rounded-md p-4'>
         <h1 className='font-nunito text-yellow-600'>Next Farmer Turn</h1>
         <span className='font-nunito text-yellow-400'>Ayele Mulugeta </span>
      </div>
      <div className='backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_300px_#1e8449 rounded-md p-4'>
         <h1 className='font-nunito text-yellow-600'>Number of  Farmers </h1>
         <span className='font-nunito text-yellow-400'>45</span>
      </div>
    </div>
    <div className='rounded-md py-14  grid p-6 box-border backdrop-blur-md shadow-[inset_0_0_30px_#191d11, _0_0_50px_#191d11  text-3xl'>
      <span className='block text-yellow-900 font-nunito '>Important Note</span>
      <p className='font-nunito text-center text-yellow-700 backdrop-blur-md shadow-[inset_0_0_30px_#191d11, _0_0_50px_#191d11'>operation performed time always Morning </p>
    </div>
    <div className='rounded-md py-14  grid p-6 box-border backdrop-blur-md shadow-[inset_0_0_30px_#191d11, _0_0_50px_#191d11  text-3xl'>
      <span className='block text-yellow-900 font-nunito '>completion div </span>
      <p className='font-nunito text-center text-yellow-700 backdrop-blur-md shadow-[inset_0_0_30px_#191d11, _0_0_50px_#191d11'>operation performed time always Morning </p>
    </div>
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Profile Completion</h1>
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Place:</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="w-40">
        <CircularProgressbar
          value={completionPercentage}
          text={`${completionPercentage}%`}
          styles={buildStyles({
            textColor: "#4A90E2",
            pathColor: "#4A90E2",
            trailColor: "#d6d6d6",
          })}
        />
      </div>
    </div>
    </div>
  );
};

export default Schedule;
