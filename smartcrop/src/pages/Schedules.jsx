import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProfileCompletion = ({ name, fatherName , completionPercentage }) => {
  const formData = { name, fatherName };
  
  // const calculateCompletion = () => {
  //   const totalFields = Object.keys(formData).length;
  //   const filledFields = Object.values(formData).filter((value) => value.trim() !== "").length;
  //   return Math.round((filledFields / totalFields) * 100);
  // };

  // const completionPercentage = calculateCompletion();

  return (
    <div className="flex items-center font-nunito  rounded-lg shadow-md px-4  w-[80%] mx-auto">
      {/* Progress indicator */}
      <div className="w-14 h-14">
        <CircularProgressbar
          value={completionPercentage}
          text={`${completionPercentage}%`}
          styles={buildStyles({
            
              textColor: "#08a40f",       // green Green for text
              pathColor: "#32CD32",       // green Green for path
              trailColor: "#E8F5E9"       // Light green for trail
          
          })
    }
        />
      </div>

      {/* Details */}
      <div className="ml-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Name: <span className="font-normal">{name}</span>
        </h2>
        <h2 className="text-lg font-semibold text-gray-800 mt-2">
          Father's Name: <span className="font-normal">{fatherName}</span>
        </h2>
      </div>
    </div>
  );
};

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
    <div className="container bg-white px-10 py-10 box-border mx-auto h-screen overflow-y-auto mt-0 grid grid-cols-2  gap-10 my-10">


      <div className=" mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Operation Schedule</h3>
        <table className="min-w-full backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_100vw_#1e8449] shadow-lg rounded-lg">
          <thead className="bg-green-700 text-white font-nunito">
            <tr>
              <th className="py-3 px-6 text-left">Farmer Name</th>
              <th className="py-3 px-6 text-left">Operation Date</th>
              <th className="py-3 px-6 text-left">Operation Name</th>
            </tr>
          </thead>
          <tbody>
            {farmersQueue.map((farmer) => (
              <tr key={farmer.id} className="border-t">
                <td className="py-3 px-6 text-left font-nunito text-green-700">{farmer.name}</td>
                <td className="py-3 px-6 text-left font-nunito  text-green-700">{farmer.operationDate}</td>
                <td className="py-3 px-6 text-left font-nunito  text-green-700">{farmer.operationName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='rounded-md grid grid-cols-2 gap-10'>
      <div className='backdrop-blur-md bg-green-200 shadow-[inset_0_0_calc(10px)_#191d11, _0_0_300px_#1e8449 rounded-md p-4'>
         <h1 className='font-nunito text-green-700'>Current Farmer Turn</h1>
         <span className='font-nunito text-green-700'>Ayele Mulugeta </span>
      </div>
      <div className='backdrop-blur-md bg-green-200 shadow-[inset_0_0_calc(10px)_#191d11, _0_0_300px_#1e8449 rounded-md p-4'>
         <h1 className='font-nunito text-green-700'>Last Farmer Turn</h1>
         <span className='font-nunito text-green-700'>Ayele Mulugeta </span>
      </div>
      <div className='backdrop-blur-md bg-green-200 shadow-[inset_0_0_calc(10px)_#191d11, _0_0_300px_#1e8449 rounded-md p-4'>
         <h1 className='font-nunito text-green-700'>Next Farmer Turn</h1>
         <span className='font-nunito text-green-700'>Ayele Mulugeta </span>
      </div>
      <div className='backdrop-blur-md bg-green-200 shadow-[inset_0_0_calc(10px)_#191d11, _0_0_300px_#1e8449 rounded-md p-4'>
         <h1 className='font-nunito text-green-700'>Number of  Farmers </h1>
         <span className='font-nunito text-green-700'>45</span>
      </div>
    </div>
      {/* Second Table: Fertilizer details */}
      <div className="">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Fertilizer Schedule</h3>
        <table className="min-w-full backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_100vw_#1e8449]   rounded-lg">
          <thead className=" bg-green-700 text-white font-nunito">
            <tr>
              <th className="py-3 px-6 text-left font-nunito ">Farmer Name</th>
              <th className="py-3 px-6 text-left font-nunito ">Fertilizer Delivery Date</th>
              <th className="py-3 px-6 text-left font-nunito ">Fertilizer Name</th>
            </tr>
          </thead>
          <tbody>
            {farmersQueue.map((farmer) => (
              <tr key={farmer.id} className="border-t">
                <td className="py-3 px-6 text-left font-nunito  text-green-700">{farmer.name}</td>
                <td className="py-3 px-6 text-left font-nunito  text-green-700">{farmer.fertilizerDeliveryDate}</td>
                <td className="py-3 px-6 text-left font-nunito  text-green-700">{farmer.fertilizerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     

    <div className='row-span-4 h-fit grid backdrop-blur-md shadow-[inset_0_0_0_calc910px)_#191d11, _0_0_300px_#1e8449 '>
    <ProfileCompletion name="John Doe" fatherName="Richard Roe" completionPercentage={45}/>
    <ProfileCompletion name="John Doe" fatherName="Richard Roe" completionPercentage={65} />
    <ProfileCompletion name="John Doe" fatherName="Richard Roe" completionPercentage={85}/>
    <ProfileCompletion name="John Doe" fatherName="Richard Roe" completionPercentage={45} />
    <ProfileCompletion name="John Doe" fatherName="Richard Roe" completionPercentage={85}/>
    </div>
    <div className='rounded-md col-span-2 py-14  grid p-6 box-border backdrop-blur-md shadow-[inset_0_0_30px_#191d11, _0_0_50px_#191d11  text-3xl'>
      <span className='block text-yellow-900 font-nunito '>Important Note</span>
      <p className='font-nunito text-center text-yellow-700 backdrop-blur-md shadow-[inset_0_0_30px_#191d11, _0_0_50px_#191d11'>operation performed time always Morning </p>
    </div>
    
   
    </div>
  );
};

export default Schedule;
