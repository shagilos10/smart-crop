import React, { useState } from 'react';
import axios from 'axios';
import { useAsyncError } from 'react-router-dom';

const PlantSicknessForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [plantType, setPlantType] = useState('');
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [notification, setNotification] = useState('');
  const [gridCell, setGridCell] = useState({ row: null, col: null });
const [visible , setVisble] = useState(true)
  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handlePlantTypeChange = (event) => {
    setPlantType(event.target.value);
  };

  const getLocation = () => {
    setVisble(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({ latitude: lat, longitude: lon });

        // Corrected Grid Cell Calculation
        const row = Math.floor((15 - lat) / (12 / 12)); // Flip latitude indexing
        const col = Math.floor((lon - 33) / (15 / 15)); // Longitude indexing
        setGridCell({ row, col });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage || !plantType || !location.latitude || !location.longitude) {
      setNotification('Please provide all required fields: photo, plant type, and location.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('plantType', plantType);
    formData.append('latitude', location.latitude);
    formData.append('longitude', location.longitude);

    try {
      const response = await axios.post('http://localhost:5000/api/check-disease', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNotification(response.data.message);
    } catch (error) {
      setNotification('Error uploading data. Please try again.');
    }
  };

  return (
    <div className="grid relative bg-white  h-screen p-10 box-border place-items-center my-auto">
     {visible && <div className="container absolute top-0 h-screen mx-auto p-4 backdrop-blur-md shadow-lg rounded-lg">

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold text-center mb-4 ">Notify other Farmer to warn From pestisides</h2>
          {/* <div>
            <label className="block text-lg font-medium">Upload Photo:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
                className="hidden"
              />
            </label>
          </div> */}

          <button
            type="button"
            onClick={getLocation}
            className="bg-lime-500 text-white p-3 rounded-md hover:bg-blue-600 "
          >
            Get Location
          </button>

          <p className="text-center text-gray-700 mt-2">
            {location.latitude && location.longitude
              ? `Location: Lat ${location.latitude}, Lon ${location.longitude}`
              : 'Location not set yet'}
          </p>

          {/* <button
            type="submit"
            className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 w-full"
          >
            Submit
          </button> */}

          {notification && (
            <p className="mt-4 text-center text-lg font-semibold text-red-500">{notification}</p>
          )}
        </form>
      </div>}

      <div className="svgmap h-96">
        <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <image href="./et.svg" x="0" y="0" width="600" height="400" />

          {/* Grid System */}
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 15 }).map((_, col) => (
              <rect
                key={`${row}-${col}`}
                x={col * (600 / 15)}
                y={row * (400 / 12)}
                width={600 / 15}
                height={400 / 12}
                fill="transparent"
                stroke=""
                strokeWidth={0.5}
                className={
                  gridCell.row === row && gridCell.col === col
                    ? 'fill-yellow-500 opacity-50'
                    : ''
                }
              />
            ))
          )}
        </svg>
      </div>
    </div>
  );
};

export default PlantSicknessForm;
