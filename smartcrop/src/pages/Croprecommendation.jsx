import React, { useState } from 'react';
import axios from 'axios';
 // Example icon from react-icons
import CropDetailCard from './CropCardDetail';
import image10 from '../assets/images/image10.png'

import { FaTemperatureHigh, FaTint, FaFlask, FaLeaf, FaSeedling, FaWater, FaCheckCircle } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing a warning icon from react-icons
const getSeason = () => {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) {
    return 'Spring';
  } else if (month >= 5 && month <= 7) {
    return 'Summer';
  } else if (month >= 8 && month <= 10) {
    return 'Fall';
  } else {
    return 'Winter';
  }
};
function CropRecommendationForm() {
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [ph, setPh] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [result, setResult] = useState(null);
 const [soil , setSoil] = useState(false);
 const [soilVar , setVar] = useState(false);
 const [tempVar , setTem] = useState(false);
 const [temp , setTemp] = useState(false);

 const crop = {
  name: 'Wheat',
  description: 'Wheat is a cereal grain that is a staple food in many parts of the world.',
  season: 'Winter',
  harvestTime: '3-4 months',
  yield: 'High',
};

   const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall };
    try {
      const res = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setResult(res.data.result);
    } catch (error) {
      console.error('Error making request:', error);
      setResult('Sorry, there was an error with the request.');
    }
  };
  const today = new Date();
  const currentDate = today.toLocaleDateString();
  const currentSeason = getSeason();
  return (
    <div className="min-h-screen bg-white   h-screen overflow-y-auto font-nunito rounded-md">
      <nav className=" text-emerald-600 rounded-full mt-4 py-4 text-3xl  bg-opacity-5 w-[60%] mx-auto">
        <div className="container mx-auto text-center ">
          <a className="font-Playfair text-2xl font-bold">
            Crop Recommendation System Using Machine Learning
          </a>
        </div>
      </nav>
  <div className="p-5 w-[85%]  mx-auto bg-gray-50 rounded-lg shadow-md">
      {/* Warning Box */}
      <div className="flex items-center mb-5">
        <FaExclamationTriangle className="text-orange-600 text-2xl mr-3" />
        <h2 className="text-orange-600 text-2xl font-semibold">Warning: Crop Selection</h2>
      </div>

      {/* Recommendation Text */}
      <p className="text-gray-600 text-base leading-relaxed mb-4">
        Based on Limited resource on data Set for Ethiopian soil conditions, the system recommends the following 20 most common crops in Ethiopia:
      </p>
  </div>
      <div className="container w-[90%] mx-auto mt-10 border border-white/20 p-8 rounded-lg">
        <form onSubmit={handleSubmit} className='grid grid-cols-3 gap-10 font-nunito'>
          {/* Soil Parameters Section */}
          {/* ?space-y-6 */}
          <div className=" max-w-80 p-10 border shadow-2xl border-green-600 h-72 rounded-md ">
            <button className="text-xl font-bold text-white border flex gap-3 p-2 mb-5 bg-green-600 rounded-md bg  w-[230px]" onClick={()=>{setSoil(!soil)}}>{soilVar&&<span><FaCheck></FaCheck></span>}<span>Soil Parameters</span></button>
            {soil&&<div className=" grid gap-6">
              <div className='bg-black bg-opacity-70 w-screen h-screen flex flex-col justify-center items-center absolute top-0 left-0'>
                <div className="bg-white p-4 rounded-md shadow-md">
                  <div className='flex justify-end '><span className='text-red-600 font-cursive text-4xl cursor-pointer' onClick={()=>{setSoil(false)}}>&times;</span></div>
              <div className="grid m-2 p-2">
                <label htmlFor="Nitrogen" className="text-lg text-slate-600 font-medium">
                  <FaFlask className="inline mr-2 text-slate-600" /> Nitrogen
                </label>
                <input
                  type="number"
                  id="Nitrogen"
                  name="Nitrogen"
                  placeholder="Enter Nitrogen"
                  className="h-10 bg-white border border-green-300 rounded-md px-4 tex700t-green- focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  required
                />
              </div>

              <div className="grid m-2 p-2">
                <label htmlFor="Phosphorus" className="text-lg text-slate-600 font-medium">
                  <FaSeedling className="inline mr-2 text-slate-600" /> Phosphorus
                </label>
                <input
                  type="number"
                  id="Phosphorus"
                  name="Phosphorus"
                  placeholder="Enter Phosphorus"
                  className="h-10 bg-white border border-green-300 rounded-md px-4 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  required
                />
              </div>

              <div className="grid m-2 p-2">
                <label htmlFor="Potassium" className="text-lg text-slate-600 font-medium">
                  <FaLeaf className="inline mr-2 text-slate-600" /> Potassium
                </label>
                <input
                  type="number"
                  id="Potassium"
                  name="Potassium"
                  placeholder="Enter Potassium"
                  className="h-10 bg-white border border-green-300 rounded-md px-4 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                  required
                />
              </div>

              <div className="grid m-2 p-2">
                <label htmlFor="pH" className="text-lg text-slate-600 font-medium">
                  <FaFlask className="inline mr-2 text-slate-600" /> pH
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="pH"
                  name="pH"
                  placeholder="Enter pH value"
                  className="h-10 bg-white border border-green-300 rounded-md px-4 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                  required
                />
              </div>
              <button className='text-lg font-bold text-gray-600 border p-2 mt-6 w-[80%] m-auto bg-green-600 rounded-md bg border-gray-600' onClick={()=>{setVar(true)}}>Finish</button>
              </div>
              </div>
            </div>}

            <button className="text-xl font-bold text-white border flex text-nowrap gap-3 p-2 bg-green-600 rounded-md bg w-[230px] " onClick={()=>{setTemp(!temp)}}>{tempVar&&<span><FaCheck></FaCheck></span>}<span>Climate Parameters</span></button>
            <div className="text-center mt-8">
            <button type="submit" className="text-xl font-bold border text-white flex text-nowrap gap-3 p-2 bg-green-600 rounded-md bg  w-[230px] ">
              Get Recommendation
            </button>
          </div>
          </div>

          {/* Climate Parameters Section */}
          {temp   && <div  className='bg-black bg-opacity-70 w-screen h-screen flex flex-col justify-center items-center absolute top-0 left-0 z-10'>
          <div className="grid gap-6 bg-white p-5 rounded-md">
              <div className='flex justify-end '><span className='text-red-600 font-cursive text-4xl cursor-pointer' onClick={()=>{setTemp(false)}}>&times;</span></div>
              <div className="grid">
                <label htmlFor="Temperature" className="text-lg text-slate-600 font-medium">
                  <FaTemperatureHigh className="inline mr-2 text-slate-600" /> Temperature
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="Temperature"
                  name="Temperature"
                  placeholder="Enter Temperature in °C"
                  className="h-10 bg-white border border-green-300 rounded-md px-4 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  required
                />
              </div>

              <div className="grid">
                <label htmlFor="Humidity" className="text-lg text-slate-600 font-medium">
                  <FaTint className="inline mr-2 text-slate-600" /> Humidity
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="Humidity"
                  name="Humidity"
                  placeholder="Enter Humidity in %"
                  className="h-10 bg-white border border-green-300 rounded-md px-4 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                  required
                />
              </div>

              <div className="grid">
                <label htmlFor="Rainfall" className="text-lg text-slate-600 font-medium">
                  <FaWater className="inline mr-2 text-slate-600" /> Rainfall
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="Rainfall"
                  name="Rainfall"
                  placeholder="Enter Rainfall in mm"
                  className="h-10 bg-white border border-green-300 rounded-md px-4 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  required
                />
              </div>
              <button className='text-lg font-bold text-gray-600 border p-2 m-4 bg-green-600 rounded-md bg border-gray-600' onClick={()=>{setTem(true)}}>Finish</button>
            </div>

          </div>}
          <div className="p-6  border border-green-600  shadow-2xl h-72 overflow-auto flex flex-col gap-6  rounded-lg ">
      <CropDetailCard crop={crop} />
    </div>
          <div
  className="p-6 border border-green-600 h-72 overflow-auto flex flex-col gap-2 rounded-lg relative"
  style={{
    scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none', // For Internet Explorer and Edge
    boxShadow: 'inset 0px -20px 10px -10px rgba(0, 0, 0, 0.6)', // Bottom inset shadow
  }}
>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10} className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10} className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10} className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10} className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
        <div className='flex gap-10 border border-slate-600 p-1 rounded-md items-center text-slate-600'><img src={image10}className='h-10 w-10 rounded-full'></img><div className='grid'><p>Raise</p><p className='text-xs'>Harvest Time: 3-4 months</p></div></div>
      
       
        {/* <h1 className="text-2xl font-bold text-gray-800">Current Date and Season</h1>
        <p className="mt-4 text-lg text-gray-600">Today is: {currentDate}</p>
        <p className="mt-2 text-lg text-gray-600">Current Season: {currentSeason}</p> */}
    </div>
   
        </form>

        {result && (
          <div className="mt-5 grid grid-cols-2 gap-6">
            <div className="p-6 border border-green-600 h-72 overflow-auto flex flex-col gap-2 rounded-lg relative ">
              <h5 className="text-lg font-semibold mb-3">Recommended Crop</h5>
              <p className="text-xl text-center text-green-900">{result}</p>
            </div>
            <div className="p-6 border border-green-600 h-72 overflow-auto flex flex-col gap-4 rounded-lg relative overflow-hidden shadow-lg bg-white">
      <h5 className="text-2xl font-semibold mb-3 text-gray-800">Fertilizer Suggestions</h5>
      
      <ul className="list-none pl-5 space-y-2">
        <li className="text-lg text-gray-600">Urea</li>
        <li className="text-lg text-gray-600">DAP (Diammonium Phosphate)</li>
        <li className="text-lg text-gray-600">Compost</li>
      </ul>

      <div className="text-center mt-6">
        <button className="text-lg font-bold text-white bg-green-600 hover:bg-green-600 transition-all duration-300 rounded-md py-2 px-6 border border-green-600 hover:border-green-600 flex items-center justify-center mx-auto">
          <FaCheckCircle className="inline mr-2 text-xl" />
          Approve Recommendation
        </button>
      </div>
    </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropRecommendationForm;
